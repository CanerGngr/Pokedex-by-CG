let pokemonData = [];
let currentPokemon = null;
let currentOffset = 0;
let initialDisplayCount = 20;
let currentDisplayCount = 20;
let totalPokemonCount = 0;
let isLoading = false;
const limit = 20;

function initializeApp() {
  loadPokemonList();
}

function initializePage() {
  let mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createMainContainerTemplate();
}
document.onkeydown = function (event) {
  let pokemonModal = document.getElementById("pokemon-modal");
  if (event.key === "Escape" && pokemonModal.style.display === "block") {
    closeModal();
  }
};
