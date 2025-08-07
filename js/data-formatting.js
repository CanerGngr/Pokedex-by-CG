// Pokemon Data Formatting Functions

// Extract English description from species data
function extractEnglishDescription(speciesData) {
  let description = "No description available";
  for (let i = 0; i < speciesData.flavor_text_entries.length; i++) {
    let entry = speciesData.flavor_text_entries[i];
    if (entry.language.name === "en") {
      description = entry.flavor_text.replace(/\f/g, " ");
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
    abilities: formatPokemonAbilities(pokemon.abilities),
  };
}

// Format Pokemon name with proper capitalization
function formatPokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Get best available Pokemon image
function getPokemonImage(sprites) {
  return (
    sprites.other["official-artwork"].front_default || sprites.front_default
  );
}

// Format Pokemon types with proper capitalization
function formatPokemonTypes(types) {
  let formattedTypes = [];
  for (let i = 0; i < types.length; i++) {
    let formattedType =
      types[i].type.name.charAt(0).toUpperCase() + types[i].type.name.slice(1);
    formattedTypes.push(formattedType);
  }
  return formattedTypes;
}

// Format height in meters
function formatHeight(height) {
  return height / 10 + " m";
}

// Format weight in kilograms
function formatWeight(weight) {
  return weight / 10 + " kg";
}

// Format Pokemon stats object
function formatPokemonStats(stats) {
  return {
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    specialAttack: stats[3].base_stat,
    specialDefense: stats[4].base_stat,
    speed: stats[5].base_stat,
  };
}

// Format Pokemon abilities with proper capitalization
function formatPokemonAbilities(abilities) {
  let formattedAbilities = [];
  for (let i = 0; i < abilities.length; i++) {
    let formattedAbility =
      abilities[i].ability.name.charAt(0).toUpperCase() +
      abilities[i].ability.name.slice(1);
    formattedAbilities.push(formattedAbility);
  }
  return formattedAbilities;
}

// Get generation based on Pokemon ID
function getGeneration(id) {
  if (id <= 151) return "I";
  if (id <= 251) return "II";
  if (id <= 386) return "III";
  if (id <= 493) return "IV";
  if (id <= 649) return "V";
  if (id <= 721) return "VI";
  if (id <= 809) return "VII";
  if (id <= 898) return "VIII";
  return "IX";
}