// Pokemon Core Application Functions

// Global variables
let pokemonData = [];
let currentPokemon = null;
let currentOffset = 0;
let initialDisplayCount = 20;
let currentDisplayCount = 20;
let totalPokemonCount = 0;
let isLoading = false;
const limit = 20;

// Initialize app when page loads - function to be called from HTML
function initializeApp() {
  loadPokemonList();
}

// Initialize page with loading state
function initializePage() {
  let mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createMainContainerTemplate();
}

// Close modal with Escape key
document.onkeydown = function (event) {
  let pokemonModal = document.getElementById("pokemon-modal");
  if (event.key === "Escape" && pokemonModal.style.display === "block") {
    closeModal();
  }
};
