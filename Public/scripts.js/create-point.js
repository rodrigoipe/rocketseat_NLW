function populateUFs() { 
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() ) // função anomina que retrona um valor
    .then( states => {

        for ( const state of states ) {
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options [indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value>Selecione a Cidade</option>" //Vai limpar e reescrever o conteudo interno, a cidade quando o estado for trocado. conteudo esta vazio
    citySelect.disabled = false //Bloquear a guia de cidade ao trocar o estado

    fetch(url)
    .then(res => res.json() ) 
    .then( cities => {
        for ( const city of cities ) {
            citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false //Desbloqueia a tela de cidade quando escolhe o estado
    } )
}



document
    .querySelector("select[name=uf]")// siginificado = procure o select que tem o nome uf
    .addEventListener("change", getCities)

    // Items de Coleta
    // pegar todos os li´s
    const itensToCollect = document.querySelectorAll(".items-grid li") // todos os li´s que forem encontrados volova dentro do intensToCollect
    for (const item of itensToCollect) { // Tradução= Para cada um deles, faça
        item.addEventListener("click", handleSelectedItem) //Adicionar um ouvidor de enventos, que sera o "click", com uma função (handleSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=items]")


    let selectedItems = [] // quais os itens selecionados, 

    function handleSelectedItem(event) { // toda vez que o evento "addEventListener" ele passara para a função "(event)"
    const itemLi = event.target
    
    // Adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected") // toggle tem a função de "adicionar ou remover", ao clicar ele selecionara a ou as imagens, ou retira a seleção ao clicar
    
    const itemId = itemLi.dataset.id
    
    //console.log(`ITEM ID:`, itemId)
   
    // Varificar se existem itens selecionados, se sim
    // pegar os itens itens selecionados
    const alreadySelected = selectedItems.findIndex( item => { // variavel com nome de "ja foi selecionado"
    const itemFound = item == itemId // Isso sera true ou falso
    return itemFound
    }) 
    // se ja estiver selecionado 
    if( alreadySelected >= 0 ) {
        //tirar da seleção 
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems 
    } else {
        // se nao esiver selecionado       
        //adicionar a seleção.  
        selectedItems.push(itemId)
    }
    
    //console.log(`selectedItems:`, selectedItems)
    // Atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems 

    }