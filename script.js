const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let pokemonList = [];
let offset = 0;
let limit = 20;
let currentPokemon = 0;
let allLoaded = false;
let totalCount = null;
const searchInput = document.getElementById("search-input");

let primary = "";  // klären ob diese Variable hier gebraucht wird

let searchTimeout = null;
const DEBOUNCE_DELAY = 300; // ms

function init() {
    loadPokemonData();
    console.log(pokemonList);  //Achtung abschließend entfernen
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

function inputSearch(value) {
    const input = value.toLowerCase().trim();

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (input.length >= 3) {
        searchPokemon(input);
        } else {
            init();
        }
    }, DEBOUNCE_DELAY);
  }

  function loadMore() {
    loadPokemonData();
    if (allLoaded) {
        const loadMoreBtn = document.getElementById("load-more-btn");
        loadMoreBtn.style.display = "none";
    }
  }