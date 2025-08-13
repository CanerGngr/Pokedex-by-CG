function createModalIfNeeded() {
  let existingModal = document.getElementById("pokemon-modal");
  if (!existingModal) {
    let main = document.getElementsByTagName("main")[0];
    main.innerHTML += createModalOverlayTemplate();
  }
}

function createPokemonCardHTML(pokemon) {
  let typeClasses = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    typeClasses += pokemon.types[i].toLowerCase();
    if (i < pokemon.types.length - 1) {
      typeClasses += " ";
    }
  }
  let pokemonId = pokemon.id.toString().padStart(3, "0");
  let typeBadges = createTypeBadgesHTML(pokemon.types);

  return createPokemonCardStructure(
    pokemon,
    typeClasses,
    pokemonId,
    typeBadges
  );
}

function createModalFrontSideTemplate(pokemon) {
  let pokemonId = pokemon.id.toString().padStart(3, "0");
  let typeBadges = createModalTypeBadgesHTML(pokemon.types);

  return createModalFrontCardStructure(pokemon, pokemonId, typeBadges);
}

function createModalTypeBadgesHTML(types) {
  let typeBadges = "";
  for (let i = 0; i < types.length; i++) {
    typeBadges +=
      '<span class="type-badge ' +
      types[i].toLowerCase() +
      '">' +
      '<span class="type-icon ' +
      types[i].toLowerCase() +
      '"></span>' +
      types[i] +
      "</span>";
  }
  return typeBadges;
}

function createTypeBadgesHTML(types) {
  let typeBadges = "";
  for (let i = 0; i < types.length; i++) {
    typeBadges +=
      '<span class="type-badge ' +
      types[i].toLowerCase() +
      '">' +
      '<span class="type-icon ' +
      types[i].toLowerCase() +
      '"></span>' +
      types[i] +
      "</span>";
  }
  return typeBadges;
}

function populateModalContent(pokemon) {
  let cardInner = document.getElementById("modal-card-inner");

  cardInner.innerHTML =
    createModalFrontSideTemplate(pokemon) +
    createModalBackSideTemplate(pokemon);
}

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

function flipCard() {
  let cardInnerElements = document.getElementsByClassName("card-inner");
  let cardInner = cardInnerElements[0];

  hideArrowsWithTransition();
  cardInner.classList.add("flipped");

  setTimeout(function () {
    showArrowsWithTransition();
  }, 800);
}

function flipCardBack() {
  let cardInnerElements = document.getElementsByClassName("card-inner");
  let cardInner = cardInnerElements[0];

  hideArrowsWithTransition();
  cardInner.classList.remove("flipped");

  setTimeout(function () {
    showArrowsWithTransition();
  }, 800);
}

function navigateToPreviousPokemon() {
  if (!currentPokemon) return;

  let currentIndex = findPokemonIndex(currentPokemon.id);
  let previousIndex = getPreviousIndex(currentIndex);
  navigateToIndex(previousIndex);
}

function getPreviousIndex(currentIndex) {
  return currentIndex - 1 < 0 ? pokemonData.length - 1 : currentIndex - 1;
}

function navigateToNextPokemon() {
  if (!currentPokemon) return;

  let currentIndex = findPokemonIndex(currentPokemon.id);
  let nextIndex = getNextIndex(currentIndex);
  navigateToIndex(nextIndex);
}

function getNextIndex(currentIndex) {
  return currentIndex + 1 >= pokemonData.length ? 0 : currentIndex + 1;
}

function navigateToIndex(index) {
  let pokemon = pokemonData[index];
  currentPokemon = pokemon;
  populateModalContent(pokemon);
  updateModalNavigation();
}

function findPokemonIndex(pokemonId) {
  for (let i = 0; i < pokemonData.length; i++) {
    if (pokemonData[i].id === pokemonId) {
      return i;
    }
  }
  return 0;
}

function updateModalNavigation() {
  let leftArrow = document.getElementById("modal-nav-left");
  let rightArrow = document.getElementById("modal-nav-right");

  if (leftArrow && rightArrow) {
    leftArrow.style.display = pokemonData.length > 1 ? "flex" : "none";
    rightArrow.style.display = pokemonData.length > 1 ? "flex" : "none";
  }
}

function hideArrowsWithTransition() {
  let leftArrow = document.getElementById("modal-nav-left");
  let rightArrow = document.getElementById("modal-nav-right");
  applyArrowTransition(leftArrow, "arrow-fade-out", "arrow-fade-in");
  applyArrowTransition(rightArrow, "arrow-fade-out", "arrow-fade-in");
}

function showArrowsWithTransition() {
  let leftArrow = document.getElementById("modal-nav-left");
  let rightArrow = document.getElementById("modal-nav-right");
  applyArrowTransitionIfVisible(leftArrow, "arrow-fade-in", "arrow-fade-out");
  applyArrowTransitionIfVisible(rightArrow, "arrow-fade-in", "arrow-fade-out");
}

function applyArrowTransition(arrow, addClass, removeClass) {
  if (arrow) {
    arrow.classList.remove(removeClass);
    arrow.classList.add(addClass);
  }
}

function applyArrowTransitionIfVisible(arrow, addClass, removeClass) {
  if (arrow && arrow.style.display !== "none") {
    applyArrowTransition(arrow, addClass, removeClass);
  }
}
