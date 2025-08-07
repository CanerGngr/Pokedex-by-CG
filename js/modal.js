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
  let previousIndex = currentIndex - 1;

  if (previousIndex < 0) {
    previousIndex = pokemonData.length - 1;
  }

  let previousPokemon = pokemonData[previousIndex];
  currentPokemon = previousPokemon;
  populateModalContent(previousPokemon);
  updateModalNavigation();
}

// Navigate to next Pokemon in modal
function navigateToNextPokemon() {
  if (!currentPokemon) return;

  let currentIndex = findPokemonIndex(currentPokemon.id);
  let nextIndex = currentIndex + 1;

  if (nextIndex >= pokemonData.length) {
    nextIndex = 0;
  }

  let nextPokemon = pokemonData[nextIndex];
  currentPokemon = nextPokemon;
  populateModalContent(nextPokemon);
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

  if (leftArrow) {
    leftArrow.classList.remove("arrow-fade-in");
    leftArrow.classList.add("arrow-fade-out");
  }
  if (rightArrow) {
    rightArrow.classList.remove("arrow-fade-in");
    rightArrow.classList.add("arrow-fade-out");
  }
}

// Show arrows with fade in transition
function showArrowsWithTransition() {
  let leftArrow = document.getElementById("modal-nav-left");
  let rightArrow = document.getElementById("modal-nav-right");

  if (leftArrow && leftArrow.style.display !== "none") {
    leftArrow.classList.remove("arrow-fade-out");
    leftArrow.classList.add("arrow-fade-in");
  }
  if (rightArrow && rightArrow.style.display !== "none") {
    rightArrow.classList.remove("arrow-fade-out");
    rightArrow.classList.add("arrow-fade-in");
  }
}