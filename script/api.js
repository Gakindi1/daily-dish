import { API_KEY } from "./env.js";

const API_URL = "https://api.api-ninjas.com/v1/recipe";

async function fetchRandomRecipe() {
  const foods = [
    "pasta",
    "chicken",
    "soup",
    "salad",
    "beef",
    "fish",
    "cake",
    "rice",
    "curry",
    "pizza",
  ];

  const randomFood = foods[Math.floor(Math.random() * foods.length)];

  try {
    const response = await fetch(API_URL + "?query=" + randomFood, {
      method: "GET",
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      alert("The api is currently unavailable. Please try again later.");
      return null;
    }

    const data = await response.json();

    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
}

async function fetchRecipes(searchTerm) {
  try {
    const response = await fetch(API_URL + "?query=" + searchTerm, {
      method: "GET",
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      alert("The api is currently unavailable. Please try again later.");
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
}

function parseIngredients(recipe) {
  return recipe.ingredients ? recipe.ingredients.split("|") : [];
}

export { fetchRandomRecipe, fetchRecipes, parseIngredients };
