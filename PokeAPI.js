document.addEventListener('DOMContentLoaded', function() {
    // Async function to fetch Pokémon data by name or ID
    async function fetchPokemonData(pokemon) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Pokémon not found: ${response.statusText}`);
            }
            const data = await response.json();
            updatePokemonDetails(data);
        } catch (error) {
            console.error('Fetch error:', error);
            displayErrorMessage('Pokémon not found');
        }
    }

    // Function to update the Pokémon details on the page
    function updatePokemonDetails(data) {
        const detailsContainer = document.getElementById('pokemon-details');
        detailsContainer.innerHTML = '';

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = data.name;
        pokemonName.classList.add('text-center', 'text-capitalize');

        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.classList.add('img-fluid', 'mx-auto', 'd-block');

        const pokemonStats = document.createElement('p');
        pokemonStats.innerHTML = `
            HP: ${data.stats[0].base_stat}<br>
            Attack: ${data.stats[1].base_stat}<br>
            Speed: ${data.stats[5].base_stat}
        `;

        detailsContainer.appendChild(pokemonName);
        detailsContainer.appendChild(pokemonImage);
        detailsContainer.appendChild(pokemonStats);
    }

    // Function to display error message
    function displayErrorMessage(message) {
        const detailsContainer = document.getElementById('pokemon-details');
        detailsContainer.innerHTML = `<p class="text-danger">${message}</p>`;
    }

    // Event listener for the search form submission
    document.getElementById('pokemon-search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const pokemonInput = document.getElementById('pokemon-search-input').value;
        if (pokemonInput) {
            fetchPokemonData(pokemonInput);
        }
    });
});
