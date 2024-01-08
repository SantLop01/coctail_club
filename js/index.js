const user = JSON.parse(localStorage.getItem('login_sucess')) || false;
if (!user) {
    window.location.href = 'pages/login.html';
}

// const logout = document.querySelector('#logout');
// logout.addEventListener('click', () => {
//     alert(`¡Hasta pronto ${user.name}!`);
//     localStorage.removeItem('login_sucess');
//     window.location.href = 'pages/login.html';
// });

// Code for generate Random Drink
const random = document.querySelector('#random');

random.addEventListener('click', async (e) => {
    const drink = await getRandomDrink();
    console.log(drink)
    categoriesRandom();
    ingredientsRandom();
    glassesRandom();
    showHTML(drink);
});

// Constructor of options in Categories Select
const categorySelect = document.querySelector('#category');

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

// Render drink of Category Selected
categorySelect.addEventListener('change', async (e) => {
    const { drinks } = await filterByCategory(e.target.value);
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
    console.log('lo que devuelve random en categories: ', random)
    const id = random.map(index => {
        return drinks[index].idDrink;
    });

    const drink = await filterByIdDrink(id[0]);
    glassesRandom();
    ingredientsRandom();
    showHTML(drink);
})

// Constructor of options in Glasses Select
const glassSelect = document.querySelector('#glass');

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

// Render Glass Selected
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
        }
    };
    console.log('En ingredient selected', random);
    const id = random.map(index => {
        return drinks[index].idDrink;
    });

    const drink = await filterByIdDrink(id[0]);
    categoriesRandom();
    ingredientsRandom();
    showHTML(drink);
});

// Constructor of options in Ingredients Select
const ingredientSelect = document.querySelector('#ingredient');

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

// Render by Ingredient Selected
ingredientSelect.addEventListener('change', async (e) => {
    const { drinks } = await filterByIngredient(e.target.value);
    console.log('FILTRADO POR INGREDIENTE', drinks.length);
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
    console.log('En ingredient selected', random);
    const id = random.map(index => {
        return drinks[index].idDrink;
    });

    const drink = await filterByIdDrink(id[0]);
    categoriesRandom();
    glassesRandom();
    showHTML(drink);
});


// Constructor

const leftContainer = document.querySelector('.left__content');
const rightContainer = document.querySelector('.right__content');

const showHTML = (drink) => {
    leftContainer.innerHTML = '';

    leftContainer.innerHTML = `
    <div class="product__heading">
        <div class="product__title">
            <h1>${drink.strDrink}</h1>
        </div>
        <picture class="image__wrap">
            <img src="${drink.strDrinkThumb}" alt="Imagen con el nombre del coctel">
        </picture>
    </div>
    <div class="info__text">
        <h4 class="info__title">Preparación:</h4>
        <p class="text">
            ${drink.strInstructions}
        </p>
    </div>
    `

    let ingredients = '';
    for (let i = 1; i <= 15; i++) {
        let ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
            ingredients += `<li>${ingredient}</li>`;
        }
    };

    rightContainer.innerHTML = '';
    rightContainer.innerHTML = `
    <div class="info__text">
        <h4 class="info__title">Ingredientes:</h4>
        <ul>
            ${ingredients}
        </ul>
    </div>
    `
}

// Call to API

const getRandomDrink = async () => {
    try {
        const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const drink = data.drinks[0];
        return drink;
    } catch (error) {
        console.log(`No se pudo traer la bebida aleatoria porque: ${error}`);
    }
};

const getAllCategories = async (cat) => {
    try {
        const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se pudieron traer las categorrías porque ${error}`)
    }
}

const getAllIngredients = async () => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se pudo traer la lista de ingredientes porque ${error}`);
    }
}

const getAllGlasses = async () => {
    try {
        const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/list.php?g=list');
        const data = response.json();
        return data;
    } catch (error) {
        console.log(`No se pudo traer la lista de vasos porque ${error}`);
    }
}

// Filter calls to API

const filterByCategory = async (cat) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se puedo trar las bebidas filtradas por categoría porque: ${error}`);
    }
}

const filterByIngredient = async (ing) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se puedo trar las bebidas filtradas por ingrediente porque: ${error}`);
    }
}

const filterByIdDrink = async (id) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const drink = data.drinks[0];
        return drink;
    } catch (error) {
        console.log(`No se puedo traer la filtrada por id de Bebida porque: ${error}`);
    }
}

const filterByGlass = async (glass) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`);
        const data = await response.json();
        const drink = data.drinks;
        return drink;
    } catch (error) {
        console.log(`No se puedo traer la bebida filtrada por vaso porque: ${error}`);
    }
}