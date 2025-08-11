function updateCurrentOffset() {
  currentOffset += limit;
}

function addPokemonCard(pokemon) {
  if (!pokemon) return;

  let grid = document.getElementById("pokemon-grid");
  let cardHTML = createPokemonCardHTML(pokemon);

  let cardContainer = document.createElement("div");
  cardContainer.setAttribute("data-pokemon-id", pokemon.id);
  cardContainer.innerHTML = cardHTML;

  grid.appendChild(cardContainer);
}

function finalizePokemonLoading() {
  let leadElements = document.getElementsByClassName("lead");
  if (leadElements.length > 0) {
    leadElements[0].textContent = "Click on any Pokemon to see details!";
  }

  currentDisplayCount = pokemonData.length;

  initializeSearch();
  updatePaginationButton();
}

function handleLoadingError(error) {
  console.error("Error loading Pokemon:", error);
  let container = findContainer();
  container.innerHTML = createErrorTemplate(
    "Failed to load Pokemon data. Please try again later."
  );
}

function showLoadingScreen() {
  let container = document.getElementById("pagination-container");
  container.innerHTML = createLoadingTemplate();
  container.style.display = "block";
}

function hideLoadingScreen() {
  updatePaginationButton();
}

function findContainer() {
  let container = document.getElementById("main-container");
  if (!container) {
    container = document.getElementsByClassName("container")[0];
  }
  return container;
}