export default function encontrarEmpresaMaisBarataERapida(resultados, destino, peso) {
    let cidadeMaisPerto = [];
    let arrCustos = [];
    let arrPrazos = [];
    let menorCusto = 0;
    let menorPrazo = 0;
    let empresaMaisBarata = {};
    let empresaMaisRapida = {};

    if (destino === "") {
        return { err: true, erro: 'Preencha todos os campos corretamente' };
    }

    resultados.forEach((resultado) => {
        const cidade = resultado.city
        cidade == destino ? cidadeMaisPerto.push(resultado) : ""
    })

    cidadeMaisPerto.forEach((cidade) => {
        const nomeTransportadora = cidade.name;
        const prazo = parseInt(cidade.lead_time.replace("h", ""));
        const maisLeve = parseFloat(cidade.cost_transport_light.replace("R$ ", ""));
        const maisPesado = parseFloat(cidade.cost_transport_heavy.replace("R$ ", ""));
        let custo = (peso <= 100 ? maisLeve * peso : maisPesado * peso).toFixed(2);

        arrPrazos.push(prazo);
        arrCustos.push(custo);

        menorCusto = Math.min(...arrCustos);
        menorPrazo = Math.min(...arrPrazos);

        empresaMaisRapida = { nome: nomeTransportadora, valor: custo, prazo: menorPrazo };
        empresaMaisBarata = { nome: nomeTransportadora, valor: menorCusto, prazo: prazo };
    });


    return { empresaMaisBarata, empresaMaisRapida };
}
