import { showHTML, showHTML3 } from './template.js';
import * as api from './api.js';
import { nofitifcation } from './notify.js';

const user = JSON.parse(localStorage.getItem('login_sucess')) || false;
if (!user) {
    window.location.href = 'pages/login.html';
}

const logout = document.querySelector('#logout');
logout.addEventListener('click', () => {
    nofitifcation(`¡Hasta pronto ${user.name}!`, 1300, "#004085", "#cce5ff");
    localStorage.removeItem('login_sucess');
    setTimeout(() => {
        window.location.href = 'pages/login.html';
    }, 1400);
});

// Code for render a random drink
const randomDrinkRender = async () => {
    const drink = await api.getRandomDrink();
    const drinksToShow = await drink.drinks;
    console.log(drinksToShow);
    categoriesRandom();
    ingredientsRandom();
    glassesRandom();
    showHTML3(drinksToShow);
}

randomDrinkRender();

// Code for generate Random Drink
const random = document.querySelector('#random');

random.addEventListener('click', async () => {
    await randomDrinkRender();
});

// Constructor of options in Categories Select
const categorySelect = document.querySelector('#category');

const categoriesRandom = async () => {
    const { drinks } = await api.getAllCategories();
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

// Render drink of Category Selected
categorySelect.addEventListener('change', async (e) => {
    const { drinks } = await api.filterByCategory(e.target.value);
    console.log('Lo que devuelve categorías :) :', drinks);
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
    const ids = random.map(index => {
        return drinks[index].idDrink;
    });

    let drinksToShow = [];

    for (let id of ids) {
        const drink = await api.filterByIdDrink(id);
        drinksToShow.push(drink);
    }

    glassesRandom();
    ingredientsRandom();
    showHTML3(drinksToShow);
})

// Constructor of options in Glasses Select
const glassSelect = document.querySelector('#glass');

const glassesRandom = async () => {
    const { drinks } = await api.getAllGlasses();
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

// Render Glass Selected
glassSelect.addEventListener('change', async (e) => {
    const drinks = await api.filterByGlass(e.target.value);
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
        }
    };

    const ids = random.map(index => {
        return drinks[index].idDrink;
    });

    let drinksToShow = [];

    for (let id of ids) {
        const drink = await api.filterByIdDrink(id);
        drinksToShow.push(drink)
    }

    categoriesRandom();
    ingredientsRandom();
    showHTML3(drinksToShow);
});

// Constructor of options in Ingredients Select
const ingredientSelect = document.querySelector('#ingredient');

const ingredientsRandom = async () => {
    const { drinks } = await api.getAllIngredients();
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

// Render by Ingredient Selected
ingredientSelect.addEventListener('change', async (e) => {
    const { drinks } = await api.filterByIngredient(e.target.value);
    const quantity = drinks.length;

    let random = [];
    for (let c = 0; c <= quantity; c++) {
        const index = Math.floor(Math.random() * quantity);
        if (!random.includes(index)) {
            random.push(index)
        } else {
            c--;
        }
        if (random.length === quantity || random.length === 3) {
            break;
        }
    };

    const ids = random.map(index => {
        return drinks[index].idDrink;
    });

    let drinksToShow = [];

    for (let id of ids) {
        const drink = await api.filterByIdDrink(id);
        drinksToShow.push(drink);
    }

    categoriesRandom();
    glassesRandom();
    showHTML3(drinksToShow);
});