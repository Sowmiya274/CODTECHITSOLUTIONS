document.addEventListener('DOMContentLoaded', function() {
    const API_ID = '2d3792f7';
    const API_KEY = 'cdacd01a73f8075c4e8dbb35443958d2';
    const recipeForm = document.getElementById('recipe-form');
    const recipeInput = document.getElementById('recipe-input');
    const recipesContainer = document.getElementById('recipes-container');

    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = recipeInput.value.trim();
        if (query) {
            fetchRecipes(query);
        }
    });

    async function fetchRecipes(query) {
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
            const data = await response.json();
            displayRecipes(data.hits);
        } catch (error) {
            alert('Error fetching recipes. Please try again.');
        }
    }

    function displayRecipes(recipes) {
        recipesContainer.innerHTML = '';
        recipes.forEach(recipeData => {
            const recipe = recipeData.recipe;
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.label}">
                <h3>${recipe.label}</h3>
                <ul>${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    }
});
