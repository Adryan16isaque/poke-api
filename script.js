const input = document.querySelector("#nomePokemon");
const resultado = document.querySelector("#resultado");
const img = document.querySelector("#imgPokemon");
function vazio() { img.src = ' '; img.style.height = "0px";}

const btnBuscarHabilidade = document.querySelector("#btnBuscarHabilidade");
const btnBuscarPeso = document.querySelector('#btnBuscarPeso');
const btnBuscarAltura = document.querySelector('#btnBuscarAltura')
const btnBuscarImg = document.querySelector('#btnBuscarImg')
const btnTipo = document.querySelector('#btnTipo')

btnBuscarHabilidade.addEventListener("click", () => buscarPokemon("habilidade"));
btnBuscarPeso.addEventListener("click", () => buscarPokemon("peso"));
btnBuscarAltura.addEventListener("click", () => buscarPokemon("altura"))
btnBuscarImg.addEventListener('click', () => buscarPokemon("img"))
btnTipo.addEventListener('click', () => buscarPokemon("tipo"))

// Função principal
function buscarPokemon(validacao) {
    console.log(validacao)
    const nome = input.value.toLowerCase().trim();
    if (nome === "") {
        resultado.innerHTML = "Digite um nome válido!";
        return;
    }
    if (validacao == "habilidade") {
        buscarHabilidade(nome);
        vazio()
    }
    if (validacao == "peso") {
        buscarPeso(nome);
        vazio()
    }

    if (validacao == "altura") {
        buscarAltura(nome);
        vazio()
    }
    if (validacao == "img") {
        buscarImagem(nome);
        resultado.innerHTML =" "
         resultado.innerHTML=`<h2>${nome.toUpperCase()}</h2>`
    }
    if (validacao == "tipo") {
        buscarTipo(nome);
        vazio()
    }
}


// Busca habilidades do Pokemon
function buscarHabilidade(nome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resposta => resposta.json())
        .then(dados => {
            const habilidade = dados.abilities[0].ability.name;

            exibirPokemon(nome, habilidade);
        })
        .catch(() => {
            resultado.innerHTML = "Pokémon não encontrado!";
        });
}

function buscarPeso(nome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resposta => resposta.json())
        .then(dados => {
            
            const peso = dados.weight;
            exibirPokemon(nome, peso);
        })
        .catch(() => {
            resultado.innerHTML = "Pokémon não encontrado!";
        });
}
function buscarAltura(nome) {
    console.log("altura")
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resposta => resposta.json())
        .then(dados => {
            const altura = dados.height;

            exibirPokemon(nome, altura)
        })
        .catch(() => {
            resultado.innerHTML = "Pokémon não encontrado!";
        });
}

function buscarImagem(nome) {
    console.log("img")
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resposta => resposta.json())
        .then(dados => {
            const imagemAPI = dados.sprites.front_shiny;
            img.src = imagemAPI
            img.style.height = "300px"

        })
        .catch(() => {
            resultado.innerHTML = "Pokémon não encontrado!";
        });
}

function buscarTipo(nome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resposta => resposta.json())
        .then(dados => {
            const tipoPok = dados.types[0].type.name
            exibirPokemon(nome, tipoPok)
        })
        .catch(() => {
            resultado.innerHTML = "Pokémon não encontrado!";
        });
}


// Exibe na tela
function exibirPokemon(nome, busca) {
    resultado.innerHTML = `
        <h2>${nome.toUpperCase()}</h2>
        <p><strong>Busca:</strong> ${busca}</p>
    `;
}