<template>
  <div>
    <h1>HD Wallet Segwit Generator</h1>
    <v-ons-form>
      <v-ons-label>Use the button to generate a secure mnemonic if you do not already have one</v-ons-label>
      <v-ons-button v-on:click.prevent="generateMnemonic">Generate Mnemonic</v-ons-button>
      <v-ons-textarea v-model="mnemonic" placeholder="Enter your mnemonic here"></v-ons-textarea>
      <v-ons-input v-model="hdPath" />
      <v-ons-button v-on:click.prevent="generateSegwit">Generate Segwit</v-ons-button>

      {{ segwitAddress }}
    </v-ons-form>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Prop, Emit, Watch, Vue } from "vue-property-decorator";
import { BitcoinUtils } from "../utils/btc-utils";

@Component
export default class HDWallet extends Vue {

  @Provide() segwitAddress = "";
  @Provide() mnemonic = "";
  @Provide() hdPath = "m/44'/0/0/0/0";

  @Prop() btcutils = new BitcoinUtils();

  @Watch('mnemonic')
  onMnemonicChanged(val: string, oldVal: string) {
    console.log(val, oldVal);
    console.log(this.btcutils.validateMnemonic(val));
  }

  @Emit()
  generateMnemonic() {
    console.log('generate mnemonic');
    this.mnemonic = this.btcutils.generateMnemonic();
  }

  @Emit()
  generateSegwit() {
    console.log('generate segwit');
    this.segwitAddress = this.btcutils.generateSegwitFromMnemonic(this.mnemonic, this.hdPath) as string;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
