// Pokemon Modal Functions

// Create modal structure if it doesn't exist
function createModalIfNeeded() {
  let existingModal = document.getElementById("pokemon-modal");
  if (!existingModal) {
    let main = document.getElementsByTagName("main")[0];
    main.innerHTML += createModalOverlayTemplate();
  }
}

// Populate modal with Pokemon content
function populateModalContent(pokemon) {
  let cardInner = document.getElementById("modal-card-inner");

  cardInner.innerHTML =
    createModalFrontSideTemplate(pokemon) +
    createModalBackSideTemplate(pokemon);
}

// Open Modal Function
function openModal(pokemonId) {
  let pokemon = pokemonData.find((p) => p.id === pokemonId);
  if (!pokemon) return;

  currentPokemon = pokemon;
  createModalIfNeeded();
  populateModalContent(pokemon);
  updateModalNavigation();

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

  hideArrowsWithTransition();
  cardInner.classList.add("flipped");

  setTimeout(function () {
    showArrowsWithTransition();
  }, 800);
}

// Flip Card Back Function (to Info Side)
function flipCardBack() {
  let cardInnerElements = document.getElementsByClassName("card-inner");
  let cardInner = cardInnerElements[0];

  hideArrowsWithTransition();
  cardInner.classList.remove("flipped");

  setTimeout(function () {
    showArrowsWithTransition();
  }, 800);
}

// Navigate to previous Pokemon in modal
function navigateToPreviousPokemon() {
  if (!currentPokemon) return;

  let currentIndex = findPokemonIndex(currentPokemon.id);
  let previousIndex = getPreviousIndex(currentIndex);
  navigateToIndex(previousIndex);
}

// Get previous index with wrap-around
function getPreviousIndex(currentIndex) {
  return currentIndex - 1 < 0 ? pokemonData.length - 1 : currentIndex - 1;
}

// Navigate to next Pokemon in modal
function navigateToNextPokemon() {
  if (!currentPokemon) return;

  let currentIndex = findPokemonIndex(currentPokemon.id);
  let nextIndex = getNextIndex(currentIndex);
  navigateToIndex(nextIndex);
}

// Get next index with wrap-around
function getNextIndex(currentIndex) {
  return currentIndex + 1 >= pokemonData.length ? 0 : currentIndex + 1;
}

// Navigate to Pokemon at specific index
function navigateToIndex(index) {
  let pokemon = pokemonData[index];
  currentPokemon = pokemon;
  populateModalContent(pokemon);
  updateModalNavigation();
}

// Find Pokemon index in data array
function findPokemonIndex(pokemonId) {
  for (let i = 0; i < pokemonData.length; i++) {
    if (pokemonData[i].id === pokemonId) {
      return i;
    }
  }
  return 0;
}

// Update modal navigation button visibility
function updateModalNavigation() {
  let leftArrow = document.getElementById("modal-nav-left");
  let rightArrow = document.getElementById("modal-nav-right");

  if (leftArrow && rightArrow) {
    leftArrow.style.display = pokemonData.length > 1 ? "flex" : "none";
    rightArrow.style.display = pokemonData.length > 1 ? "flex" : "none";
  }
}

// Hide arrows with fade out transition
function hideArrowsWithTransition() {
  let leftArrow = document.getElementById("modal-nav-left");
  let rightArrow = document.getElementById("modal-nav-right");
  applyArrowTransition(leftArrow, "arrow-fade-out", "arrow-fade-in");
  applyArrowTransition(rightArrow, "arrow-fade-out", "arrow-fade-in");
}

// Show arrows with fade in transition
function showArrowsWithTransition() {
  let leftArrow = document.getElementById("modal-nav-left");
  let rightArrow = document.getElementById("modal-nav-right");
  applyArrowTransitionIfVisible(leftArrow, "arrow-fade-in", "arrow-fade-out");
  applyArrowTransitionIfVisible(rightArrow, "arrow-fade-in", "arrow-fade-out");
}

// Apply transition classes to arrow element
function applyArrowTransition(arrow, addClass, removeClass) {
  if (arrow) {
    arrow.classList.remove(removeClass);
    arrow.classList.add(addClass);
  }
}

// Apply transition to arrow if it's visible
function applyArrowTransitionIfVisible(arrow, addClass, removeClass) {
  if (arrow && arrow.style.display !== "none") {
    applyArrowTransition(arrow, addClass, removeClass);
  }
}