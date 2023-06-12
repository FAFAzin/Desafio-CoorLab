<template>
    <div>
        <input type="text" v-model="destino" placeholder="Destino">
        <input type="number" v-model="peso" placeholder="Peso">
        <button @click="obterDados">Buscar Dados da API</button>

        <div v-if="!resultadosEntrega">
            <p>Preencha algum campo</p>
        </div>

        <div v-if="!err && resultadosEntrega">
            <h2>Resultados</h2>
            <p>Empresa mais barata: {{ resultadosEntrega.empresaMaisBarata.nome }}</p>
            <p>Valor: {{ resultadosEntrega.empresaMaisBarata.valor }}</p>
            <p>Prazo: {{ resultadosEntrega.empresaMaisBarata.prazo }}</p>
            <p>Empresa mais rápida: {{ resultadosEntrega.empresaMaisRapida.nome }}</p>
            <p>Valor: {{ resultadosEntrega.empresaMaisRapida.valor }}</p>
            <p>Prazo: {{ resultadosEntrega.empresaMaisRapida.prazo }}</p>
        </div>

        <div v-if="err">
            <p>{{ erro }}</p>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import encontrarEmpresaMaisBarataERapida from '@/util.js';

export default {
    data() {
        return {
            apiUrl: 'http://localhost:3000/transport',
            resultadosEntrega: null,
            destino: "",
            peso: 0,
            erro: "",
            err: null
        };
    },
    methods: {
        async obterDados() {
            try {
                const resposta = await axios.get(this.apiUrl);
                const resultados = resposta.data;
                const resultadosEntrega = encontrarEmpresaMaisBarataERapida(resultados, this.destino, this.peso);
                this.resultadosEntrega = resultadosEntrega;
                this.err = false;
                if (this.destino == "" && this.peso == 0) {
                    return (this.err = true, this.erro = "Preencha todos os campos corretamente");
                }
            } catch (erro) {
                console.error(erro);
                this.error = true;
                this.erro = "Ocorreu um erro ao buscar os dados.";
            }
        },

    }
};
</script>
  