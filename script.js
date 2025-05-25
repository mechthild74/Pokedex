const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonList = [];
let offset = 0;
let limit = 20;
let currentPokemon = 0;
let allLoaded = false;
let totalCount = null;
const searchInput = document.getElementById("search-input");
let searchMode        = false; 
let searchMatches     = [];   
let searchOffset      = 0;     
let searchTimeout = null;
const DEBOUNCE_DELAY = 300;
const spinConainer = document.getElementById('spinner-container');

function init() {
    pokemonList = [];
    offset = 0;
    allLoaded = false;
    loadPokemonData();
    checkAllLoaded();
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

function checkAllLoaded() {
    if (allLoaded) {
        const loadMoreBtn = document.getElementById("btn-more");
        loadMoreBtn.style.display = "none";
    } else {
        const loadMoreBtn = document.getElementById("btn-more");
        loadMoreBtn.style.display = "block";
    }
}   

function showLoadingSpinner() {
   document.getElementById("spinner-overlay").classList.remove("d-none");
}

function disableLoadingSpinner() {
    document.getElementById("spinner-overlay").classList.add("d-none");
}

