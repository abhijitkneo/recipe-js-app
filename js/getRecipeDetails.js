const loader = document.getElementById('loader');
const recipeDetailContainer = document.querySelector('.recipe-details');
const recipeName = document.getElementById('recipeName');
const recipeImage = document.getElementById('recipeImage');
const mealType = document.getElementById('mealType');
const cookingTime = document.getElementById('cookingTime');
const cuisineType = document.getElementById('cuisineType');
const servingTo = document.getElementById('servingTo');
const difficultyLevel = document.getElementById('difficultyLevel');
const ingredientList = document.getElementById('ingredientList');
const recipeRatings = document.getElementById('recipeRatings');
const tagList = document.getElementById('tags');
const instructions = document.getElementById('instructions');

function getRecipeIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    console.log('params ->', params.get('id'));
    
    return params.get('id');
}

async function getRecipeDetails(id) {
    const apiUrl = `https://dummyjson.com/recipes/${id}`;
    
    try {
        loader.style.display = 'block';
        recipeDetailContainer.style.display = 'none';

        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error('Error fetching recipe details');
        }
        const data = await response.json();

        recipeName.textContent = data.name;
        mealType.textContent = data.mealType;
        cookingTime.textContent = data.cookTimeMinutes + ' min';
        cuisineType.textContent = data.cuisine;
        servingTo.textContent = data.servings;
        difficultyLevel.textContent = data.difficulty;
        recipeImage.src = data.image;
        recipeRatings.textContent = data.rating;
        
        ingredientList.innerHTML = '';
        data.ingredients.forEach(ing => {
            const li = document.createElement('LI');
            li.classList.add('bg-light', 'small', 'rounded-pill', 'border', 'px-3', 'py-1')
            li.textContent = ing;
            ingredientList.appendChild(li);
        });

        tagList.innerHTML = '';
        data.tags.forEach(tag => {
            const li = document.createElement('LI');
            li.textContent = tag;
            li.classList.add('small', 'rounded', 'fw-medium', 'bg-primary-subtle', 'px-2');
            tagList.appendChild(li);
        })

        instructions.innerHTML = ''
        data.instructions.forEach(instruction => {
            const li = document.createElement('LI');            
            //li.textContent = instruction;
            li.classList.add('d-inline-flex', 'gap-2')
            li.innerHTML = `<i class="bi bi-record-circle lh-1 mt-1"></i> ${instruction}`;
            instructions.appendChild(li);
        })

    } catch (error) {
        console.log('Error fetching data:', error);
        recipeDetailContainer.innerHTML = `<p>No recipe details found.</p>`;
    } finally {
        loader.style.display = 'none';
        recipeDetailContainer.style.display = 'flex';
    }
}


const recipeId = getRecipeIdFromUrl();
if(recipeId) {
    getRecipeDetails(recipeId);
} else {
    recipeDetailContainer.innerHTML = '<p>Invalid Recipe ID</p>'
}