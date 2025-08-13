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

function formatPokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getPokemonImage(sprites) {
  return (
    sprites.other["official-artwork"].front_default || sprites.front_default
  );
}

function formatPokemonTypes(types) {
  let formattedTypes = [];
  for (let i = 0; i < types.length; i++) {
    let formattedType =
      types[i].type.name.charAt(0).toUpperCase() + types[i].type.name.slice(1);
    formattedTypes.push(formattedType);
  }
  return formattedTypes;
}

function formatHeight(height) {
  return height / 10 + " m";
}

function formatWeight(weight) {
  return weight / 10 + " kg";
}

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

function createAllStatsTemplate(stats) {
  let total = calculateStatsTotal(stats);
  return (
    createBasicStatsTemplate(stats) +
    createStatItemTemplate("Total", total, "total-stats")
  );
}

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
