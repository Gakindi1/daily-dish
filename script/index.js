import { setupModalListeners, showModal } from "./modal.js";
import { fetchRandomRecipe, fetchRecipes, parseIngredients } from "./api.js";

let featuredRecipeData = null;
let searchResults = [];

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const featuredRecipe = document.getElementById("featuredRecipe");
const resultsSection = document.getElementById("resultsSection");
const recipeGrid = document.getElementById("recipeGrid");
const resultsCount = document.getElementById("resultsCount");

async function loadFeaturedRecipe() {
  featuredRecipe.innerHTML =
    '<p class="loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</p>';

  const recipe = await fetchRandomRecipe();

  if (recipe) {
    featuredRecipeData = recipe;
    displayFeaturedRecipe(recipe);
  } else {
    featuredRecipe.innerHTML = "<p>No recipe found. Refresh to try again!</p>";
  }
}

function displayFeaturedRecipe(recipe) {
  const ingredients = parseIngredients(recipe);
  const numIngredients = ingredients.length;

  let preview = "";
  if (ingredients.length > 0) {
    const first3 = ingredients.slice(0, 3);
    preview = first3.join(", ");
    if (ingredients.length > 3) {
      preview += "...";
    }
  }

  featuredRecipe.innerHTML =
    "<h3>" +
    recipe.title +
    "</h3>" +
    '<p class="info"><i class="fa-solid fa-users"></i> ' +
    (recipe.servings || "N/A") +
    " servings | " +
    '<i class="fa-solid fa-carrot"></i> ' +
    numIngredients +
    " ingredients</p>" +
    '<p class="preview"><strong>Ingredients:</strong> ' +
    preview +
    "</p>" +
    '<button class="view-btn" id="featuredBtn">View Full Recipe</button>';

  document.getElementById("featuredBtn").addEventListener("click", function () {
    showModal(featuredRecipeData);
  });
}

async function searchRecipes(searchTerm) {
  resultsSection.classList.remove("hidden");
  recipeGrid.innerHTML =
    '<div class="message"><i class="fa-solid fa-spinner fa-spin"></i> Searching...</div>';

  const recipes = await fetchRecipes(searchTerm);
  searchResults = recipes;
  displaySearchResults(recipes);
}

function displaySearchResults(recipes) {
  recipeGrid.innerHTML = "";
  resultsCount.textContent = recipes.length;

  if (recipes.length === 0) {
    recipeGrid.innerHTML =
      '<div class="message"><i class="fa-solid fa-utensils"></i> No recipes found. Try a different search.</div>';
    return;
  }

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const ingredients = parseIngredients(recipe);

    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML =
      "<h3>" +
      recipe.title +
      "</h3>" +
      '<p class="info">' +
      (recipe.servings || "N/A") +
      " servings | " +
      ingredients.length +
      " ingredients</p>" +
      '<button class="view-btn" data-index="' +
      i +
      '">View Recipe</button>';

    recipeGrid.appendChild(card);
  }
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchRecipes(searchTerm);
  }
});

recipeGrid.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-btn")) {
    const index = e.target.getAttribute("data-index");
    showModal(searchResults[index]);
  }
});

setupModalListeners();
loadFeaturedRecipe();
