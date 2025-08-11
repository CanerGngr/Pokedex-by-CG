// Pokemon Search Functions - Standalone Module
// This file can be shared and integrated into any Pokemon project

// Global search state
let searchQuery = "";
let searchResults = [];

// Initialize search functionality
function initializeSearch() {
  searchQuery = "";
  searchResults = [];
  updateSearchResultsCount();
}

// Handle search input changes
function handleSearchInput() {
  updateSearchQuery();
  handleLiveSearch();
}

// Update global search query from input field
function updateSearchQuery() {
  let searchInput = document.getElementById("pokemon-search-input");
  searchQuery = searchInput.value.toLowerCase().trim();
}

// Perform live search based on current input
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

// Reset search display to show all Pokemon
function resetSearchDisplay() {
  hideSearchMessage();
  hideLoadMoreMessage();
  showAllPokemon();
}

// Check if search query length is valid
function isValidSearchLength() {
  let isNumeric = /^\d+$/.test(searchQuery);
  let minimumLength = isNumeric ? 1 : 3;
  return searchQuery.length >= minimumLength;
}

// Handle invalid search length
function handleInvalidSearchLength() {
  showSearchMessage("Please enter at least 3 characters or 1+ numbers");
  showAllPokemon();
}

// Core search logic coordinator
function performSearch(query) {
  searchResults = findMatchingPokemon(query);
  filterPokemonCards(searchResults);
  checkForLoadMoreMessage();
}

// Find all Pokemon matching the search query
function findMatchingPokemon(query) {
  let matches = [];
  for (let i = 0; i < pokemonData.length; i++) {
    if (checkPokemonMatch(pokemonData[i], query)) {
      matches.push(pokemonData[i]);
    }
  }
  return matches;
}

// Check if enough Pokemon are loaded to search
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

// Check if current search is numeric
function isNumericSearch() {
  return /^\d+$/.test(searchQuery);
}

// Check if load more message should be shown
function shouldShowLoadMoreMessage() {
  if (hasSearchResults() || allPokemonLoaded()) {
    hideLoadMoreMessage();
    return false;
  }
  return true;
}

// Check if search has results
function hasSearchResults() {
  return searchResults.length > 0;
}

// Check if all Pokemon are loaded
function allPokemonLoaded() {
  return pokemonData.length >= totalPokemonCount;
}

// Handle message for numeric Pokemon ID searches
function handleNumericSearchMessage() {
  let searchedId = parseInt(searchQuery);
  let highestLoadedId = pokemonData.length;

  if (isIdBeyondLoaded(searchedId, highestLoadedId)) {
    showIdNotLoadedMessage();
  } else {
    hideLoadMoreMessage();
  }
}

// Check if searched ID is beyond loaded Pokemon
function isIdBeyondLoaded(searchedId, highestLoadedId) {
  return searchedId > highestLoadedId;
}

// Show message for ID not yet loaded
function showIdNotLoadedMessage() {
  showLoadMoreMessage(
    `Pokemon #${searchQuery} might be available. Load more Pokemon to search!`
  );
}

// Handle message for text-based Pokemon searches
function handleTextSearchMessage() {
  showLoadMoreMessage(
    `No results for "${searchQuery}". Try loading more Pokemon - there might be a match!`
  );
}

// Auto-pad numeric queries for better ID matching
function padNumericQuery(query) {
  if (/^\d+$/.test(query) && query.length <= 3) {
    return query.padStart(3, "0");
  }
  return query;
}

// Check if Pokemon matches search query
function checkPokemonMatch(pokemon, query) {
  return (
    matchesByName(pokemon, query) ||
    checkIdMatch(pokemon.id, query) ||
    checkTypeMatch(pokemon.types, query)
  );
}

// Check if Pokemon matches by name
function matchesByName(pokemon, query) {
  return pokemon.name.toLowerCase().includes(query);
}

