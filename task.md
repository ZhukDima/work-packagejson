# 📝 Задача
Нужно написать инструмент (Command Line Interface) из двух команд для просмотра и добавления зависимостей в/из `package.json`.
У всех команд должен быть внятный и информативный вывод (на ваш вкус)

Кроме этого, инструмент должен выводить список команд  с их описанием (help) и свою версию.
Требуется гарантировать корректную работу при использовании инструмента через `npx`.

Допускается использовать внешние зависимости.
Выбор каждой зависимости необходимо обосновать (обоснование поместить в файл `solution.md`)
Решение опубликовать в виде github-репозитория.


## API
---

### Первая команда

Вывод информации о проекте на основе `package.json`:

- Название проекта
- Его версию
- Зависимости

---

### Вторая команда:

Добавление и установка зависимостей в `package.json`