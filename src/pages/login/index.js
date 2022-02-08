import compileTemplate from './login.tmpl.pug';

const app = document.getElementById('app');
app.innerHTML = compileTemplate({ whom: 'World' });