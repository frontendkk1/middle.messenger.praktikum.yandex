# Учебный проект Яндекс.Практикум

Проект создан на основе [макета в Figma от Яндекса](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

[Веб-хостинг в Netlify](https://vigilant-booth-8cb191.netlify.app/)

## Используемые инструменты

- Parcel для сборки проекта
- шаблонизатор Pug
- локальная раздача статики через Express
- SCSS
- Mocha и Chai для тестов

## Используемые команды

- `npm install` — установка стабильной версии,
- `npm run dev` — запуск проекта локально,
- `npm run build` — сборка проекта,
- `npm run start` — сборка проекта и запуск express-сервера на 3000 порту.
- `npm run stylelint` — запуск stylelint
- `npm run eslint` — запуск eslint
- `npm run test` — запуск тестов


## Список страниц
- [Вход](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/login)
- [Регистрация](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/registration)
- [Чаты](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/messenger)
- [Профиль](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/profile)
- [Настройки профиля](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/settings)
- [Изменение пароля](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/user-password-change)
- [Изменение аватара](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/user-avatar-change)
- [Ошибка сервера](https://6222405d62846f0007d89bbb--vigilant-booth-8cb191.netlify.app/server-error)

## Краткое описание страниц
- При старте появится модалка с авторизацией.
- Из страницы авторизации можно попасть на страницу регистрации `/sign-up`. Если нажать Войти - направляет на страницу с чатами `/messenger`.
- На странице с чатами `/messenger` слева сверху есть кнопка Профиль, которая направляет на страницу просмотра профиля `/profile`
- На странице профиля есть информация о профиле и ссылки на редактирование профиля.
- На странице с чатами `/messenger` справа сверху есть кнопка с тремя точками для редактирования чата.

## Краткое описание архитектуры
- Тесты лежат в папках `./src/**/test/*.spec.ts`
- Класс для работы с запросами, Block, event bus находятся в папке `./src/utils/`
- Общие модули находятся в папке `./src/components/` и представляют из себя `pug` и стили на `scss`
- Страницы лежат в папке `./src/pages/`
- Файлы с расширением `*.tmpl.pug` компилируются с помощью плагина `parcel-transformer-pug-precompile`
- Файлы с расширением `*.pug` компилируются с помощью плагина `@parcel/transformer-pug`. В них хранится layout страницы.
- Логика с компиляцией шаблонов лежит в файлах `./src/pages/**/*.js`

[Pull request, sprint 3](https://github.com/frontendkk1/middle.messenger.praktikum.yandex/pull/3)