// Enhanced ID matching with exact and partial matching
function checkIdMatch(pokemonId, query) {
  let pokemonIdString = pokemonId.toString();

  if (isNumericSearch()) {
    return checkNumericIdMatch(pokemonIdString, query);
  }
  return pokemonIdString.includes(query);
}

// Check numeric ID matching with exact and partial match
function checkNumericIdMatch(pokemonIdString, query) {
  // Exact match
  if (pokemonIdString === query) {
    return true;
  }

  // Try with auto-padded query
  let paddedQuery = padNumericQuery(query);
  if (pokemonIdString === paddedQuery) {
    return true;
  }

  // Partial match
  return pokemonIdString.includes(query);
}

// Check if any Pokemon type matches query
function checkTypeMatch(types, query) {
  for (let i = 0; i < types.length; i++) {
    if (types[i].toLowerCase().includes(query)) {
      return true;
    }
  }
  return false;
}

// Show/hide cards based on search results
function filterPokemonCards(filteredData) {
  let grid = document.getElementById("pokemon-grid");
  clearAndPopulateGrid(grid, filteredData);
  handlePaginationVisibility();
  updateSearchResultsCount();
}

// Clear grid and populate with filtered data
function clearAndPopulateGrid(grid, filteredData) {
  grid.innerHTML = "";
  for (let i = 0; i < filteredData.length; i++) {
    createAndAppendCard(filteredData[i], grid);
  }
}

// Handle pagination visibility during search
function handlePaginationVisibility() {
  if (isValidSearchLength()) {
    hidePaginationContainer();
  }
}

// Create and append a single Pokemon card
function createAndAppendCard(pokemon, grid) {
  let cardHTML = createPokemonCardHTML(pokemon);

  let cardContainer = document.createElement("div");
  cardContainer.innerHTML = cardHTML;

  grid.appendChild(cardContainer);
}

// Show all Pokemon cards
function showAllPokemon() {
  searchResults = pokemonData.slice();
  filterPokemonCards(searchResults);

  // Show pagination when not searching
  if (searchQuery.length === 0) {
    updatePaginationButton();
  }
  hideLoadMoreMessage();
}

// Clear search and show all Pokemon
function clearSearch() {
  let searchInput = document.getElementById("pokemon-search-input");
  searchInput.value = "";
  searchQuery = "";
  showAllPokemon();
}

// Update search results count display
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

// Build search count text based on search state
function buildSearchCountText(visiblePokemon, totalPokemon) {
  if (searchQuery.length === 0) {
    return "Showing all " + totalPokemon + " Pokemon";
  } else {
    return "Found " + visiblePokemon + " of " + totalPokemon + " Pokemon";
  }
}

// Show search message for minimum character requirement
function showSearchMessage(message) {
  let messageElement = document.getElementById("search-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.classList.remove("d-none");
    messageElement.classList.add("d-block");
  }
}

// Hide search message
function hideSearchMessage() {
  let messageElement = document.getElementById("search-message");
  if (messageElement) {
    messageElement.classList.remove("d-block");
    messageElement.classList.add("d-none");
  }
}

// Show message when not enough Pokemon Card loaded for the search
function showLoadMoreMessage(message) {
  let messageElement = document.getElementById("load-more-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.classList.remove("d-none");
    messageElement.classList.add("d-block");
  }
}

// Hide loadMore message
function hideLoadMoreMessage() {
  let messageElement = document.getElementById("load-more-message");
  if (messageElement) {
    messageElement.classList.remove("d-block");
    messageElement.classList.add("d-none");
  }
}

// Hide pagination container during search
function hidePaginationContainer() {
  let container = document.getElementById("pagination-container");
  if (container) {
    container.style.display = "none";
  }
}

// Show pagination container when not searching
function showPaginationContainer() {
  let container = document.getElementById("pagination-container");
  if (container) {
    container.style.display = "block";
  }
}
