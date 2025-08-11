// Pokemon HTML Template Functions

// Template for creating a loading message
function createLoadingTemplate() {
  return (
    '<div id="loading-message" class="text-center p-4">' +
    '<div class="spinner-border text-primary" role="status">' +
    '<span class="visually-hidden">Loading...</span>' +
    "</div>" +
    '<p class="mt-2">Loading Pokemon...</p>' +
    "</div>"
  );
}

// Template for creating an error message
function createErrorTemplate(message) {
  return (
    '<div class="alert alert-danger text-center" role="alert">' +
    "<strong>Error:</strong> " +
    message +
    "</div>"
  );
}

// Template for creating Pokemon card grid container
function createPokemonGridTemplate() {
  return '<div id="pokemon-grid">' + "</div>";
}

// Template for creating Pokemon card HTML
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

// Create HTML for Pokemon type badges
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

// Create complete Pokemon card structure HTML
function createPokemonCardStructure(
  pokemon,
  typeClasses,
  pokemonId,
  typeBadges
) {
  return (
    '<div class="pokemon-card ' +
    typeClasses +
    '" data-pokemon-id="' +
    pokemon.id +
    '" onclick="openModal(' +
    pokemon.id +
    ')">' +
    '<div class="pokemon-card-content">' +
    '<div class="pokemon-image-container">' +
    '<img src="' +
    pokemon.image +
    '" alt="' +
    pokemon.name +
    '" class="pokemon-image">' +
    "</div>" +
    '<div class="pokemon-info">' +
    '<h3 class="pokemon-name">' +
    pokemon.name +
    "</h3>" +
    '<span class="pokemon-id">#' +
    pokemonId +
    "</span>" +
    '<div class="pokemon-types">' +
    typeBadges +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

// Template for page header with loading message
function createPageHeaderTemplate() {
  return (
    '<div class="text-center mb-4">' +
    '<h1 class="display-4 mb-3">Pokedex</h1>' +
    '<p class="lead text-muted">Loading Pokemon...</p>' +
    "</div>" +
    createSearchBarTemplate()
  );
}

// Template for search bar
function createSearchBarTemplate() {
  return (
    '<div class="search-container mb-4">' +
    '<div class="row justify-content-center">' +
    '<div class="col-md-6">' +
    createSearchInputGroup() +
    '<div class="text-center mt-2">' +
    '<small id="search-message" class="text-warning d-none"></small>' +
    '<small id="search-results-count" class="text-muted"></small>' +
    '<small id="load-more-message" class="text-primary d-none"></small>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

// Create search input group with icon and buttons
function createSearchInputGroup() {
  return (
    '<div class="input-group">' +
    createSearchIcon() +
    '<input type="text" class="form-control" id="pokemon-search-input" placeholder="Search by name, ID, or type (e.g., \'pika\', \'25\', \'fire\', \'grass\')..." oninput="handleSearchInput()">' +
    '<button class="btn btn-outline-secondary" type="button" onclick="clearSearch()">Clear</button>' +
    "</div>"
  );
}

// Create search icon HTML
function createSearchIcon() {
  return (
    '<span class="input-group-text">' +
    '<svg width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">' +
    '<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>' +
    "</svg>" +
    "</span>"
  );
}

// Template for modal overlay structure
function createModalOverlayTemplate() {
  return (
    '<div id="pokemon-modal" class="pokemon-modal" onclick="closeModal()">' +
    '<div class="modal-content" onclick="event.stopPropagation()">' +
    '<div class="modal-close" onclick="closeModal()">&times;</div>' +
    createModalCardContainer() +
    "</div>" +
    "</div>"
  );
}

// Create modal card container with navigation
function createModalCardContainer() {
  return (
    '<div class="pokemon-card-detailed">' +
    '<div class="modal-nav-arrow modal-nav-left" id="modal-nav-left" onclick="navigateToPreviousPokemon()">' +
    '<img src="./assets/icons/arrow-left.svg" alt="Previous" width="24" height="24">' +
    "</div>" +
    '<div class="modal-nav-arrow modal-nav-right" id="modal-nav-right" onclick="navigateToNextPokemon()">' +
    '<img src="./assets/icons/arrow-right.svg" alt="Next" width="24" height="24">' +
    "</div>" +
    '<div class="card-inner" id="modal-card-inner">' +
    "</div>" +
    "</div>"
  );
}

// Template for modal front side with Pokemon details
function createModalFrontSideTemplate(pokemon) {
  let pokemonId = pokemon.id.toString().padStart(3, "0");
  let typeBadges = createModalTypeBadgesHTML(pokemon.types);

  return createModalFrontCardStructure(pokemon, pokemonId, typeBadges);
}

// Create type badges HTML for modal
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

// Create modal front card structure HTML
function createModalFrontCardStructure(pokemon, pokemonId, typeBadges) {
  return (
    '<div class="card-front ' +
    pokemon.types[0].toLowerCase() +
    '">' +
    '<div class="detailed-image-container">' +
    '<img id="modal-pokemon-image" src="' +
    pokemon.image +
    '" alt="' +
    pokemon.name +
    '" class="detailed-pokemon-image">' +
    "</div>" +
    createModalDetailedInfo(pokemon, pokemonId, typeBadges) +
    "</div>"
  );
}

// Create detailed info section for modal
function createModalDetailedInfo(pokemon, pokemonId, typeBadges) {
  return (
    '<div class="detailed-info">' +
    '<h2 id="modal-pokemon-name">' +
    pokemon.name +
    "</h2>" +
    '<span class="modal-pokemon-id" id="modal-pokemon-id">#' +
    pokemonId +
    "</span>" +
    '<div id="modal-pokemon-types" class="pokemon-types">' +
    typeBadges +
    "</div>" +
    '<p id="modal-pokemon-description" class="pokemon-description">' +
    pokemon.description +
    "</p>" +
    createPokemonDetailsTemplate(pokemon) +
    '<button class="flip-button" onclick="flipCard()">View Stats</button>' +
    "</div>"
  );
}

// Template for Pokemon details section
function createPokemonDetailsTemplate(pokemon) {
  return (
    '<div class="pokemon-details">' +
    createDetailItem("Height:", "modal-pokemon-height", pokemon.height) +
    createDetailItem("Weight:", "modal-pokemon-weight", pokemon.weight) +
    createDetailItem(
      "Generation:",
      "modal-pokemon-generation",
      pokemon.generation
    ) +
    "</div>"
  );
}

// Create individual detail item HTML
function createDetailItem(label, id, value) {
  return (
    '<div class="detail-item">' +
    '<span class="detail-label">' +
    label +
    "</span>" +
    '<span id="' +
    id +
    '">' +
    value +
    "</span>" +
    "</div>"
  );
}

// Template for modal back side with Pokemon stats
function createModalBackSideTemplate(pokemon) {
  return (
    '<div class="card-back">' +
    '<div class="stats-container">' +
    "<h3>Base Stats</h3>" +
    createAllStatsTemplate(pokemon.stats) +
    createAbilitiesTemplate(pokemon.abilities) +
    '<button class="flip-button back" onclick="flipCardBack()">Back to Info</button>' +
    "</div>" +
    "</div>"
  );
}

// Template for all Pokemon stats including total
function createAllStatsTemplate(stats) {
  let total = calculateStatsTotal(stats);
  return (
    createBasicStatsTemplate(stats) +
    createStatItemTemplate("Total", total, "total-stats")
  );
}

// Calculate total stats value
function calculateStatsTotal(stats) {
  return (
    stats.hp +
    stats.attack +
    stats.defense +
    stats.specialAttack +
    stats.specialDefense +
    stats.speed
  );
}

// Create basic stats template (excluding total)
function createBasicStatsTemplate(stats) {
  return (
    createStatItemTemplate("HP", stats.hp) +
    createStatItemTemplate("Attack", stats.attack) +
    createStatItemTemplate("Defense", stats.defense) +
    createStatItemTemplate("Sp. Att", stats.specialAttack) +
    createStatItemTemplate("Sp. Def", stats.specialDefense) +
    createStatItemTemplate("Speed", stats.speed)
  );
}

// Template for individual stat item
function createStatItemTemplate(statName, statValue, extraClass) {
  let maxValue = statName === "Total" ? 800 : 150;
  let percentage = Math.min((statValue / maxValue) * 100, 100);
  let cssClass = statName.toLowerCase().replace(".", "").replace(" ", "-");
  let itemClass = extraClass ? "stat-item " + extraClass : "stat-item";

  return buildStatItemHTML(
    itemClass,
    statName,
    cssClass,
    percentage,
    statValue
  );
}

// Build stat item HTML structure
function buildStatItemHTML(
  itemClass,
  statName,
  cssClass,
  percentage,
  statValue
) {
  return (
    '<div class="' +
    itemClass +
    '">' +
    '<span class="stat-name">' +
    statName +
    "</span>" +
    '<div class="stat-bar">' +
    '<div class="stat-fill ' +
    cssClass +
    '" style="width: ' +
    percentage +
    '%"></div>' +
    "</div>" +
    '<span class="stat-value">' +
    statValue +
    "</span>" +
    "</div>"
  );
}

// Template for Pokemon abilities section
function createAbilitiesTemplate(abilities) {
  let abilitiesHTML = "";
  for (let i = 0; i < abilities.length; i++) {
    abilitiesHTML += '<span class="ability-badge">' + abilities[i] + "</span>";
  }

  return (
    '<div class="abilities-section">' +
    "<h4>Abilities</h4>" +
    '<div class="abilities">' +
    abilitiesHTML +
    "</div>" +
    "</div>"
  );
}

// Template for Show More button
function createShowMoreButtonTemplate() {
  return (
    '<button id="show-more-btn" class="btn btn-primary btn-lg" onclick="showMorePokemon()">' +
    "Show More" +
    "</button>"
  );
}

// Template for Show Less button
function createShowLessButtonTemplate() {
  return '<button id="show-less-btn" class="btn btn-outline-secondary btn-lg" onclick="showLessPokemon()">Show Less</button>';
}

// Template for main container structure
function createMainContainerTemplate() {
  return (
    '<div id="main-container" class="container py-4">' +
    createPageHeaderTemplate() +
    createPokemonGridTemplate() +
    '<div id="pagination-container" class="text-center mt-4" style="display: none;"></div>' +
    "</div>"
  );
}
