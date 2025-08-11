function showMorePokemon() {
  if (isLoading) return;

  let revealedCount = revealHiddenPokemon();

  if (revealedCount > 0) {
    handleRevealedPokemon(revealedCount);
  } else if (currentOffset < totalPokemonCount) {
    loadNewPokemonFromAPI();
  }
}

function revealHiddenPokemon() {
  let pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = pokemonGrid.children;
  return processHiddenCards(pokemonCards);
}

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

function revealCard(card) {
  if (card && card.style.display === "none") {
    card.style.display = "block";
    return true;
  }
  return false;
}

function handleRevealedPokemon(revealedCount) {
  let scrollStartIndex = currentDisplayCount;
  currentDisplayCount += revealedCount;
  updatePaginationButton();
  scrollToNewCards(scrollStartIndex);
}

function loadNewPokemonFromAPI() {
  isLoading = true;
  showLoadingScreen();
  addMorePokemonCard();
}

function showLessPokemon() {
  let pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = pokemonGrid.children;
  let newDisplayCount = calculateNewDisplayCount();

  hideCardsFromIndex(pokemonCards, newDisplayCount);
  currentDisplayCount = newDisplayCount;
  updatePaginationButton();
}

function calculateNewDisplayCount() {
  return Math.max(initialDisplayCount, currentDisplayCount - limit);
}

function hideCardsFromIndex(pokemonCards, newDisplayCount) {
  for (let i = newDisplayCount; i < currentDisplayCount; i++) {
    if (pokemonCards[i]) {
      pokemonCards[i].style.display = "none";
    }
  }
}

function updatePaginationButton() {
  let container = document.getElementById("pagination-container");

  if (shouldHidePaginationContainer()) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  container.innerHTML = buildPaginationButtonsHTML();
}

function shouldHidePaginationContainer() {
  return pokemonData.length === 0 || (searchQuery && searchQuery.length >= 3);
}

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

function scrollToNewCards(startIndex) {
  let paginationContainer = document.getElementById("pagination-container");
  if (!paginationContainer) return;

  let targetY = calculateScrollTarget(paginationContainer);
  performSmoothScroll(targetY);
}

function calculateScrollTarget(container) {
  let containerRect = container.getBoundingClientRect();
  let currentScrollY = window.pageYOffset;
  return currentScrollY + containerRect.top - 50;
}

function performSmoothScroll(targetY) {
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}
