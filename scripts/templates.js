function getCardTemplate(pokemon, i) {
    const primary = pokemon.types[0];
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
