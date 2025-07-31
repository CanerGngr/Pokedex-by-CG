// Pokemon Card Modal and Flip Functions

// Global variables
let pokemonData = [];
let currentPokemon = null;

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadPokemonList();
});

// Fetch Pokemon from PokeAPI
async function loadPokemonList() {
  try {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    let data = await response.json();
    
    // Clear existing static content and show loading  
    let container = document.querySelector('.container.py-4');
    if (!container) {
      container = document.querySelector('.container');
    }
    container.innerHTML = createPageHeaderTemplate() + createPokemonGridTemplate();
    
    // Fetch detailed data for each Pokemon
    for (let i = 0; i < data.results.length; i++) {
      let pokemon = data.results[i];
      let pokemonDetails = await fetchPokemonDetails(pokemon.url);
      pokemonData.push(pokemonDetails);
      addPokemonCard(pokemonDetails);
    }
    
    // Update loading message once all Pokemon are loaded
    let leadElements = document.getElementsByClassName('lead');
    if (leadElements.length > 0) {
      leadElements[0].textContent = 'Click on any Pokemon to see details!';
    }
  } catch (error) {
    console.error('Error loading Pokemon:', error);
    let container = document.querySelector('.container.py-4');
    if (!container) {
      container = document.querySelector('.container');
    }
    container.innerHTML = createErrorTemplate('Failed to load Pokemon data. Please try again later.');
  }
}

// Fetch detailed Pokemon data
async function fetchPokemonDetails(url) {
  try {
    let response = await fetch(url);
    let pokemon = await response.json();
    
    // Get species data for description
    let speciesResponse = await fetch(pokemon.species.url);
    let speciesData = await speciesResponse.json();
    
    // Find English description
    let description = 'No description available';
    for (let i = 0; i < speciesData.flavor_text_entries.length; i++) {
      let entry = speciesData.flavor_text_entries[i];
      if (entry.language.name === 'en') {
        description = entry.flavor_text.replace(/\f/g, ' ');
        break;
      }
    }
    
    return {
      id: pokemon.id,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
      types: pokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)),
      height: (pokemon.height / 10) + ' m',
      weight: (pokemon.weight / 10) + ' kg',
      description: description,
      generation: getGeneration(pokemon.id),
      stats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat
      },
      abilities: pokemon.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1))
    };
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    return null;
  }
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
  cardContainer.innerHTML = cardHTML;
  
  grid.appendChild(cardContainer);
}


// Close modal with Escape key
document.onkeydown = function(event) {
  let pokemonModal = document.getElementById("pokemon-modal");
  if (event.key === "Escape" && pokemonModal.style.display === "block") {
    closeModal();
  }
};

// Open Modal Function
function openModal(pokemonId) {
  // Find Pokemon by ID
  let pokemon = pokemonData.find(p => p.id === pokemonId);
  if (!pokemon) return;
  
  currentPokemon = pokemon;
  updateModalContent(pokemon);
  
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


// Function to Update Modal Content
function updateModalContent(pokemon) {
  document.getElementById("modal-pokemon-image").src = pokemon.image;
  document.getElementById("modal-pokemon-image").alt = pokemon.name;
  document.getElementById("modal-pokemon-name").textContent = pokemon.name;

  // Format Pokemon ID
  let pokemonId = pokemon.id.toString();
  while (pokemonId.length < 3) {
    pokemonId = "0" + pokemonId;
  }
  document.getElementById("modal-pokemon-id").textContent = "#" + pokemonId;

  // Update Pokemon types
  let modalTypes = document.getElementById("modal-pokemon-types");
  let typesHTML = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    typesHTML +=
      '<span class="type-badge ' +
      pokemon.types[i].toLowerCase() +
      '">' +
      pokemon.types[i] +
      "</span>";
  }
  modalTypes.innerHTML = typesHTML;

  document.getElementById("modal-pokemon-description").textContent =
    pokemon.description;
  document.getElementById("modal-pokemon-height").textContent = pokemon.height;
  document.getElementById("modal-pokemon-weight").textContent = pokemon.weight;
  document.getElementById("modal-pokemon-generation").textContent =
    pokemon.generation;

  // Update stats
  let statBars = document.getElementsByClassName("stat-fill");
  let statValues = document.getElementsByClassName("stat-value");

  let hpPercent = (pokemon.stats.hp / 150) * 100;
  statBars[0].style.width = hpPercent + "%";
  statValues[0].textContent = pokemon.stats.hp;

  let attackPercent = (pokemon.stats.attack / 150) * 100;
  statBars[1].style.width = attackPercent + "%";
  statValues[1].textContent = pokemon.stats.attack;

  let defensePercent = (pokemon.stats.defense / 150) * 100;
  statBars[2].style.width = defensePercent + "%";
  statValues[2].textContent = pokemon.stats.defense;

  let speedPercent = (pokemon.stats.speed / 150) * 100;
  statBars[3].style.width = speedPercent + "%";
  statValues[3].textContent = pokemon.stats.speed;

  // Update abilities
  let abilitiesContainers = document.getElementsByClassName("abilities");
  let abilitiesContainer = abilitiesContainers[0];
  let abilitiesHTML = "";
  for (let i = 0; i < pokemon.abilities.length; i++) {
    abilitiesHTML +=
      '<span class="ability-badge">' + pokemon.abilities[i] + "</span>";
  }
  abilitiesContainer.innerHTML = abilitiesHTML;

  // Adapt modal background to Pokemon type
  let cardFrontElements = document.getElementsByClassName("card-front");
  let cardFront = cardFrontElements[0];
  let primaryType = pokemon.types[0].toLowerCase();
  cardFront.className = "card-front " + primaryType;
}
