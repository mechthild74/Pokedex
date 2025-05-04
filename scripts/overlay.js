let currentIndex = 0; 

function openOverlay(index) {
    // current index wird korrekt erkannt
    currentIndex = index;
    // renderOverlay(pokemonList[index]);
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
    currentIndex = (currentIndex + 1) % pokemonList.length;
    updateOverlay(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + pokemonList.length) % pokemonList.length;
    updateOverlay(currentIndex);
}

    function setActiveTab(clickedTab, contentId) {
        // Alle Tabs deaktivieren
        const allTabs = document.querySelectorAll('.nav-tab');
        allTabs.forEach(tab => tab.classList.remove('active'));
    
        // Aktuellen Tab aktivieren
        clickedTab.classList.add('active');
    
        // Alle Content-Bereiche verstecken
        const allContents = document.querySelectorAll('.nav-body');
        allContents.forEach(content => {
          content.style.display = 'none';
        });
    
        // Nur den passenden anzeigen
        const activeContent = document.getElementById(contentId);
        if (activeContent) {
          activeContent.style.display = 'block';
        }
      }
  
