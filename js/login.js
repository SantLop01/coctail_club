const loginForm = document.querySelector('#login');

import { nofitifcation } from './notify.js';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isRegister = users.find(user => user.email === email && user.pass === password);
    if(!isRegister) {
        nofitifcation(`Credenciales incorrectas, por favor intentalo de nuevo`, 2200, "#721c24", "#f8d7da");
        return;
    }
    localStorage.setItem('login_sucess', JSON.stringify(isRegister));
    nofitifcation(`¡Bienvenido ${isRegister.name}!`, 1300, "#004085", "#cce5ff");
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1400)
})