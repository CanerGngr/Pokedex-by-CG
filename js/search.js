// Pokemon Search Functions - Standalone Module
// This file can be shared and integrated into any Pokemon project

// Global search state
let searchQuery = '';
let searchResults = [];

// Initialize search functionality
function initializeSearch() {
  searchQuery = '';
  searchResults = [];
  updateSearchResultsCount();
}

// Handle search input changes
function handleSearchInput() {
  updateSearchQuery();
  updateSearchButtonState();
  handleLiveSearch();
}

// Update global search query from input field
function updateSearchQuery() {
  let searchInput = document.getElementById('pokemon-search-input');
  searchQuery = searchInput.value.toLowerCase().trim();
}

// Enable/disable search button based on input length
function updateSearchButtonState() {
  let searchButton = document.getElementById('search-button');
  
  if (searchQuery.length >= 3) {
    searchButton.disabled = false;
  } else {
    searchButton.disabled = true;
  }
}

// Perform live search based on current input
function handleLiveSearch() {
  if (searchQuery.length === 0) {
    showAllPokemon();
    return;
  }
  
  if (searchQuery.length >= 1) {
    performSearch(searchQuery);
  }
}

// Perform search when button is clicked (requires 3+ characters)
function performButtonSearch() {
  let searchInput = document.getElementById('pokemon-search-input');
  searchQuery = searchInput.value.toLowerCase().trim();
  
  if (searchQuery.length >= 3) {
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
}

// Check if Pokemon matches search query
function checkPokemonMatch(pokemon, query) {
  // Search by name (case-insensitive partial matching)
  if (pokemon.name.toLowerCase().includes(query)) {
    return true;
  }
  
  // Search by ID (exact or partial number matching)
  let pokemonIdString = pokemon.id.toString();
  if (pokemonIdString.includes(query)) {
    return true;
  }
  
  // Search by type
  return checkTypeMatch(pokemon.types, query);
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
  let grid = document.getElementById('pokemon-grid');
  
  // Clear the grid completely
  grid.innerHTML = '';
  
  // Add only the filtered Pokemon cards back to the grid
  for (let i = 0; i < filteredData.length; i++) {
    createAndAppendCard(filteredData[i], grid);
  }
  
  updateSearchResultsCount();
}

// Create and append a single Pokemon card
function createAndAppendCard(pokemon, grid) {
  let cardHTML = createPokemonCardHTML(pokemon);
  
  let cardContainer = document.createElement('div');
  cardContainer.innerHTML = cardHTML;
  
  grid.appendChild(cardContainer);
}

// Show all Pokemon cards
function showAllPokemon() {
  searchResults = pokemonData.slice();
  filterPokemonCards(searchResults);
}

// Clear search and show all Pokemon
function clearSearch() {
  let searchInput = document.getElementById('pokemon-search-input');
  searchInput.value = '';
  searchQuery = '';
  showAllPokemon();
}

// Update search results count display
function updateSearchResultsCount() {
  let countElement = document.getElementById('search-results-count');
  if (countElement) {
    let totalPokemon = pokemonData.length;
    let visiblePokemon = searchQuery.length === 0 ? totalPokemon : searchResults.length;
    countElement.textContent = buildSearchCountText(visiblePokemon, totalPokemon);
  }
}

// Build search count text based on search state
function buildSearchCountText(visiblePokemon, totalPokemon) {
  if (searchQuery.length === 0) {
    return 'Showing all ' + totalPokemon + ' Pokemon';
  } else {
    return 'Found ' + visiblePokemon + ' of ' + totalPokemon + ' Pokemon';
  }
}