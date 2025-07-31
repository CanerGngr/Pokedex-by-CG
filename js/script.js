// Pokemon Card Modal and Flip Functions

// Global variables
let pokemonData = [];
let currentPokemon = null;
let currentOffset = 0;
let pokemonPerPage = 50;
let initialDisplayCount = 20;
let maxDisplayCount = 50;
let currentDisplayCount = 20;
let totalPokemonCount = 0;
let isLoading = false;

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadPokemonList();
});

// Fetch Pokemon from PokeAPI
async function loadPokemonList() {
  try {
    initializePage();
    let pokemonList = await fetchPokemonListData();
    await loadAllPokemonDetails(pokemonList);
    finalizePokemonLoading();
  } catch (error) {
    handleLoadingError(error);
  }
}

// Initialize page with loading state
function initializePage() {
  let container = findContainer();
  container.innerHTML = createPageHeaderTemplate() + createPokemonGridTemplate() + '<div id="pagination-container" class="text-center mt-4" style="display: none;"></div>';
}

// Fetch initial Pokemon list from API
async function fetchPokemonListData() {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${currentOffset}`);
  let data = await response.json();
  totalPokemonCount = data.count;
  return data.results;
}

// Load detailed data for all Pokemon
async function loadAllPokemonDetails(pokemonList) {
  for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    let pokemonDetails = await fetchPokemonDetails(pokemon.url);
    pokemonData.push(pokemonDetails);
    addPokemonCard(pokemonDetails);
  }
}

// Update UI when Pokemon loading is complete
function finalizePokemonLoading() {
  let leadElements = document.getElementsByClassName('lead');
  if (leadElements.length > 0) {
    leadElements[0].textContent = 'Click on any Pokemon to see details!';
  }
  initializeSearch();
  updatePaginationButton();
}

// Handle errors during Pokemon loading
function handleLoadingError(error) {
  console.error('Error loading Pokemon:', error);
  let container = findContainer();
  container.innerHTML = createErrorTemplate('Failed to load Pokemon data. Please try again later.');
}

// Find the correct container element
function findContainer() {
  let container = document.querySelector('.container.py-4');
  if (!container) {
    container = document.querySelector('.container');
  }
  return container;
}

// Fetch detailed Pokemon data
async function fetchPokemonDetails(url) {
  try {
    let pokemon = await fetchBasicPokemonData(url);
    let speciesData = await fetchPokemonSpecies(pokemon.species.url);
    let description = extractEnglishDescription(speciesData);
    return buildPokemonObject(pokemon, description);
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    return null;
  }
}

// Fetch basic Pokemon data from API
async function fetchBasicPokemonData(url) {
  let response = await fetch(url);
  return await response.json();
}

// Fetch Pokemon species data for description
async function fetchPokemonSpecies(speciesUrl) {
  let response = await fetch(speciesUrl);
  return await response.json();
}

// Extract English description from species data
function extractEnglishDescription(speciesData) {
  let description = 'No description available';
  for (let i = 0; i < speciesData.flavor_text_entries.length; i++) {
    let entry = speciesData.flavor_text_entries[i];
    if (entry.language.name === 'en') {
      description = entry.flavor_text.replace(/\f/g, ' ');
      break;
    }
  }
  return description;
}

// Build complete Pokemon object with all data
function buildPokemonObject(pokemon, description) {
  return {
    id: pokemon.id,
    name: formatPokemonName(pokemon.name),
    image: getPokemonImage(pokemon.sprites),
    types: formatPokemonTypes(pokemon.types),
    height: formatHeight(pokemon.height),
    weight: formatWeight(pokemon.weight),
    description: description,
    generation: getGeneration(pokemon.id),
    stats: formatPokemonStats(pokemon.stats),
    abilities: formatPokemonAbilities(pokemon.abilities)
  };
}

// Format Pokemon name with proper capitalization
function formatPokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Get best available Pokemon image
function getPokemonImage(sprites) {
  return sprites.other['official-artwork'].front_default || sprites.front_default;
}

// Format Pokemon types with proper capitalization
function formatPokemonTypes(types) {
  return types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
}

// Format height in meters
function formatHeight(height) {
  return (height / 10) + ' m';
}

// Format weight in kilograms
function formatWeight(weight) {
  return (weight / 10) + ' kg';
}

// Format Pokemon stats object
function formatPokemonStats(stats) {
  return {
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    specialAttack: stats[3].base_stat,
    specialDefense: stats[4].base_stat,
    speed: stats[5].base_stat
  };
}

// Format Pokemon abilities with proper capitalization
function formatPokemonAbilities(abilities) {
  return abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1));
}

// Get generation based on Pokemon ID
function getGeneration(id) {
  if (id <= 151) return 'I';
  if (id <= 251) return 'II';
  if (id <= 386) return 'III';
  if (id <= 493) return 'IV';
  if (id <= 649) return 'V';
  if (id <= 721) return 'VI';
  if (id <= 809) return 'VII';
  if (id <= 898) return 'VIII';
  return 'IX';
}

// Add Pokemon card to grid
function addPokemonCard(pokemon) {
  if (!pokemon) return;
  
  let grid = document.getElementById('pokemon-grid');
  let cardHTML = createPokemonCardHTML(pokemon);
  
  let cardContainer = document.createElement('div');
  cardContainer.setAttribute('data-pokemon-id', pokemon.id);
  cardContainer.innerHTML = cardHTML;
  
  // Hide cards beyond initial display count
  if (pokemonData.length > initialDisplayCount) {
    cardContainer.style.display = 'none';
  }
  
  grid.appendChild(cardContainer);
}


// Close modal with Escape key
document.onkeydown = function(event) {
  let pokemonModal = document.getElementById("pokemon-modal");
  if (event.key === "Escape" && pokemonModal.style.display === "block") {
    closeModal();
  }
};

// Create modal structure if it doesn't exist
function createModalIfNeeded() {
  let existingModal = document.getElementById("pokemon-modal");
  if (!existingModal) {
    let main = document.querySelector("main");
    main.innerHTML += createModalOverlayTemplate();
  }
}

// Populate modal with Pokemon content
function populateModalContent(pokemon) {
  let cardInner = document.getElementById("modal-card-inner");
  
  cardInner.innerHTML = createModalFrontSideTemplate(pokemon) + createModalBackSideTemplate(pokemon);
}

// Open Modal Function
function openModal(pokemonId) {
  let pokemon = pokemonData.find(p => p.id === pokemonId);
  if (!pokemon) return;
  
  currentPokemon = pokemon;
  createModalIfNeeded();
  populateModalContent(pokemon);
  
  let pokemonModal = document.getElementById("pokemon-modal");
  pokemonModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close Modal Function
function closeModal() {
  let pokemonModal = document.getElementById("pokemon-modal");
  let cardInnerElements = document.getElementsByClassName("card-inner");
  let cardInner = cardInnerElements[0];

  pokemonModal.style.display = "none";
  document.body.style.overflow = "auto";

  if (cardInner.classList.contains("flipped")) {
    cardInner.classList.remove("flipped");
  }
}

// Flip Card Function (to Stats Side)
function flipCard() {
  let cardInnerElements = document.getElementsByClassName("card-inner");
  let cardInner = cardInnerElements[0];
  cardInner.classList.add("flipped");
}

// Flip Card Back Function (to Info Side)
function flipCardBack() {
  let cardInnerElements = document.getElementsByClassName("card-inner");
  let cardInner = cardInnerElements[0];
  cardInner.classList.remove("flipped");
}

// Show more Pokemon (reveal hidden cards)
function showMorePokemon() {
  let pokemonCards = document.querySelectorAll('#pokemon-grid > [data-pokemon-id]');
  
  for (let i = initialDisplayCount; i < maxDisplayCount && i < pokemonCards.length; i++) {
    pokemonCards[i].style.display = 'block';
  }
  
  currentDisplayCount = maxDisplayCount;
  updatePaginationButton();
}

// Show less Pokemon (hide cards 21-50, show only first 20)
function showLessPokemon() {
  let pokemonCards = document.querySelectorAll('#pokemon-grid > [data-pokemon-id]');
  
  for (let i = initialDisplayCount; i < pokemonCards.length; i++) {
    pokemonCards[i].style.display = 'none';
  }
  
  currentDisplayCount = initialDisplayCount;
  updatePaginationButton();
}

// Update pagination button based on current state
function updatePaginationButton() {
  let container = document.getElementById('pagination-container');
  
  if (pokemonData.length === 0) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'block';
  
  if (currentDisplayCount === initialDisplayCount && pokemonData.length > initialDisplayCount) {
    container.innerHTML = createShowMoreButtonTemplate();
  } else if (currentDisplayCount === maxDisplayCount) {
    container.innerHTML = createShowLessButtonTemplate();
  } else {
    container.style.display = 'none';
  }
}

