let currentIndex = 0; 

function openOverlay(index) {
    // current index wird korrekt erkannt
    currentIndex = index;
    updateOverlay(currentIndex);
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    document.body.style.overflow = '';
}

function updateOverlay(index){
    let overlayImage = document.getElementById('overlayImage');
      let overlayIdName = document.getElementById('overlayIdName');
      let overlayTypesEl = document.getElementById('overlayTypes');
      let selectedPokemon = pokemonList[index];
      let id4 = String(selectedPokemon.id).padStart(4,'0');

      overlayImage.src = selectedPokemon.img;
      overlayIdName.textContent = `#${id4} ${(selectedPokemon.name)}`;
      overlayTypesEl.innerHTML = selectedPokemon.types.map(t =>
        `<img src="${getTypeIcon(t)}" alt="${t}" title="${(t)}" style="background:${typeColors[t]}; padding:4px; border-radius:50%;"/>`
      ).join('');
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % imgs.length;
    updateOverlay(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    updateOverlay(currentIndex);
}
