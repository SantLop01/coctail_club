// SECCIÓN DE NOTIFICACIONES

// Función para mostrar notificaciones
const nofitifcation = (text, time = 1600, color = "#721c24", background = "#f8d7da") => {
    Toastify({
        text: text,
        duration: time,
        close: false,
        className: "info",
        position: "center",
        style: {
            fontSize: "1.6em",
            color: color,
            background: background,
            borderRadius: "8px",
            borderColor: "#f5c6cb"
        },
        offset: {
            y: 10,
        }
    }).showToast();
};

// SECCIÓN DE AUTENTICACIÓN

// Funcion para comprobar si estamos en login html
const executeLogin = () => {
    const loginForm = document.querySelector('#login');
    if (loginForm) {
        loginFunctions(loginForm);
    } else {
        return;
    }
}

// Funcion para la página login
const loginFunctions = (loginForm) => {
    try {
        loginForm.addEventListener('submit', (e) => {
            // Prevenimos el comportamiento por defecto del formulario evitando que recargue la página
            e.preventDefault();

            // Variables para capturar los datos del formulario
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            // Comprobamos los datos para saber si existen los datos en el localStorage sino inicializamos un array vacío para recibir el push
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Validamos que haya coincidencias de los datos del formulario con los almacenados en el localStorage
            const isRegister = users.find(user => user.email === email && user.pass === password);

            // En caso de no existir el usuario devolvemos una notificación y cortamos la ejecución
            if (!isRegister) {
                nofitifcation(`Credenciales incorrectas, por favor intentalo de nuevo`, 2200, "#721c24", "#f8d7da");
                return;
            };

            // En caso de existir el usuario y coincidir los datos almacenamos en localStorage que el login fue exitoso
            localStorage.setItem('login_sucess', JSON.stringify(isRegister));

            // Notficamos el login exitoso con unos milisegundos antes de la redirección
            nofitifcation(`¡Bienvenido ${isRegister.name}!`, 1300, "#004085", "#cce5ff");
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 1400);
        });
    } catch (error) {
        console.log(error);
    };
};

// Inicializamos para comprobar si estamos en login
executeLogin();

// Funcion para comprobar si estamos en register html
const executeRegister = () => {
    const registerForm = document.querySelector('#register');
    if (registerForm) {
        registerFunctions(registerForm);
    } else {
        return;
    };
};

// Función contenedora de funciones para la página register

const registerFunctions = (registerForm) => {
    try {
        registerForm.addEventListener('submit', (e) => {
            // Prevenimos el comportamiento por defecto del formulario evitando que recargue la página
            e.preventDefault();

            // Variables para capturar los datos del formulario
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

            // Comprobamos los datos para saber si ya exite el item en el localStorage, si no inicializamos un array vacío para recibir el push
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Llamamos a las funciones de validación
            const nameVerification = notNumber(name);
            const lastnameVerification = notNumber(lastname);
            const ageVerification = validateAge(birthday);
            const userVerification = users.find(user => user.email === email);
            const passVerification = validatePassword(pass);
            const passCoincidence = pass === passVerify;

            // Comprobamos si los datos son correctos
            if (!nameVerification || !lastnameVerification) {
                nofitifcation(`${!nameVerification ? 'El campo Nombre' : 'El campo Apellidos'} solo debe contener letras`);
                return;
            };

            if (!ageVerification) {
                nofitifcation('¡Debes ser mayor de edad!');
                return;
            };

            if (userVerification) {
                nofitifcation('Este correo electronico ya está registrado');
                return;
            };

            if (!passVerification || !passCoincidence) {
                nofitifcation(`${!passVerification ? 'La contraseña debe contener al menos 8 caracteres con dos números' : 'Las contraseñas no coinciden'}`);
                return;
            };

            // Agregamos el nuevo usuario
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

            // Cramos un nuevo item en el local storage con los datos del usuario
            localStorage.setItem('users', JSON.stringify(users));

            // Mostramos el mensaje de exito y redirigimos a la pagina de login
            nofitifcation('¡Usuario registrado con exito!', 1200, "#155724", "#d4edda");
            setTimeout(() => {
                window.location.href = 'login.html'
            }, 1200);
        });

        // Validar que sea un número
        const notNumber = (params) => {
            return !/\d/.test(params);
        };

        // Validar edad
        const validateAge = (birthday) => {
            const age = new Date().getFullYear() - new Date(birthday).getFullYear();
            return age >= 18;
        };

        // Validar contraseña
        const validatePassword = (password) => {
            const lengthRegex = /.{8,}/;
            const digitRegex = /(?=.*?\d){2}/;
            if (!lengthRegex.test(password)) {
                return false;
            }
            if (!digitRegex.test(password)) {
                return false;
            }
            return true;
        };

        // Objeto y variables necesarias para la función de población
        const postalCodes = {
            8001: 'Barcelona',
            8911: 'Badalona',
            8600: 'Berga',
            8700: 'Calella',
            8240: 'Manresa'
        };

        const postalCode = document.querySelector('#postal');
        const poblation = document.querySelector('#poblation');

        // Función para mostrar la población correspondiente al código postal
        postalCode.addEventListener('change', (e) => {
            const code = parseInt(e.target.value);
            const population = postalCodes[code];
            if (population) {
                poblation.value = population;
            } else {
                let knows = Object.keys(postalCodes).map(key => `0${key}`).join(', ');
                nofitifcation(`Las poblaciones conocidas en base a los códigos postales son: ${knows}`, 4000, '#004085', '#cce5ff');
                return;
            };
        });
    } catch (error) {
        console.log(error);
    };
};

