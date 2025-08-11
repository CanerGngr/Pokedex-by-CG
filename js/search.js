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
    hideSearchMessage();
    hideLoadMoreMessage();
    showAllPokemon();
    return;
  }

  // Check if query is numeric - allow shorter searches for numbers
  let isNumeric = /^\d+$/.test(searchQuery);
  let minimumLength = isNumeric ? 1 : 3;

  if (searchQuery.length >= minimumLength) {
    hideSearchMessage();
    performSearch(searchQuery);
  } else {
    showSearchMessage("Please enter at least 3 characters or 1+ numbers");
    showAllPokemon();
  }
}

// Perform search when button is clicked
function performButtonSearch() {
  let searchInput = document.getElementById("pokemon-search-input");
  searchQuery = searchInput.value.toLowerCase().trim();

  // Check if query is numeric - allow shorter searches for numbers
  let isNumeric = /^\d+$/.test(searchQuery);
  let minimumLength = isNumeric ? 1 : 3;

  if (searchQuery.length >= minimumLength) {
    performSearch(searchQuery);
  }
}

// Core search logic coordinator
function performSearch(query) {
  searchResults = [];

  for (let i = 0; i < pokemonData.length; i++) {
    let pokemon = pokemonData[i];
    let matchFound = checkPokemonMatch(pokemon, query);

    if (matchFound) {
      searchResults.push(pokemon);
    }
  }

  filterPokemonCards(searchResults);
  checkForLoadMoreMessage();
}

// Check if enough Pokemon are loaded to search
function checkForLoadMoreMessage() {
  if (!shouldShowLoadMoreMessage()) {
    return;
  }

  let isNumeric = /^\d+$/.test(searchQuery);
  if (isNumeric) {
    handleNumericSearchMessage();
  } else {
    handleTextSearchMessage();
  }
}

// Check if load more message should be shown
function shouldShowLoadMoreMessage() {
  if (searchResults.length > 0) {
    hideLoadMoreMessage();
    return false;
  }

  if (pokemonData.length >= totalPokemonCount) {
    hideLoadMoreMessage();
    return false;
  }

  return true;
}

// Handle message for numeric Pokemon ID searches
function handleNumericSearchMessage() {
  let searchedId = parseInt(searchQuery);
  let highestLoadedId = pokemonData.length;

  if (searchedId > highestLoadedId) {
    showLoadMoreMessage(
      `Pokemon #${searchQuery} might be available. Load more Pokemon to search!`
    );
  } else {
    hideLoadMoreMessage();
  }
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
  // Search by name (case-insensitive partial matching)
  if (pokemon.name.toLowerCase().includes(query)) {
    return true;
  }

  // Search by ID with enhanced matching
  if (checkIdMatch(pokemon.id, query)) {
    return true;
  }

  // Search by type
  return checkTypeMatch(pokemon.types, query);
}

// Enhanced ID matching with exact and partial matching
function checkIdMatch(pokemonId, query) {
  let pokemonIdString = pokemonId.toString();

  // Check if query is numeric
  if (/^\d+$/.test(query)) {
    // Exact match for numeric queries
    if (pokemonIdString === query) {
      return true;
    }

    // Try with auto-padded query (e.g., "50" becomes "050")
    let paddedQuery = padNumericQuery(query);
    if (pokemonIdString === paddedQuery) {
      return true;
    }

    // Partial match (for cases like "5" matching 15, 25, etc.)
    if (pokemonIdString.includes(query)) {
      return true;
    }
  } else {
    // Non-numeric partial matching
    if (pokemonIdString.includes(query)) {
      return true;
    }
  }

  return false;
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

  // Clear the grid completely
  grid.innerHTML = "";

  // Add only the filtered Pokemon cards back to the grid
  for (let i = 0; i < filteredData.length; i++) {
    createAndAppendCard(filteredData[i], grid);
  }

  // Hide pagination when showing search results
  let isNumeric = /^\d+$/.test(searchQuery);
  let minimumLength = isNumeric ? 1 : 3;
  if (searchQuery.length >= minimumLength) {
    hidePaginationContainer();
  }

  updateSearchResultsCount();
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
