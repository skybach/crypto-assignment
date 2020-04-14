<template>
  <div class="hello">
    <h1>HD Wallet Segwit Generator</h1>
    <form>
      <label>Use the button to generate a secure mnemonic if you do not already have one</label>
      <button>Generate Mnemonic</button>
      <textarea placeholder="Enter your mnemonic here"></textarea>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HDWallet extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
