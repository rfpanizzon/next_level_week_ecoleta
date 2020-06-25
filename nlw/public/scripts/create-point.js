/*fetch vai buscar alguma coisa */
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") /*vai retornar o campo select com o name uf*/

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => { return res.json() }) /*entra no site json e retorna em res o resultado*/
    .then( states => {

        for(const state of states) { /*faz um for que percorre todos os estados do json*/
            /* fica sobrescrevendo concatenando pra mostrar todos na lista do select */
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value /**retorna o valor id do estado*/

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    /**se o usuario faz uma nova consulta isto é para limpar os campos */
    citySelect.innerHTML = "<option value>Selecione a Cidade</option"
    citySelect.disabled = true

    fetch(url)
    .then( res => { return res.json() }) 
    .then( cities => {
        for(const city of cities) { 
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) /**não passa a func com os "()" pra não executar imediatament
                                                só vai executar quando entrar em addEventListener */
    /*vai ficar ouvindo o evento de mudança do select*/
    /**toda vez que sinaliza a mudança libera as cidades */

// ITENS DE COLETA
const itemsToCollect = document.querySelectorAll(".items-grid li") /*coleta todos os items*/

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

//array pra salvar os items
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add or remove a class with JS
    itemLi.classList.toggle("selected") //toggle ele adiciona ou remove

    const itemId = event.target.dataset.id

    /*verificar se existem itens selecionados, se sim
      pegar os itens selecionados*/
    const alreadySelected = selectedItems.findIndex( item => { //vai passar todos os dados do vetor
        const itemFound = item == itemId //compara o item com num selecionado ? true or false
        return itemFound
    }) 

    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) { //quando o item não tá cliclado é -1 se cliclado vai pra 0 
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //se não estiver selecionado adicionar a seleção
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems    
}
