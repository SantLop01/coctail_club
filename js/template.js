// Variables
const mainContainer = document.querySelector('.content');
const leftContainer = document.querySelector('.left__content');
const rightContainer = document.querySelector('.right__content');

// Constructor

export const showHTML = (drink) => {
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
    <div class="info__text">
        <h4 class="info__title">Preparación:</h4>
        <p class="text">
            ${drink.strInstructions}
        </p>
    </div>
    `
};

export const showHTML3 = async (drinksToShow) => {

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