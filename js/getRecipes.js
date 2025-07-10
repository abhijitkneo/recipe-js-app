const recipeListContainer = document.getElementById('recipes');
const apiUrl = "https://dummyjson.com/recipes";


//get data without using async await
function getRecipes() {

    fetch(apiUrl)
    .then(response => {
        if(!response.ok) {
            throw new Error('Error fetching API');
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        const recipeContainer = document.getElementById('recipes');
        recipeContainer.innerHTML = '';

        data.recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('col-md-3');

            recipeCard.innerHTML = `
                <div class="card shadow-sm rounded-4 mb-4">
                    <div class="card-body p-2">
                        <figure class="recipe-thumb rounded-4 overflow-hidden d-flex align-items-center jusitfy-content-center position-relative">
                            <img src="${recipe.image}" alt="${recipe.name}" class="img-fluid">
                            <span class="position-absolute top-0 end-0 me-2 mt-2 bg-secondary border shadow-sm text-white small rounded-pill px-2">${recipe.cuisine}</span>
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
        });
    })
    .catch(error => {
        console.log("Fetch Error", error);
    });
}


window.addEventListener('DOMContentLoaded', () => {
    getRecipes();
})