<template>
  <div>
    <h1>HD Wallet Segwit Generator</h1>
    <form>
      <label>Use the button to generate a secure mnemonic if you do not already have one</label>
      <button v-on:click.prevent="generateMnemonic">Generate Mnemonic</button>
      <textarea v-model="mnemonic" placeholder="Enter your mnemonic here"></textarea>
      <input v-model="hdPath" />
      <button v-on:click.prevent="generateSegwit">Generate Segwit</button>

      {{ segwitAddress }}
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Emit, Watch, Vue } from "vue-property-decorator";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import * as bitcoin from 'bitcoinjs-lib';

function getAddress(node: any, network?: any): string | undefined {
    // return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address!;
    return bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network })
    }).address;
}

@Component
export default class HDWallet extends Vue {

  @Provide() segwitAddress = "";
  @Provide() mnemonic = "";
  @Provide() hdPath = "m/44'/0/0/0/0";

  @Watch('mnemonic')
  onMnemonicChanged(val: string, oldVal: string) {
    console.log(val, oldVal);
    console.log(bip39.validateMnemonic(val));
  }

  @Emit()
  generateMnemonic() {
    console.log('generate mnemonic');
    this.mnemonic = bip39.generateMnemonic();
  }

  @Emit()
  generateSegwit() {
    console.log('generate segwit');
    const seed = bip39.mnemonicToSeedSync(this.mnemonic);
    const root = bip32.fromSeed(seed);

    this.segwitAddress = getAddress(root.derivePath("m/0'/0/0")) as string;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
