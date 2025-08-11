let searchQuery = "";
let searchResults = [];

function initializeSearch() {
  searchQuery = "";
  searchResults = [];
  updateSearchResultsCount();
}

function handleSearchInput() {
  updateSearchQuery();
  handleLiveSearch();
}

function updateSearchQuery() {
  let searchInput = document.getElementById("pokemon-search-input");
  searchQuery = searchInput.value.toLowerCase().trim();
}

function handleLiveSearch() {
  if (searchQuery.length === 0) {
    resetSearchDisplay();
    return;
  }

  if (isValidSearchLength()) {
    hideSearchMessage();
    performSearch(searchQuery);
  } else {
    handleInvalidSearchLength();
  }
}

function resetSearchDisplay() {
  hideSearchMessage();
  hideLoadMoreMessage();
  showAllPokemon();
}

function isValidSearchLength() {
  let isNumeric = /^\d+$/.test(searchQuery);
  let minimumLength = isNumeric ? 1 : 3;
  return searchQuery.length >= minimumLength;
}

function handleInvalidSearchLength() {
  showSearchMessage("Please enter at least 3 characters or 1+ numbers");
  showAllPokemon();
}

function performSearch(query) {
  searchResults = findMatchingPokemon(query);
  filterPokemonCards(searchResults);
  checkForLoadMoreMessage();
}

function findMatchingPokemon(query) {
  let matches = [];
  for (let i = 0; i < pokemonData.length; i++) {
    if (checkPokemonMatch(pokemonData[i], query)) {
      matches.push(pokemonData[i]);
    }
  }
  return matches;
}

function checkForLoadMoreMessage() {
  if (!shouldShowLoadMoreMessage()) {
    return;
  }

  if (isNumericSearch()) {
    handleNumericSearchMessage();
  } else {
    handleTextSearchMessage();
  }
}

function isNumericSearch() {
  return /^\d+$/.test(searchQuery);
}

function shouldShowLoadMoreMessage() {
  if (hasSearchResults() || allPokemonLoaded()) {
    hideLoadMoreMessage();
    return false;
  }
  return true;
}

function hasSearchResults() {
  return searchResults.length > 0;
}

function allPokemonLoaded() {
  return pokemonData.length >= totalPokemonCount;
}

function handleNumericSearchMessage() {
  let searchedId = parseInt(searchQuery);
  let highestLoadedId = pokemonData.length;

  if (isIdBeyondLoaded(searchedId, highestLoadedId)) {
    showIdNotLoadedMessage();
  } else {
    hideLoadMoreMessage();
  }
}

function isIdBeyondLoaded(searchedId, highestLoadedId) {
  return searchedId > highestLoadedId;
}

function showIdNotLoadedMessage() {
  showLoadMoreMessage(
    `Pokemon #${searchQuery} might be available. Load more Pokemon to search!`
  );
}

function handleTextSearchMessage() {
  showLoadMoreMessage(
    `No results for "${searchQuery}". Try loading more Pokemon - there might be a match!`
  );
}

function padNumericQuery(query) {
  if (/^\d+$/.test(query) && query.length <= 3) {
    return query.padStart(3, "0");
  }
  return query;
}

function checkPokemonMatch(pokemon, query) {
  return (
    matchesByName(pokemon, query) ||
    checkIdMatch(pokemon.id, query) ||
    checkTypeMatch(pokemon.types, query)
  );
}

function matchesByName(pokemon, query) {
  return pokemon.name.toLowerCase().includes(query);
}

function checkIdMatch(pokemonId, query) {
  let pokemonIdString = pokemonId.toString();

  if (isNumericSearch()) {
    return checkNumericIdMatch(pokemonIdString, query);
  }
  return pokemonIdString.includes(query);
}

function checkNumericIdMatch(pokemonIdString, query) {
  if (pokemonIdString === query) {
    return true;
  }

  let paddedQuery = padNumericQuery(query);
  if (pokemonIdString === paddedQuery) {
    return true;
  }

  return pokemonIdString.includes(query);
}

function checkTypeMatch(types, query) {
  for (let i = 0; i < types.length; i++) {
    if (types[i].toLowerCase().includes(query)) {
      return true;
    }
  }
  return false;
}

function filterPokemonCards(filteredData) {
  let grid = document.getElementById("pokemon-grid");
  clearAndPopulateGrid(grid, filteredData);
  handlePaginationVisibility();
  updateSearchResultsCount();
}

function clearAndPopulateGrid(grid, filteredData) {
  grid.innerHTML = "";
  for (let i = 0; i < filteredData.length; i++) {
    createAndAppendCard(filteredData[i], grid);
  }
}

function handlePaginationVisibility() {
  if (isValidSearchLength()) {
    hidePaginationContainer();
  }
}

function createAndAppendCard(pokemon, grid) {
  let cardHTML = createPokemonCardHTML(pokemon);

  let cardContainer = document.createElement("div");
  cardContainer.innerHTML = cardHTML;

  grid.appendChild(cardContainer);
}

function showAllPokemon() {
  searchResults = pokemonData.slice();
  filterPokemonCards(searchResults);

  if (searchQuery.length === 0) {
    updatePaginationButton();
  }
  hideLoadMoreMessage();
}

function clearSearch() {
  let searchInput = document.getElementById("pokemon-search-input");
  searchInput.value = "";
  searchQuery = "";
  showAllPokemon();
}

function updateSearchResultsCount() {
  let countElement = document.getElementById("search-results-count");
  if (countElement) {
    let totalPokemon = pokemonData.length;
    let visiblePokemon =
      searchQuery.length === 0 ? totalPokemon : searchResults.length;
    countElement.textContent = buildSearchCountText(
      visiblePokemon,
      totalPokemon
    );
  }
}

function buildSearchCountText(visiblePokemon, totalPokemon) {
  if (searchQuery.length === 0) {
    return "Showing all " + totalPokemon + " Pokemon";
  } else {
    return "Found " + visiblePokemon + " of " + totalPokemon + " Pokemon";
  }
}

function showSearchMessage(message) {
  let messageElement = document.getElementById("search-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.classList.remove("d-none");
    messageElement.classList.add("d-block");
  }
}

function hideSearchMessage() {
  let messageElement = document.getElementById("search-message");
  if (messageElement) {
    messageElement.classList.remove("d-block");
    messageElement.classList.add("d-none");
  }
}

function showLoadMoreMessage(message) {
  let messageElement = document.getElementById("load-more-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.classList.remove("d-none");
    messageElement.classList.add("d-block");
  }
}

function hideLoadMoreMessage() {
  let messageElement = document.getElementById("load-more-message");
  if (messageElement) {
    messageElement.classList.remove("d-block");
    messageElement.classList.add("d-none");
  }
}

function hidePaginationContainer() {
  let container = document.getElementById("pagination-container");
  if (container) {
    container.style.display = "none";
  }
}

function showPaginationContainer() {
  let container = document.getElementById("pagination-container");
  if (container) {
    container.style.display = "block";
  }
}
