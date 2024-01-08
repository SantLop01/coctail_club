const register = document.querySelector('#register');

register.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    console.log('El nombre:', name)
    const lastname = document.querySelector('#lastname').value;
    const birthday = document.querySelector('#birthday').value;
    const dni = document.querySelector('#dni').value;
    const email = document.querySelector('#email').value;
    const postalCode = document.querySelector('#PC').value;
    const nick = document.querySelector('#nick').value;
    const pass = document.querySelector('#pass').value;
    const passVerify = document.querySelector('#pass-verification').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userVerification = users.find(user => user.email === email);
    const passVerification = pass === passVerify;
    if (userVerification) {
        return alert('Este correo electronico ya está registrado');
    }
    if (!passVerification) {
        return alert('Las contraseñas no coinciden');
    }
    users.push({
        name: name,
        lastname: lastname,
        birthday: birthday,
        dni: dni,
        email: email,
        postalCode: postalCode,
        nick: nick,
        pass: pass
    });
    localStorage.setItem('users', JSON.stringify(users));
    alert('¡Registro Exitoso!');
    window.location.href = 'login.html'
});