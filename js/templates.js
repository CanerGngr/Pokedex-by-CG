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
    typeBadges += '<span class="type-badge ' + pokemon.types[i].toLowerCase() + '">' + pokemon.types[i] + '</span>';
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