// Pokemon HTML Template Functions

// Template for creating a loading message
function createLoadingTemplate() {
    return '<div id="loading-message" class="text-center p-4">' +
           '<div class="spinner-border text-primary" role="status">' +
           '<span class="visually-hidden">Loading...</span>' +
           '</div>' +
           '<p class="mt-2">Loading Pokemon...</p>' +
           '</div>';
}

// Template for creating an error message
function createErrorTemplate(message) {
    return '<div class="alert alert-danger text-center" role="alert">' +
           '<strong>Error:</strong> ' + message +
           '</div>';
}

// Template for creating Pokemon card grid container
function createPokemonGridTemplate() {
    return '<div id="pokemon-grid">' +
           '</div>';
}

// Template for creating Pokemon card HTML
function createPokemonCardHTML(pokemon) {
  let typeClasses = pokemon.types.map(type => type.toLowerCase()).join(' ');
  let pokemonId = pokemon.id.toString().padStart(3, '0');
  
  let typeBadges = '';
  for (let i = 0; i < pokemon.types.length; i++) {
    typeBadges += '<span class="type-badge ' + pokemon.types[i].toLowerCase() + '">' +
                  '<span class="type-icon ' + pokemon.types[i].toLowerCase() + '"></span>' +
                  pokemon.types[i] + '</span>';
  }
  
  return '<div class="pokemon-card ' + typeClasses + '" data-pokemon-id="' + pokemon.id + '" onclick="openModal(' + pokemon.id + ')">' +
         '<div class="pokemon-card-content">' +
         '<div class="pokemon-image-container">' +
         '<img src="' + pokemon.image + '" alt="' + pokemon.name + '" class="pokemon-image">' +
         '</div>' +
         '<div class="pokemon-info">' +
         '<h3 class="pokemon-name">' + pokemon.name + '</h3>' +
         '<span class="pokemon-id">#' + pokemonId + '</span>' +
         '<div class="pokemon-types">' + typeBadges + '</div>' +
         '</div>' +
         '</div>' +
         '</div>';
}

// Template for page header with loading message
function createPageHeaderTemplate() {
  return '<div class="text-center mb-4">' +
         '<h1 class="display-4 mb-3">Pokedex</h1>' +
         '<p class="lead text-muted">Loading Pokemon...</p>' +
         '</div>';
}

// Template for modal overlay structure
function createModalOverlayTemplate() {
  return '<div id="pokemon-modal" class="pokemon-modal" onclick="closeModal()">' +
         '<div class="modal-content" onclick="event.stopPropagation()">' +
         '<div class="modal-close" onclick="closeModal()">&times;</div>' +
         '<div class="pokemon-card-detailed">' +
         '<div class="card-inner" id="modal-card-inner">' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>';
}

// Template for modal front side with Pokemon details
function createModalFrontSideTemplate(pokemon) {
  let pokemonId = pokemon.id.toString().padStart(3, '0');
  let typeBadges = '';
  for (let i = 0; i < pokemon.types.length; i++) {
    typeBadges += '<span class="type-badge ' + pokemon.types[i].toLowerCase() + '">' +
                  '<span class="type-icon ' + pokemon.types[i].toLowerCase() + '"></span>' +
                  pokemon.types[i] + '</span>';
  }
  
  return '<div class="card-front ' + pokemon.types[0].toLowerCase() + '">' +
         '<div class="detailed-image-container">' +
         '<img id="modal-pokemon-image" src="' + pokemon.image + '" alt="' + pokemon.name + '" class="detailed-pokemon-image">' +
         '</div>' +
         '<div class="detailed-info">' +
         '<h2 id="modal-pokemon-name">' + pokemon.name + '</h2>' +
         '<span id="modal-pokemon-id">#' + pokemonId + '</span>' +
         '<div id="modal-pokemon-types" class="pokemon-types">' + typeBadges + '</div>' +
         '<p id="modal-pokemon-description" class="pokemon-description">' + pokemon.description + '</p>' +
         createPokemonDetailsTemplate(pokemon) +
         '<button class="flip-button" onclick="flipCard()">View Stats</button>' +
         '</div>' +
         '</div>';
}

// Template for Pokemon details section
function createPokemonDetailsTemplate(pokemon) {
  return '<div class="pokemon-details">' +
         '<div class="detail-item">' +
         '<span class="detail-label">Height:</span>' +
         '<span id="modal-pokemon-height">' + pokemon.height + '</span>' +
         '</div>' +
         '<div class="detail-item">' +
         '<span class="detail-label">Weight:</span>' +
         '<span id="modal-pokemon-weight">' + pokemon.weight + '</span>' +
         '</div>' +
         '<div class="detail-item">' +
         '<span class="detail-label">Generation:</span>' +
         '<span id="modal-pokemon-generation">' + pokemon.generation + '</span>' +
         '</div>' +
         '</div>';
}

// Template for modal back side with Pokemon stats
function createModalBackSideTemplate(pokemon) {
  return '<div class="card-back">' +
         '<div class="stats-container">' +
         '<h3>Base Stats</h3>' +
         createAllStatsTemplate(pokemon.stats) +
         createAbilitiesTemplate(pokemon.abilities) +
         '<button class="flip-button back" onclick="flipCardBack()">Back to Info</button>' +
         '</div>' +
         '</div>';
}

// Template for all Pokemon stats including total
function createAllStatsTemplate(stats) {
  let total = stats.hp + stats.attack + stats.defense + stats.specialAttack + stats.specialDefense + stats.speed;
  return createStatItemTemplate('HP', stats.hp) +
         createStatItemTemplate('Attack', stats.attack) +
         createStatItemTemplate('Defense', stats.defense) +
         createStatItemTemplate('Sp. Att', stats.specialAttack) +
         createStatItemTemplate('Sp. Def', stats.specialDefense) +
         createStatItemTemplate('Speed', stats.speed) +
         createStatItemTemplate('Total', total, 'total-stats');
}

// Template for individual stat item
function createStatItemTemplate(statName, statValue, extraClass) {
  let maxValue = statName === 'Total' ? 800 : 150;
  let percentage = Math.min((statValue / maxValue) * 100, 100);
  let cssClass = statName.toLowerCase().replace('.', '').replace(' ', '-');
  let itemClass = extraClass ? 'stat-item ' + extraClass : 'stat-item';
  
  return '<div class="' + itemClass + '">' +
         '<span class="stat-name">' + statName + '</span>' +
         '<div class="stat-bar">' +
         '<div class="stat-fill ' + cssClass + '" style="width: ' + percentage + '%"></div>' +
         '</div>' +
         '<span class="stat-value">' + statValue + '</span>' +
         '</div>';
}

// Template for Pokemon abilities section
function createAbilitiesTemplate(abilities) {
  let abilitiesHTML = '';
  for (let i = 0; i < abilities.length; i++) {
    abilitiesHTML += '<span class="ability-badge">' + abilities[i] + '</span>';
  }
  
  return '<div class="abilities-section">' +
         '<h4>Abilities</h4>' +
         '<div class="abilities">' + abilitiesHTML + '</div>' +
         '</div>';
}