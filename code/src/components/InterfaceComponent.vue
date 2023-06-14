<template>
    <div class="div__container">
        <!-- Rodapé superior -->
        <div class="rodape">
            <p><img src="@/assets/logo.png" alt="">Melhor Frete</p>
        </div>
        <!-- Formulário -->
        <div class="container">
            <b-container fluid class="b-container">
                <!-- icone  e titulo-->
                <h4><b-icon icon="map" aria-hidden="true"></b-icon> Insira o destino e o peso</h4>
                <!-- inputs -->
                <b-col class="my-1 coluna">
                    <b-col sm="2" class="b-col">
                        <label for="input-small">Destino</label>
                    </b-col>
                    <b-col sm="10" class="b-col">

                        <!-- Select Destino-->
                        <b-form-select v-model="selectedOption" class="mb-3 select">
                            <b-form-select-option value="" disabled>Insira o destino</b-form-select-option>
                            <b-form-select-option v-for='(option, index) in options' :value="option" :key="index">
                                {{ option }}
                            </b-form-select-option>
                        </b-form-select>
                        <label for="input-small">Peso</label>

                        <!-- Input Peso -->
                        <b-form-input v-model="peso" placeholder="Insira o peso em kg"></b-form-input>
                    </b-col>
                    <!-- Botão analise -->
                    <button @click="obterDados" class="button">Analisar</button>
                </b-col>
            </b-container>

            <!-- Resultados -->
            <transition name="fade">
                <div v-show="mostrarResultado" class="resultado">
                    
                    <!-- Titulo Resposta -->
                    <h5>Estas são as melhores alternativas de frete que encontramos para você</h5>

                    <!-- Icone Cash -->
                    <div class="icone__resultado">
                        <b-icon icon="cash" aria-hidden="true" class="icone"></b-icon>
                    </div>

                    <!-- Mais econômica -->
                    <div class="resultados__nome">
                        <h6>Frete com o menor valor</h6>
                        <p>Transportadora: {{ resultadosEntrega.empresaMaisBarata.nome }}</p>
                        <p>Tempo estimado {{ resultadosEntrega.empresaMaisBarata.prazo }}h</p>
                    </div>
                    <div class="resultado__preco">
                        <h6>Preço</h6>
                        <p>R$ {{ resultadosEntrega.empresaMaisBarata.valor }}</p>
                    </div>

                    <!-- Icone Clock -->
                    <div class="icone__resultado">
                        <b-icon icon="clock-history" aria-hidden="true" class="icone"></b-icon>
                    </div>

                    <!-- Mais rápida -->
                    <div class="resultados__nome">
                        <h6>Frete mais rápido</h6>
                        <p>Transportadora: {{ resultadosEntrega.empresaMaisRapida.nome }}</p>
                        <p>Tempo estimado: {{ resultadosEntrega.empresaMaisRapida.prazo }}h</p>
                    </div>
                    <div class="resultado__preco">
                        <h6>Preço</h6>
                        <p>R$ {{ resultadosEntrega.empresaMaisRapida.valor }}</p>
                    </div>

                    <!-- Botão limpar -->
                    <div class="botao__container">
                        <button @click="limparResultados" class="limpar">Limpar</button>
                    </div>
                </div>

            </transition>
            <transition name="fade">
                <!-- Texto inicial -->
                <div v-if="ocultarInicio" class="vazio">
                    <p>Nenhum dado selecionado</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<!-- Script -->
<script>
import axios from 'axios';
import { encontrarEmpresaMaisBarataERapida } from '@/util.js';

