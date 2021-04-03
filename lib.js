const message = require('./message');
const parserArgs = require('minimist');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * @param {undefined|'help'|'-h'|'--help'|'version'|'-v'|'--version'|'view'} type 
 * @param {...string} args 
 */
module.exports.runMain = function runMain(type, ...args) {
  switch (type) {
    case undefined: case '-h': case '--help':
      console.log(message.mainHelp); break;
    case 'help':
      runHelp(args[0]); break;
    case 'version': case '-v': case '--version':
      console.log(message.mainVersion); break;
    case 'view':
      runView(...args); break;
    case 'add':
      runAdd(...args); break;
    default:
      console.log(message.mainErrorUnknownCommand, type); break;
  }
}

/**
 * @param {string} command 
 */
function runHelp(command) {
  switch (command) {
    case undefined:
      console.log(message.mainHelp); break;
    case 'view':
      console.log(message.viewHelp); break;
    case 'add':
      console.log(message.addHelp); break;
    default:
      console.log(message.helpErrorUnknownCommand, command); break;
  }
}

/**
 * @param {...string} args
 */
function runView(...args) {
  const parserOptions = {
    string: ['p', 'n'],
    default: {
      p: '.',
      n: 'package.json',
    }
  };
  const parseArgs = parserArgs(args, parserOptions);
  if (parseArgs._.length !== 0) {
    console.error(message.viewErrorCountArguments, parseArgs._.join(' '), parseArgs._.length);
    return;
  }
  const fullCorrectNameFile = path.join(parseArgs.p, parseArgs.n);
  const jsonObject = readJsonFromFile(fullCorrectNameFile);
  if (jsonObject === undefined) return;
  const ansObject = Object
    .keys(jsonObject)
    .filter((elem) => /^(name|version|(d|devD|optionalD)ependencies)$/.test(elem))
    .reduce((accum, elem) => {
      accum[elem] = jsonObject[elem];
      return accum;
    }, {});
  console.log(ansObject);
}

/**
 * @param {...string} args 
 */
function runAdd(...args) {
  const parserOptions = {
    string: ['p'],
    boolean: ['save-prod', 'save-dev', 'save-optional'],
    alias: {
      'P': 'save-prod',
      'D': 'save-dev',
      'O': 'save-optional',
    },
    default: {
      p: '.',
      'save-prod': false,
      'save-dev': false,
      'save-optional': false,
    },
  };
  const parseArgs = parserArgs(args, parserOptions);
  if (parseArgs._.length !== 1) {
    console.error(message.addErrorCountArguments, parseArgs._.join(' '), parseArgs._.length);
    return;
  }
  const allTrueFlag = Object
    .entries({ P: parseArgs.P, D: parseArgs.D, O: parseArgs.O })
    .filter(([key, value]) => value);
  if (allTrueFlag.length > 1) {
    console.error(message.addErrorCountSaveFlags);
    return;
  }
  if (allTrueFlag.length === 0) {
    allTrueFlag.push(['P', true]);
  }
  const saveFlag = `--${parserOptions.alias[allTrueFlag[0][0]]}`;
  const nameDependence = parseArgs._[0];
  const fullCorrectPathToDir = path.join(parseArgs.p);
  const runCommand = `cd ${fullCorrectPathToDir} && npm i ${nameDependence} ${saveFlag}`;
  console.log(message.addStart, runCommand);
  exec(runCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(stderr);
      return;
    }
    console.log(stdout);
    console.log(message.addFinish);
  });
}

/**
 * @param {string} pathToFile 
 * @param {string} fileName 
 * @returns {object|undefined}
 */
function readJsonFromFile(fileName) {
  let jsonString;
  try {
    jsonString = fs.readFileSync(fileName, 'utf8');
  } catch (err) {
    console.error('Error reading file from disk:', err);
    return;
  }
  let jsonObject;
  try {
    jsonObject = JSON.parse(jsonString);
  } catch (err) {
    console.error('Error parsing JSON string:', err);
    return;
  }
  return jsonObject;
}
