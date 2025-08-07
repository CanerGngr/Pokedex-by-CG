// Pokemon UI Helper Functions

function updateCurrentOffset() {
  currentOffset += limit;
}

function addPokemonCard(pokemon) {
  console.log(pokemon);

  if (!pokemon) return;

  let grid = document.getElementById("pokemon-grid");
  let cardHTML = createPokemonCardHTML(pokemon);

  let cardContainer = document.createElement("div");
  cardContainer.setAttribute("data-pokemon-id", pokemon.id);
  cardContainer.innerHTML = cardHTML;

  grid.appendChild(cardContainer);
}

// Update UI when Pokemon loading is complete
function finalizePokemonLoading() {
  let leadElements = document.getElementsByClassName("lead");
  if (leadElements.length > 0) {
    leadElements[0].textContent = "Click on any Pokemon to see details!";
  }

  // Set initial display count (all initially loaded Pokemon are visible)
  currentDisplayCount = pokemonData.length;

  initializeSearch();
  updatePaginationButton();
}

// Handle errors during Pokemon loading
function handleLoadingError(error) {
  console.error("Error loading Pokemon:", error);
  let container = findContainer();
  container.innerHTML = createErrorTemplate(
    "Failed to load Pokemon data. Please try again later."
  );
}

// Show loading screen in pagination container
function showLoadingScreen() {
  let container = document.getElementById("pagination-container");
  container.innerHTML = createLoadingTemplate();
  container.style.display = "block";
}

// Hide loading screen and restore pagination buttons
function hideLoadingScreen() {
  updatePaginationButton();
}

// Find the correct container element
function findContainer() {
  let container = document.getElementById("main-container");
  if (!container) {
    container = document.getElementsByClassName("container")[0];
  }
  return container;
}