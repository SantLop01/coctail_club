const register = document.querySelector('#register');

register.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const lastname = document.querySelector('#lastname').value;
    const birthday = document.querySelector('#birthday').value;
    const dni = document.querySelector('#dni').value;
    const email = document.querySelector('#email').value;
    const postalCode = document.querySelector('#postal').value;
    const nick = document.querySelector('#nick').value;
    const pass = document.querySelector('#pass').value;
    const passVerify = document.querySelector('#pass-verification').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const nameVerification = notNumber(name);
    const lastnameVerification = notNumber(lastname);
    const ageVerification = validateAge(birthday);
    const userVerification = users.find(user => user.email === email);
    const passVerification = validatePassword(pass);
    const passCoincidence = pass === passVerify;
    if (!nameVerification || !lastnameVerification) {
        return alert(`${!nameVerification ? 'El campo Nombre' : 'El campo Apellidos'} solo debe contener letras`);
    }
    if (!ageVerification || !birthday.length > 9) {
        return alert(`${!ageVerification ? 'Debes ser mayor de edad' : 'Ingresa una fecha válida. EJ: 01/01/2000'}`);
    }
    if (userVerification) {
        return alert('Este correo electronico ya está registrado');
    }
    if (!passVerification || !passCoincidence) {
        return alert(`${!passVerification ? 'La contraseña debe tener al menos 8 caracteres con 2 números' : 'Las contraseñas no coinciden'}`);
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

// Input Validation
const notNumber = (params) => {
    return !/\d/.test(params);
};

const validateAge = (birthday) => {
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    return age >= 18;
}

const validatePassword = (password) => {
    const lengthRegex = /.{8,}/;
    const digitRegex = /(?=.*?\d){2}/;  
    if(!lengthRegex.test(password)) {
      return false;
    }
    if(!digitRegex.test(password)) {
      return false; 
    }
    return true;
}