export default {
    data() {
        return {
            apiUrl: "http://localhost:3000/transport",
            resultadosEntrega: "",
            selectedOption: null,
            peso: null,
            ocultarInicio: true,
            mostrarResultado: false,
            ativo: true,
            options: [],
        };
    },
    created() {
        this.obterDados();
    },
    methods: {
        async obterDados() {

            /* Tratando  e recebendo dados */
            try {
                const resposta = await axios.get(this.apiUrl);
                const resultados = resposta.data;
                const resultadosEntrega = encontrarEmpresaMaisBarataERapida(resultados, this.selectedOption, this.peso);
                this.resultadosEntrega = resultadosEntrega;
                this.options = this.retirarDuplicatas(resultados)
                this.ocultarInicio = true;

                /* Verificação dos valores de input */
                if (this.selectedOption === null || this.peso === null) {
                    this.mostrarResultado = false;

                } else {
                    this.mostrarResultado = true;
                    this.ocultarInicio = false;
                }

                /* limpando o fomrulário */
                this.selectedOption = ""
                this.peso = ""

            } catch (erro) {
                console.log(erro);
            }
        },
        /* Filtrando cidades repetidas para o option */
        retirarDuplicatas(objetos) {
            const cidades = [];

            objetos.forEach(objeto => {
                const cidade = objeto.city;
                if (!cidades.includes(cidade)) {
                    cidades.push(cidade);
                }
            });
            return cidades;
        },
        /* Limpandando resultado da tela */
        limparResultados() {
            this.mostrarResultado = false;
            this.ocultarInicio = true;
        }
    },

}
</script>

<!-- Estilo -->
<style scoped>

.div__container {
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    font-family: 'Poppins', sans - serif;
    flex-direction: column;
    height: 500px;
    margin: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.container {
    background-color: #ffffff;
    display: flex;
    height: 100%;
    align-items: center;
    margin: 0;
    padding: 0;
}

.rodape {
    background-color: #a1ced7;
    border-radius: 10px 10px 0 0;
    margin: 0;
    padding: 0;
    height: 3rem;
    width: 100%;
    font-weight: 600;
}

.rodape img {
    width: 1.5rem;
    margin: 12px 10px 15px 30px;
}

.b-container {
    background-color: #eeeeee;
    border-radius: 10px;
    height: 90%;
    width: 35%;
    margin: 1rem;
    padding: 1rem;

}

h4 {

    font-size: 20px;
    font-weight: 500;
    margin: 4rem 1rem 1rem 1rem;
}

.coluna {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 60%;
    justify-content: center;
    padding: 10px;
}

.b-col {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.b-col label {
    color: #5b5b5b;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 5px;
    margin-top: 10px;
}

.b-col select {
    background-color: #ffffff;
    border-radius: 4px;
    border: none;
    color: gray;
    padding: 5px;
    width: 100%;
    font-size: 15px;
}

.b-col input {
    border: none;
    font-size: 15px;
    padding: 4px;
    margin-bottom: 2rem;
}

button {
    border: none;
    background-color: #a1ced7;
    border-radius: 5px;
    color: #000000;
    cursor: pointer;
    font-weight: 400;
    margin: 0 auto;
    padding: 5px 2.5rem;
    transition: .3s;

}

button:hover {
    background-color: #9adbe0;
}

/* ========== Resultados ===========  */
.vazio {

    margin: 0 auto
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.container__resultado {
    width: 100%;
    background-color: aqua;
}

.resultado {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    padding-top: 2rem;
    width: 60%;
}

.icone__resultado {
    align-items: center;
    background-color: #9adbe0;
    border-radius: 5px 0 0 5px;
    display: flex;
    font-size: 2rem;
    height: 100px;
    justify-content: center;
    width: 10%;
}

.resultados__nome {
    align-items: start;
    background-color: #eeeeee;
    border-radius: 0 5px 5px 0;
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    margin: -15px 5px;
    margin-left: -5px;
    padding: 10px;
    width: 50%;
}

.resultados__nome p {
    font-size: 15px;
    margin: 0.5px;
}

h6 {
    font-size: 15px;
    font-weight: 700;
}

h5 {
    margin-left: 1.3rem;
    margin-bottom: 1rem;
}

.resultado__preco {
    align-items: start;
    background-color: #eeeeee;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    margin: 5px;
    padding: 10px;
    width: 30%;
}

.botao__container {
    margin-top: 3rem;
    margin-left: 24rem;
}
</style>
