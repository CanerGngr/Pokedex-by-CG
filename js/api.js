// Pokemon API Functions

// Fetch Pokemon from PokeAPI
async function loadPokemonList() {
  try {
    initializePage();
    console.log(currentOffset);

    let pokemonList = await fetchPokemonDataToList(currentOffset);
    await loadAllPokemonDetails(pokemonList);
    isLoading = false;
    hideLoadingScreen();
    finalizePokemonLoading();
  } catch (error) {
    handleLoadingError(error);
  }
}

async function fetchPokemonDataToList(currentOffset) {
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`
  );
  let data = await response.json();
  totalPokemonCount = data.count;
  updateCurrentOffset();
  return data.results;
}

// Um Details parallel (schneller) zu laden. Von KI :)
async function loadAllPokemonDetails(pokemonList) {
  const detailPromises = createDetailPromises(pokemonList);
  const detailsList = await Promise.all(detailPromises);
  processLoadedDetails(detailsList);
}

// Create array of detail fetch promises
function createDetailPromises(pokemonList) {
  const detailPromises = [];
  for (let i = 0; i < pokemonList.length; i++) {
    detailPromises.push(fetchPokemonDetails(pokemonList[i].url));
  }
  return detailPromises;
}

// Process and display loaded Pokemon details
function processLoadedDetails(detailsList) {
  detailsList.sort((a, b) => a.id - b.id);

  for (const details of detailsList) {
    pokemonData.push(details);
    addPokemonCard(details);
  }
}

async function loadMoreData() {
  const pokemonList = await fetchPokemonDataToList(currentOffset);
  const detailPromises = [];
  for (let i = 0; i < pokemonList.length; i++) {
    detailPromises.push(fetchPokemonDetails(pokemonList[i].url));
  }
  const detailsList = await Promise.all(detailPromises);

  pokemonData.push(...detailsList);

  return detailsList;
}

async function addMorePokemonCard() {
  try {
    let scrollStartIndex = currentDisplayCount;
    const newPokemons = await loadMoreData();
    displayNewPokemonCards(newPokemons);
    currentDisplayCount += newPokemons.length;
    updateSearchResultsCount();
    scrollToNewCards(scrollStartIndex);
  } catch (error) {
    console.error("Error loading more Pokemon:", error);
  } finally {
    isLoading = false;
    hideLoadingScreen();
  }
}

// Display new Pokemon cards on the grid
function displayNewPokemonCards(newPokemons) {
  for (let i = 0; i < newPokemons.length; i++) {
    addPokemonCard(newPokemons[i]);
  }
}

// Fetch detailed Pokemon data
async function fetchPokemonDetails(url) {
  try {
    let pokemon = await fetchBasicPokemonData(url);
    let speciesData = await fetchPokemonSpecies(pokemon.species.url);
    let description = extractEnglishDescription(speciesData);
    return buildPokemonObject(pokemon, description);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    return null;
  }
}

// Fetch basic Pokemon data from API
async function fetchBasicPokemonData(url) {
  let response = await fetch(url);
  return await response.json();
}

// Fetch Pokemon species data for description
async function fetchPokemonSpecies(speciesUrl) {
  let response = await fetch(speciesUrl);
  return await response.json();
}
