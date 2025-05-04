function getCardTemplate(pokemon, i) {
    primary = pokemon.types[0];  // hier kommt der erste Typ rein
    const typesHTML = pokemon.types
    .map(t => 
        `<span class="type ${t}" style="background-color: ${typeColors[t]}">
            <img src="${getTypeIcon(t)}" alt="${t}" />
            ${t}
        </span>`)
    .join("  ");
    
    return` 
        <div class="card">
            <div class="card-header" onclick="openOverlay(${i})">
                <span class="number">${String(pokemon.id).padStart(4, '0')}</span>
                <span class="name">${pokemon.name}</span>
            </div>

            <div class="img-container" style="background-color: ${typeColors[primary]}">
                <img class="card-img" src="${pokemon.img}" alt="picture ${i +1}"  onclick="openOverlay(${i})">
            </div>
            <div class="types">
                ${typesHTML}
            </div>
        </div>`
}

function getOverlayCardTemplate(pokemon) {
    
    const primaryback = pokemon.types[0]; // Lokale Bestimmung des Haupttyps
    
    return `
    <div class="overlay-header">
        <button id="prevBtn" class="nav-btn" onclick="showPrevImage()">
            <img src="./assets/icons/left-arrow-v1.png" alt="previous icon">
        </button>
        <div id="overlayIdName" class="overlay-id-name"></div>
        <button id="nextBtn" class="nav-btn" onclick="showNextImage()">
            <img src="./assets/icons/right-arrow-v1.png" alt="next icon">
        </button>
    </div>

    <div class="overlay-img-container" style="background-color: ${typeColors[primaryback]}">
        <img id="overlayImage" class="overlay-image" src="" alt="enlarged image">
    </div>
    <div class="overlay-info">
        <div id="overlayTypes" class="types"></div>
    </div>

    <nav class="navbar">
        <ul class="nav-tabs">
        <li class="nav-tab active" onclick="setActiveTab(this,'nav-main')">main</li>
        <li class="nav-tab" onclick="setActiveTab(this, 'nav-stats')">stats</li>
        <li class="nav-tab" onclick="setActiveTab(this, 'nav-evo-chain')">evo chain</li>
        </ul>
    </nav>  

    <div class="nav-body" id="nav-main">              
            <table class="info-table">
            <tr>
                <td>HEIGHT:</td>
                <td id="overlayHeight"></td>
            </tr>
            <tr>
                <td>WEIGHT:</td>
                <td id="overlayWeight"></td>
            </tr>
            <tr>
                <td>BASE EXPERIENCE:</td>
                <td id="overlayBaseXP"></td>
            </tr>
            <tr>
                <td>ABILITIES:</td>
                <td id="overlayAbilities"></td>
            </tr>
            </table>
    </div>

    <div class="nav-body" id="nav-stats" style="display: none;">
        <div id="overlayStats" class="stats-container"></div>
    </div>

    <div class="nav-body" id="nav-evo-chain" style="display: none;">

    </div>`
}