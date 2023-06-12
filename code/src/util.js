export function encontrarEmpresaMaisBarataERapida(resultados, destino, peso) {

    /* variáveis e constantes  */
    destino = this.destino;
    peso = this.peso;
    let cidadeMaisPerto = []
    let arrCustos = []
    let arrPrazos = []
    let menorCusto = null
    let menorPrazo = null
    let empresaMaisBarata = {};
    let empresaMaisRapida = {};

    console.log(destino, peso)
    
    /* Verifica se os campos estão vazios e retorna true para a variável error */
    if (this.destino == "") {
        this.error = true;
        this.erro = 'Preencha todos os campos corretamente'
    } else {
        this.error = false;
    }

    /* Retorna o menor valor e o menor prazo */
    function encontrarMenorValorEPrazo(array1, array2) {
        menorCusto = Math.min(...array1);
        menorPrazo = Math.min(...array2);
        return {
            menorCusto,
            menorPrazo
        };
    }

    /* Faz o primeiro filtro, retorna todos os objetos que tenham a cidade correspondente ao destino digitado pelo usuário.
    O objetivo dessa função é diminuir o tempo de busca e refinar ainda mais a pesquisa.
    Os objetos são guardados dentro da lista cidadeMaisPerto
    */
    resultados.forEach((resultado) => {
        const cidade = resultado.city
        cidade == destino ? cidadeMaisPerto.push(resultado) : ""
    })

    /* Verifica a entrega mais rápida.
    O laço recebe a cidade especificada pelo usuário e cria um filtro verificando quais empresas 
    estão disponíveis para entregar na cidade, com isso retorna a empresa com menor prazo.
    */
    for (let i = 0; i < cidadeMaisPerto.length; i++) {

        const cidade = cidadeMaisPerto[i] //objeto
        const nomeTransportadora = cidade.name //retorna o nome da transportadora
        const prazo = parseInt(cidade.lead_time.replace("h", "")) //retorna o prazo da transpotadora
        const maisLeve = parseFloat(cidade.cost_transport_light.replace("R$ ", ""))
        const maisPesado = parseFloat(cidade.cost_transport_heavy.replace("R$ ", ""))
        let custo = (peso <= 100 ? maisLeve * peso : maisPesado * peso).toFixed(2) //calculo do custo

        //empurra os objetos para a lista
        arrPrazos.push(prazo)
        arrCustos.push(custo)

        //Chamento da função para encontrar o valor e prazo mais econômico e rápido
        encontrarMenorValorEPrazo(arrCustos, arrPrazos)

        empresaMaisRapida = { nome: nomeTransportadora, valor: custo, prazo: menorPrazo };
        empresaMaisBarata = { nome: nomeTransportadora, valor: menorCusto, prazo: prazo };
    }

    return { empresaMaisBarata, empresaMaisRapida };
}