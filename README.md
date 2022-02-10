# Учебный проект Яндекс.Практикум

Проект создан на основе [макета в Figma от Яндекса](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

[Веб-хостинг в Netlify](https://vigilant-booth-8cb191.netlify.app/)

## Используемые инструменты

- Parcel для сборки проекта
- шаблонизатор Pug
- локальная раздача статики через Express
- SCSS

## Используемые команды

- `npm install` — установка стабильной версии,
- `npm run dev` — запуск проекта локально,
- `npm run build` — сборка проекта,
- `npm run start` — сборка проекта и запуск express-сервера на 3000 порту.

## Краткое описание страниц
- При старте появится список всех готовых страниц проекта
- Из страницы авторизации можно попасть на страницу регистрации. Если нажать Войти - направляет на страницу с чатами.
- На странице с чатами справа сверху есть кнопка Профиль, которая направляет на страницу редактирования профиля

## Краткое описание архитектуры
- Общие модули находятся в папке `./src/components/` и представляют из себя `pug` и стили на `scss`
- Страницы лежат в папке `./src/pages/`
- Файлы с расширением `*.tmpl.pug` компилируются с помощью плагина `parcel-transformer-pug-precompile`
- Файлы с расширением `*.pug` компилируются с помощью плагина `@parcel/transformer-pug`. В них хранится layout страницы.
- Логика с компиляцией шаблонов лежит в файлах `./src/pages/**/*.js`

[Pull request, sprint 1](https://github.com/frontendkk1/middle.messenger.praktikum.yandex/pull/1)