async function loadPokemonData() {
  const listData = await fetchPokemonList(offset, limit);  
  
  if (allLoaded) return; 

  showLoadingSpinner();
  await fetchAndStoreDetails(listData.results);

  offset += limit;
  if (offset >= totalCount) allLoaded = true;
  
  disableLoadingSpinner(); 
  renderCards(pokemonList);
  checkAllLoaded(); 
}

async function fetchPokemonList(offset, limit) {
    const res = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    totalCount = data.count;
    return data;
}

async function fetchAndStoreDetails(results) {
    for (const item of results) {
        const detailRes = await fetch(item.url);
        const detail = await detailRes.json();
        pokemonList.push(formatPokemonData(detail));
    }
}

function formatPokemonData(detail) {
    return {
        id: detail.id,
        name: detail.name,
        img: detail.sprites.other['official-artwork'].front_default,
        types: detail.types.map(t => t.type.name),
    };
}
 
async function searchPokemon(query) {
    searchMode      = true;
    searchOffset    = 0;
    
    const listRes  = await fetch(`${BASE_URL}?offset=0&limit=100000`);
    const listData = await listRes.json();
  
    searchMatches = listData.results
      .filter(p => p.name.startsWith(query));
  
    pokemonList = [];
    renderCards(pokemonList);
  
    await loadSearchData();
}

async function loadSearchData() {
    const pageItems = searchMatches.slice(
      searchOffset,
      searchOffset + limit
    );
  
    for (const item of pageItems) {
      const detailRes = await fetch(item.url);
      const detail    = await detailRes.json();
      pokemonList.push(formatPokemonData(detail));
    }
  
    searchOffset += limit;
  
    if (searchOffset >= searchMatches.length) {
        allLoaded = true;
      } else {allLoaded = false;
    }
  
    renderCards(pokemonList);
    checkAllLoaded();
}

async function loadMore() {
    showLoadingSpinner();
    if (searchMode) {
        await loadSearchPage();
      } else {
        await loadPokemonData();
    }
    disableLoadingSpinner();
}

async function openOverlay(index) {
    await updateFullOverlay(index);  
    showOverlay();    
}

async function updateFullOverlay(index) {
    currentIndex = index;
    renderOverlayCard(index);           
    updateOverlayBasicInfo(index);      
    await loadPokemonDetails(index);    
}

async function loadPokemonDetails(index) {
    const id = pokemonList[index].id;
    const url = `${BASE_URL}${id}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      updateMainTab(data);
      updateStatsTab(data);
      updateEvoChainTab(data);
  
    } catch (error) {
      console.error("Fehler beim Laden der Pokémon-Details:", error);
    }
}

function updateMainTab(data) {
    document.getElementById('overlayHeight').textContent = (data.height / 10).toFixed(1) + ' m';
    document.getElementById('overlayWeight').textContent = (data.weight / 10).toFixed(1) + ' kg';
    document.getElementById('overlayBaseXP').textContent = data.base_experience;
    document.getElementById('overlayAbilities').textContent = data.abilities
      .map(a => a.ability.name)
      .join(', ');
}

function updateStatsTab(data) {
    
    let statsHtml = '';

    for (let i = 0; i < data.stats.length; i++) {
      const stat = data.stats[i];
      const value = stat.base_stat;
      const label = stat.stat.name.toUpperCase();
      const percent = Math.min(100, value);
    
      statsHtml += `
        <div class="stat">
          <div class="stat-name">${label}</div>
          <div class="stat-bar">
            <div class="stat-fill" style="width: ${percent}%"></div>
          </div>
        </div>`;
    }
    document.getElementById('overlayStats').innerHTML = statsHtml;
}

async function updateEvoChainTab(data) {
    const speciesUrl = data.species.url;
    const speciesData = await (await fetch(speciesUrl)).json();
  
    const evoUrl = speciesData.evolution_chain.url;
    const evoData = await (await fetch(evoUrl)).json();
  
    const names = getEvolutionNames(evoData.chain);
    const evoHtml = await buildEvoStages(names);
  
    document.getElementById("nav-evo-chain").innerHTML = `<div class="evo-chain">${evoHtml}</div>`;
}
  
function getEvolutionNames(chain) {
  const names = [chain.species.name];

  const stage2 = chain.evolves_to?.[0];
  if (stage2) {
    names.push(stage2.species.name);

    const stage3 = stage2.evolves_to?.[0];
    if (stage3) {
      names.push(stage3.species.name);
    }
  }
  return names;
}
  
  async function buildEvoStages(names) {
    const blocks = await Promise.all(names.map(async (name) => {
      let p = pokemonList.find(p => p.name === name);
      if (!p) {
        const res = await fetch(`${BASE_URL}${name}`);
        const data = await res.json();
        p = { name: data.name, img: data.sprites.other['official-artwork'].front_default };
      }
      return getEvoStageTemplate(p);
    }));
     return blocks.join('<span class="evo-arrow">»</span>');
}


  
  