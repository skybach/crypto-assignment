<template>
  <b-container id="app">
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="HD Segwit" active>
          <HDWallet />
        </b-tab>
        <b-tab title="Multi Sig">
          <MultiSig />
        </b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HDWallet from "./components/HDWallet.vue";
import MultiSig from "./components/MultiSig.vue";

@Component({
  components: {
    HDWallet,
    MultiSig
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
