const register = document.querySelector('#register');
import { nofitifcation } from './notify.js';

register.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const lastname = document.querySelector('#lastname').value;
    const birthday = document.querySelector('#birthday').value;
    const email = document.querySelector('#email').value;
    const dni = document.querySelector('#dni').value;
    const postalCode = document.querySelector('#postal').value;
    const poblation = document.querySelector('#poblation').value;
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
        nofitifcation(`${!nameVerification ? 'El campo Nombre' : 'El campo Apellidos'} solo debe contener letras`);
        return;
    }
    if (!ageVerification) {
        nofitifcation('¡Debes ser mayor de edad!');
        return;
    }
    if (userVerification) {
        nofitifcation('Este correo electronico ya está registrado');
        return;
    }
    if (!passVerification || !passCoincidence) {
        nofitifcation(`${!passVerification ? 'La contraseña debe contener al menos 8 caracteres con dos números' : 'Las contraseñas no coinciden'}`);
        return;
    }
    users.push({
        name: name,
        lastname: lastname,
        birthday: birthday,
        email: email,
        postalCode: postalCode,
        poblation: poblation,
        dni: dni,
        nick: nick,
        pass: pass
    });
    localStorage.setItem('users', JSON.stringify(users));
    nofitifcation('¡Usuario registrado con exito!', 1200, "#155724", "#d4edda");
    setTimeout(() => {
        window.location.href = 'login.html'
    }, 1200)
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

const postalCodes = {
    8001: 1664507, 
    8600: 16994,
    8700: 19862,
    8240: 78877
};
  

const postalCode = document.querySelector('#postal');
const poblation = document.querySelector('#poblation');

postalCode.addEventListener('change', (e) => {
    const code = parseInt(e.target.value);
    const population = postalCodes[code];
    if (population) {
        poblation.value = population;
    } else {
        let knows = Object.keys(postalCodes).map(key => `0${key}`).join(', ');
        return nofitifcation(`Las poblaciones conocidas en base a los códigos postales son: ${knows}`, 4000, '#155724', '#d4edda');
    }
});