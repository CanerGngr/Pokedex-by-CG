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
  let maxCards = Math.min(pokemonData.length, currentDisplayCount + limit);

  for (let i = currentDisplayCount; i < maxCards; i++) {
    if (revealCard(pokemonCards[i])) {
      revealedCount++;
    }
  }
  return revealedCount;
}

// Reveal a single card if it's hidden
function revealCard(card) {
  if (card && card.style.display === "none") {
    card.style.display = "block";
    return true;
  }
  return false;
}

// Handle successfully revealed Pokemon
function handleRevealedPokemon(revealedCount) {
  let scrollStartIndex = currentDisplayCount;
  currentDisplayCount += revealedCount;
  updatePaginationButton();
  scrollToNewCards(scrollStartIndex);
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
  return pokemonData.length === 0 || (searchQuery && searchQuery.length >= 3);
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

// Scroll to newly revealed Pokemon cards with smooth animation
function scrollToNewCards(startIndex) {
  let paginationContainer = document.getElementById("pagination-container");
  if (!paginationContainer) return;

  let targetY = calculateScrollTarget(paginationContainer);
  performSmoothScroll(targetY);
}

// Calculate scroll target position
function calculateScrollTarget(container) {
  let containerRect = container.getBoundingClientRect();
  let currentScrollY = window.pageYOffset;
  return currentScrollY + containerRect.top - 50;
}

// Perform smooth scroll to target position
function performSmoothScroll(targetY) {
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}
