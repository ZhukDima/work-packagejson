const pjson = require('./package.json');

module.exports.mainHelp = `
${pjson.description}

Usage:         
        work-packagejson <command> [arguments]

<Command>:
        view   demonstrate name, version and all dependencies
        add    adding and installing dependencies

Use 'work-packagejson help <command>' for more information about a command.
`.slice(1);

module.exports.mainVersion = pjson.version;

module.exports.mainErrorUnknownCommand = `
work-packagejson %s: unknown command
Run 'work-packagejson help' for usage.`.slice(1);

module.exports.helpErrorUnknownCommand = `
work-packagejson help %s: unknown help topic. 
Run 'work-packagejson help'.`.slice(1);

module.exports.viewHelp = `
Usage: work-packagejson view [-p <path to file>] [-n <file name>]

Outputting project information based on package.json (or custom file):
- The name of the project;
- His version;
- Dependencies.

Default:
        <path to file>   .
        <file name>      package.json
`.slice(1);

module.exports.viewErrorCountArguments = `
work-packagejson view %s: %d found, but 0 need`.slice(1);

module.exports.addHelp = `
Usage: work-packagejson add [-p <path to dir>] <name dependence> 
       [-P|--save-pro|-D|--save-dev|-O|--save-optional]

Add and install dependencies to package.json.

Options:
        -P, --save-prod       Package will appear in 'dependencies'. 
                              This is the default unless -D or -O are present.
        -D, --save-dev        Package will appear in 'devDependencies'.
        -O, --save-optional   Package will appear in 'optionalDependencies'.

Default:
        <path to dir>   .
`.slice(1);

module.exports.addErrorCountSaveFlags = `
work-packagejson add: found more 1 save-flags`.slice(1);

module.exports.addErrorCountArguments = `
work-packagejson add %s: %d found, but 1 need`.slice(1);

module.exports.addStart = `
work-packagejson add: сommand '%s' started executing, please wait...`.slice(1);

module.exports.addFinish = `
work-packagejson add: complete!`.slice(1);
