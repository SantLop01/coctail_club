const loginForm = document.querySelector('#login');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isRegister = users.find(user => user.email === email && user.pass === password);
    if(!isRegister) {
        return alert('Email o Contraseña incorrectos');
    }
    localStorage.setItem('login_sucess', JSON.stringify(isRegister));
    alert(`Bienvenido ${isRegister.name}`);
    window.location.href = '../../index.html';
})