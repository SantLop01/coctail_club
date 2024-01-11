// Call to API

export const getRandomDrink = async () => {
    try {
        const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const drink = data.drinks[0];
        return drink;
    } catch (error) {
        console.log(`No se pudo traer la bebida aleatoria porque: ${error}`);
    }
};

export const getAllCategories = async (cat) => {
    try {
        const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se pudieron traer las categorrías porque ${error}`)
    }
}

export const getAllIngredients = async () => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se pudo traer la lista de ingredientes porque ${error}`);
    }
}

export const getAllGlasses = async () => {
    try {
        const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/list.php?g=list');
        const data = response.json();
        return data;
    } catch (error) {
        console.log(`No se pudo traer la lista de vasos porque ${error}`);
    }
}

// Filter calls to API

export const filterByCategory = async (cat) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se puedo trar las bebidas filtradas por categoría porque: ${error}`);
    }
}

export const filterByIngredient = async (ing) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`No se puedo trar las bebidas filtradas por ingrediente porque: ${error}`);
    }
}

export const filterByIdDrink = async (id) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const drink = data.drinks[0];
        return drink;
    } catch (error) {
        console.log(`No se puedo traer la filtrada por id de Bebida porque: ${error}`);
    }
}

export const filterByGlass = async (glass) => {
    try {
        const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`);
        const data = await response.json();
        const drink = data.drinks;
        return drink;
    } catch (error) {
        console.log(`No se puedo traer la bebida filtrada por vaso porque: ${error}`);
    }
}