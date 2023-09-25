const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
let currentOpenPokemon = null;

function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="details">
                <div>
                    <p><b>Weight</b> ${pokemon.weight}</p>
                    <p><b>Height</b> ${pokemon.height}</p>
                </div>
                <div>
                    <p><b>Abilities</b></p>
                    <ul class="abilities">
                        ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                    </ul>
                </div>
                ${pokemon.heldItems.length ?
                    `<div>
                        <p><b>Held Items</b></p>
                        <ul class="abilities">
                            ${pokemon.heldItems.map((heldItem) => `<li class="ability">${heldItem}</li>`).join('')}
                        </ul>
                    </div>`
                : ''}
            </div>
        </li>
    `
}


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('');
      pokemonList.innerHTML += newHtml;
      
      addClickListeners();
    });
  }
  
  function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('');
      pokemonList.innerHTML += newHtml;
      
      addClickListeners();
    });
  }
  
  function addClickListeners() {
    const pokemonElements = document.querySelectorAll('.pokemon');
    pokemonElements.forEach(function (element) {
      element.addEventListener('click', function () {
        if (currentOpenPokemon) {
          currentOpenPokemon.classList.remove('open');
        }
        
        this.classList.add('open');
        
        currentOpenPokemon = this;
      });
    });
  }
  
  loadPokemonItems(offset, limit);
  addClickListeners();
  
  loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;
  
    if (qtdRecordsWithNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItems(offset, newLimit);
      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      loadPokemonItems(offset, limit);
    }
  });
  
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes) {
        addClickListeners();
      }
    });
  });
  
  observer.observe(pokemonList, { childList: true });