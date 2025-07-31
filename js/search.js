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

// Main search function triggered by oninput
function searchPokemon() {
  let searchInput = document.getElementById('pokemon-search-input');
  searchQuery = searchInput.value.toLowerCase().trim();
  
  if (searchQuery.length === 0) {
    showAllPokemon();
    return;
  }
  
  if (searchQuery.length >= 1) {
    performSearch(searchQuery);
  }
}

// Core search logic for name, ID, and type matching
function performSearch(query) {
  searchResults = [];
  
  for (let i = 0; i < pokemonData.length; i++) {
    let pokemon = pokemonData[i];
    let matchFound = false;
    
    // Search by name (case-insensitive partial matching)
    if (pokemon.name.toLowerCase().includes(query)) {
      matchFound = true;
    }
    
    // Search by ID (exact or partial number matching)
    let pokemonIdString = pokemon.id.toString();
    if (pokemonIdString.includes(query)) {
      matchFound = true;
    }
    
    // Search by type (case-insensitive partial matching)
    for (let j = 0; j < pokemon.types.length; j++) {
      if (pokemon.types[j].toLowerCase().includes(query)) {
        matchFound = true;
        break;
      }
    }
    
    if (matchFound) {
      searchResults.push(pokemon);
    }
  }
  
  filterPokemonCards(searchResults);
}

// Show/hide cards based on search results
function filterPokemonCards(filteredData) {
  let grid = document.getElementById('pokemon-grid');
  
  // Clear the grid completely
  grid.innerHTML = '';
  
  // Add only the filtered Pokemon cards back to the grid
  for (let i = 0; i < filteredData.length; i++) {
    let pokemon = filteredData[i];
    let cardHTML = createPokemonCardHTML(pokemon);
    
    let cardContainer = document.createElement('div');
    cardContainer.innerHTML = cardHTML;
    
    grid.appendChild(cardContainer);
  }
  
  updateSearchResultsCount();
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
    
    if (searchQuery.length === 0) {
      countElement.textContent = 'Showing all ' + totalPokemon + ' Pokemon';
    } else {
      countElement.textContent = 'Found ' + visiblePokemon + ' of ' + totalPokemon + ' Pokemon';
    }
  }
}