// Inicializamos la función para comprobar si estamos en register
executeRegister();

// LOGOUT Y REDIRECCIÓN EN CASO DE NO ESTAR LOGEADO
const logoutExecute = () => {
    const logout = document.querySelector('#logout');
    if (logout) {
        logoutFunction(logout);
    } else {
        return;
    }
}

// Función para cerrar sesión (logout) y redireccion a la pagina de login
const logoutFunction = (logout) => {
    // Comprobamos en el localStorage si el usuario está logeado
    const user = JSON.parse(localStorage.getItem('login_sucess')) || false;

    // Si no está logueado hacemos la redirección a login
    if (!user) {
        window.location.href = '/pages/login.html';
    };

    // Manejador para cerrar sesión
    logout.addEventListener('click', () => {
        // Nofificamos al usuario el logout exitoso
        nofitifcation(`¡Hasta pronto ${user.name}!`, 1300, "#004085", "#cce5ff");

        // Eliminamos los datos del login del usuario del localStorage
        localStorage.removeItem('login_sucess');

        // Redireccionamos a la pagina de login
        setTimeout(() => {
            window.location.href = '/pages/login.html';
        }, 1400);
    });
}

// Inicializamos la función para comprobar si el usuario ya esta logeado o si hace click en boton de logout
logoutExecute();

// SECCIÓN DE BEBIDAS ALEATORIAS

// Función para renderizar una bebida aleatoria
const randomDrinkRender = async () => {
    const drink = await getRandomDrink();
    const drinksToShow = await drink.drinks;
    console.log(drinksToShow);
    categoriesRandom();
    ingredientsRandom();
    glassesRandom();
    showHTML(drinksToShow);
};

// Manejador para botón de bebida aleatoria  
const random = document.querySelector('#random');

random.addEventListener('click', async () => {
    await randomDrinkRender();
});

// SECCIÓN DE FILTROS

// Función para opciones aleatorias de categorías
const categoriesRandom = async () => {
    const { drinks } = await getAllCategories();
    const count = 3;

    let random = [];
    for (let c = 1; c <= count; c++) {
        const index = Math.floor(Math.random() * drinks.length);
        if (!random.includes(index) && random.length < 3) {
            random.push(index)
        } else {
            c--;
        };
    };

    const options = random.map(index => {
        return `<option value="" disabled selected hidden>Seleccionar</option>
        <option value="${drinks[index].strCategory}">${drinks[index].strCategory}</option>`
    });
    categorySelect.innerHTML = options.join('');
};

// Manjedor para filtrado por categoría 
const categorySelect = document.querySelector('#category');

categorySelect.addEventListener('change', async (e) => {
    const { drinks } = await filterByCategory(e.target.value);
    console.log('Lo que devuelve categorías :) :', drinks);
    const count = 3;

    let random = [];
    for (let c = 1; c <= count; c++) {
        const index = Math.floor(Math.random() * drinks.length);
        if (!random.includes(index) && random.length < 3) {
            random.push(index);
        } else {
            c--;
        };
    };
    const ids = random.map(index => {
        return drinks[index].idDrink;
    });

    let drinksToShow = [];

    for (let id of ids) {
        const drink = await filterByIdDrink(id);
        drinksToShow.push(drink);
    };

    glassesRandom();
    ingredientsRandom();
    showHTML(drinksToShow);
});

// Función para opciones aleatorias de categorías
const glassesRandom = async () => {
    const { drinks } = await getAllGlasses();
    console.log('FILTRADO POR CATEGORÍA', drinks);
    const count = 3;

    let random = [];
    for (let c = 1; c <= count; c++) {
        const index = Math.floor(Math.random() * drinks.length);
        if (!random.includes(index) && random.length < 3) {
            random.push(index)
        } else {
            c--;
        }
    };

    const options = random.map(index => {
        return `<option value="" disabled selected hidden>Seleccionar</option>
        <option value="${drinks[index].strGlass}">${drinks[index].strGlass}</option>`;
    });

    glassSelect.innerHTML = options.join('');
}

// Manjedor para filtrado por vaso (glass)
const glassSelect = document.querySelector('#glass');

glassSelect.addEventListener('change', async (e) => {
    const drinks = await filterByGlass(e.target.value);
    const quantity = drinks.length;

    console.log('PARA SABER:', drinks[0])

    let random = [];
    for (let d = 0; d <= quantity; d++) {
        const index = Math.floor(Math.random() * quantity);
        if (!random.includes(index)) {
            random.push(index)
        } else {
            d--;
        }
        if (random.length === quantity || random.length === 3) {
            break;
        };
    };

    const ids = random.map(index => {
        return drinks[index].idDrink;
    });

    let drinksToShow = [];

    for (let id of ids) {
        const drink = await filterByIdDrink(id);
        drinksToShow.push(drink);
    };

    categoriesRandom();
    ingredientsRandom();
    showHTML(drinksToShow);
});

