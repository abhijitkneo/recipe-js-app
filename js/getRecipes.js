const cuisineSelect = document.getElementById('cuisineSelect');
const apiUrl = "https://dummyjson.com/recipes";
let allRecipes = [];


async function getRecipes() {
    const recipeContainer = document.getElementById('recipes');
    const loader = document.getElementById('loader');

    try {
        loader.style.display = 'block';
        recipeContainer.style.display = 'none';

        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error('Error while fetching the data');
        }

        const data = await response.json();
        console.log(data);
        
        allRecipes = data.recipes;

        //get unique cuisines dropdown
        const cuisines = [...new Set(allRecipes.map(r => r.cuisine))];
        cuisines.sort();

        cuisines.forEach(cuisine => {
            const option = document.createElement('option');
            option.value = cuisine.toLowerCase();
            option.textContent = cuisine;
            cuisineSelect.appendChild(option);
        });

        renderRecipies(allRecipes);
        
    } catch (error) {
        console.log('Fetch Error', error);
        recipeContainer.innerHTML = `<p>Failed to load the recipe</p>`        
    } finally {
        loader.style.display = 'none';
        recipeContainer.style.display = 'flex';
    }
}


function renderRecipies(recipes) {
    const recipeContainer = document.getElementById('recipes');
    const recipeCount = document.getElementById('recipe-count');
    recipeContainer.innerHTML = '';

    recipeCount.textContent = `${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} found`;

    if(recipes.length === 0) {
        recipeContainer.innerHTML = `<p>No recipes found.</p>`;
        return;
    }

    recipes.slice(0, 8).forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col-md-3');

        recipeCard.innerHTML = `
            <div class="card shadow-sm rounded-4 mb-4">
                <div class="card-body p-2">
                    <figure class="recipe-thumb rounded-4 overflow-hidden d-flex align-items-center jusitfy-content-center position-relative">
                        <a href="${'single-recipe.html?id='+recipe.id}" class="d-block">
                            <img src="${recipe.image}" alt="${recipe.name}" class="img-fluid">
                            <span class="position-absolute top-0 end-0 me-2 mt-2 bg-secondary border shadow-sm text-white small rounded-pill px-2">${recipe.cuisine}</span>
                        </a>
                    </figure>
                    <div class="recipe-quick-info px-3 pb-3">
                        <p class="mb-0 text-black-50">${recipe.mealType.join(', ')}</p>
                        <h5 class="text-truncate">${recipe.name}</h5>
                        <div class="d-flex align-items-center justify-content-between">
                            <h5 class="text-secondary m-0">${recipe.cookTimeMinutes} min</h5>
                            <p class="m-0 text-black-50">
                                <i class="bi bi-star-fill text-warning"></i> ${recipe.rating}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        recipeContainer.appendChild(recipeCard);
    })
}


//handle search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const selectedCuisine = cuisineSelect.value.toLowerCase(); 

    const filtered = allRecipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
        const cuisineMatch = selectedCuisine === 'all' || recipe.cusine.toLowerCase() === selectedCuisine;
        const cusineSearchMatch = recipe.cuisine.toLowerCase().includes(searchTerm);
        //const tagMatch = recipe.tags.some(tg => tg.toLowerCase().includes(searchTerm));
        //const ingredientsMatch = recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
        return cuisineMatch && (nameMatch || cusineSearchMatch);
    })

    console.log('Filtered Recipes', filtered);
    

    renderRecipies(filtered);
});

//handle cuisine dropdown
cuisineSelect.addEventListener('change', function() {
    const selectedCuisine = this.value.toLowerCase();
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = allRecipes.filter(recipe => {
        const cusineMatch = selectedCuisine === 'all' || recipe.cuisine.toLowerCase() === selectedCuisine;
        const nameMatch = recipe.name.toLowerCase().includes(searchTerm);

        return cusineMatch && nameMatch;
    })

    

    renderRecipies(filtered)
})



window.addEventListener('DOMContentLoaded', () => {
    getRecipes();
})