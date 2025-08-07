// Pokemon Pagination Functions

// Show more Pokemon - reveal hidden Pokemon first, then load new ones if needed
function showMorePokemon() {
  if (isLoading) return;

  let revealedCount = revealHiddenPokemon();
  
  if (revealedCount > 0) {
    handleRevealedPokemon(revealedCount);
  } else if (currentOffset < totalPokemonCount) {
    loadNewPokemonFromAPI();
  }
}

// Reveal hidden Pokemon cards up to the limit
function revealHiddenPokemon() {
  let pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = pokemonGrid.children;
  return processHiddenCards(pokemonCards);
}

// Process hidden cards and reveal them
function processHiddenCards(pokemonCards) {
  let revealedCount = 0;
  
  for (
    let i = currentDisplayCount;
    i < pokemonData.length && revealedCount < limit;
    i++
  ) {
    if (pokemonCards[i] && pokemonCards[i].style.display === "none") {
      pokemonCards[i].style.display = "block";
      revealedCount++;
    }
  }
  return revealedCount;
}

// Handle successfully revealed Pokemon
function handleRevealedPokemon(revealedCount) {
  currentDisplayCount += revealedCount;
  updatePaginationButton();
}

// Load new Pokemon from API when no hidden Pokemon available
function loadNewPokemonFromAPI() {
  isLoading = true;
  showLoadingScreen();
  addMorePokemonCard();
}

// Show less Pokemon (hide last 20 Pokemon cards)
function showLessPokemon() {
  let pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = pokemonGrid.children;
  let newDisplayCount = calculateNewDisplayCount();
  
  hideCardsFromIndex(pokemonCards, newDisplayCount);
  currentDisplayCount = newDisplayCount;
  updatePaginationButton();
}

// Calculate new display count for show less
function calculateNewDisplayCount() {
  return Math.max(initialDisplayCount, currentDisplayCount - limit);
}

// Hide cards from specified index onwards
function hideCardsFromIndex(pokemonCards, newDisplayCount) {
  for (let i = newDisplayCount; i < currentDisplayCount; i++) {
    if (pokemonCards[i]) {
      pokemonCards[i].style.display = "none";
    }
  }
}

// Update pagination button based on current state
function updatePaginationButton() {
  let container = document.getElementById("pagination-container");
  
  if (shouldHidePaginationContainer()) {
    container.style.display = "none";
    return;
  }
  
  container.style.display = "block";
  container.innerHTML = buildPaginationButtonsHTML();
}

// Check if pagination container should be hidden
function shouldHidePaginationContainer() {
  return pokemonData.length === 0;
}

// Build HTML for pagination buttons based on current state
function buildPaginationButtonsHTML() {
  let buttonsHTML = "";
  
  if (currentOffset < totalPokemonCount) {
    buttonsHTML += createShowMoreButtonTemplate();
  }
  
  if (currentDisplayCount > initialDisplayCount) {
    buttonsHTML += " " + createShowLessButtonTemplate();
  }
  
  return buttonsHTML;
}