// FUncion para opciones aleatorias de ingredientes
const ingredientsRandom = async () => {
    const { drinks } = await getAllIngredients();
    const count = 3;

    let random = [];
    for (let i = 1; i <= count; i++) {
        const index = Math.floor(Math.random() * drinks.length);
        if (!random.includes(index) && random.length < 3) {
            random.push(index);
        } else {
            i--;
        }
    };
    const options = random.map(index => {
        return `<option value="" disabled selected hidden>Seleccionar</option>
        <option value="${drinks[index].strIngredient1}">${drinks[index].strIngredient1}</option>`
    });
    ingredientSelect.innerHTML = options.join('');
};

// Manejador para filtrado por ingrediente
const ingredientSelect = document.querySelector('#ingredient');

ingredientSelect.addEventListener('change', async (e) => {
    const { drinks } = await filterByIngredient(e.target.value);
    const quantity = drinks.length;

    let random = [];
    for (let c = 0; c <= quantity; c++) {
        const index = Math.floor(Math.random() * quantity);
        if (!random.includes(index)) {
            random.push(index);
        } else {
            c--;
        }
        if (random.length === quantity || random.length === 3) {
            break;
        };
    };

    const ids = random.map(index => {
        return drinks[index].idDrink;
    });

    let drinksToShow = [];

    for (let id of ids) {
        const drink = await filterByIdDrink(id);
        drinksToShow.push(drink);
    };

    categoriesRandom();
    glassesRandom();
    showHTML(drinksToShow);
});


// SECCIÓN DE CONSULTAS A LA API

// Funcion para traer una bebida aleatoria
const getRandomDrink = async () => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se pudo traer la bebida aleatoria porque: ${error}`);
    };
};

// Funcion para traer la lista de todas las categorias existentes en la API
const getAllCategories = async () => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se pudieron traer las categorrías porque ${error}`);
    };
};

// Funcion para traer la lista de todos los ingredientes existentes en la API
const getAllIngredients = async () => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se pudo traer la lista de ingredientes porque ${error}`);
    };
};

// Funcion para traer la lista de todos los vasos (glasses) existentes en la API
const getAllGlasses = async () => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list');
        const data = response.json();
        return data;
    } catch (error) {
        console.log(`No se pudo traer la lista de vasos porque ${error}`);
    };
};

// SECCION DE LLAMADAS POR FILTRADO A LA API

// Funcion para filtrar por categoria
const filterByCategory = async (cat) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se puedo trar las bebidas filtradas por categoría porque: ${error}`);
    };
};

// Funcion para filtrar por ingrediente
const filterByIngredient = async (ing) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se puedo trar las bebidas filtradas por ingrediente porque: ${error}`);
    };
};

// Funcion para filtrar por vaso (glass)
const filterByGlass = async (glass) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`);
        const data = await response.json();
        const drink = data.drinks;
        return drink;
    } catch (error) {
        console.log(`No se puedo traer la bebida filtrada por vaso porque: ${error}`);
    };
};

// Funcion para filtrar por bebida en base a ID
const filterByIdDrink = async (id) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const drink = data.drinks[0];
        return drink;
    } catch (error) {
        console.log(`No se puedo traer la filtrada por id de Bebida porque: ${error}`);
    };
};

// SECCIÓN DE RENDERIZADO

const mainContainer = document.querySelector('.content');

// Función para renderizar el HTML con los datos traidos de la API
const showHTML = async (drinksToShow) => {

    mainContainer.innerHTML = '';

    let html = '';

    for (let drink of drinksToShow) {
        console.log('DESDE EL CONSTRUCTOR: ', drink.strDrink);
        let ingredients = '';
        for (let i = 1; i <= 15; i++) {
            let ingredient = drink[`strIngredient${i}`];
            if (ingredient) {
                ingredients += `<li>${ingredient}</li>`;
            }
        };

        html += `
        <article class="left__content">
            <div class="product__heading">
                <div class="product__title">
                    <h1>${drink.strDrink}</h1>
                </div>
                <picture class="image__wrap">
                    <img src="${drink.strDrinkThumb}" alt="Imagen de ${drink.strDrink}">
                </picture>
            </div>
        </article>

        <div class="right__content">
            <div class="info__text">
                <h4 class="info__title">Ingredientes:</h4>
                <ul>
                    ${ingredients}
                </ul>
            </div>
            <div class="info__text">
                <h4 class="info__title">Preparación:</h4>
                <p class="text">
                    ${drink.strInstructions}
                </p>
            </div>
        </div>
        `
    };
    mainContainer.innerHTML = html;
};

//Llamada a la función de bebidas aleatorias al iniciarlizar la página (en el momento en el que usuario entra a la página)
randomDrinkRender();