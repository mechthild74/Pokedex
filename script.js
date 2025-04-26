const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let pokemonList = [];
let offset = 0;
let limit = 20;
let currentPokemon = 0;
let allLoaded = false;
let totalCount = null;
const searchInput = document.getElementById("search-input");

function init() {
    loadPokemonData();
    console.log(pokemonList);
}

function renderCards(list) {
    let contentRef = document.getElementById("card-container");
    contentRef.innerHTML = "";
    list.forEach((pokemon, i) => {
        contentRef.innerHTML += getCardTemplate(pokemon, i);
    });
}

function getTypeIcon(tname) {
    return `./assets/svgTypes/${tname}.svg`;
}

async function loadPokemonData() {
    if (allLoaded) return; 

    const listRes = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
    const listData = await listRes.json();  
    totalCount = listData.count; 
    
    for (const item of listData.results) {
        const detailRes = await fetch(item.url);
        const detail  = await detailRes.json();
        pokemonList.push({
            id:   detail.id,
            name: detail.name,
            img:  detail.sprites.other['official-artwork'].front_default,
            types: detail.types.map(t => t.type.name)
        });
    }

    offset += limit;
    if (offset >= totalCount) allLoaded = true;
    renderCards(pokemonList);
}

function renderPokemons(list) {
    let contentRef = document.getElementById("card-container");
    contentRef.innerHTML = "";
    const query = searchInput.value.toLowerCase().trim();
    const filtered = query.length >= 3 ? list.filter(p => detail.name.startsWith(query)) : list;
    filtered.forEach(pokemon => {
        contentRef.innerHTML += getCardTemplate(pokemon);
    });
}

//   searchInput.addEventListener('input', () => renderPokemons(pokemonList));

