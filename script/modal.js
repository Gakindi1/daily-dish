const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalServings = document.getElementById("modalServings");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");

function showModal(recipe) {
  modalTitle.textContent = recipe.title;
  modalServings.textContent = recipe.servings || "Not specified";

  // Show ingredients
  modalIngredients.innerHTML = "";
  const ingredients = parseIngredients(recipe);

  for (let i = 0; i < ingredients.length; i++) {
    const li = document.createElement("li");
    li.textContent = ingredients[i].trim();
    modalIngredients.appendChild(li);
  }

  // Show instructions
  modalInstructions.textContent =
    recipe.instructions || "No instructions available";

  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

function setupModalListeners() {
  // Close button click
  closeBtn.addEventListener("click", closeModal);

  // Click outside modal to close
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Press Escape to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}
