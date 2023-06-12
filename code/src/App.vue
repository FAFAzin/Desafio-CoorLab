<template>
  <div id="app">
    <BestTransport />
    <Interface />
  </div>
</template>

<script>
import BestTransport from './components/BestTransport.vue';
import Interface from "@/components/InterfaceComponent.vue"

export default {
  name: 'App',
  components: {
    BestTransport,
    Interface
  }
}
</script>

<style></style>
