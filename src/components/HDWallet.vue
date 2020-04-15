<template>
  <div>
    <h1>HD Wallet Segwit Generator</h1>
    <b-form>
      <b-form-group label="Step 1 : Use the button to generate a secure mnemonic if you do not already have one" :invalid-feedback="invalidFeedback" :state="isValidMnemonic" >
        <b-input v-model="mnemonic" :state="isValidMnemonic" placeholder="Enter your mnemonic here"></b-input>
      </b-form-group>
      <b-form-group>
        <b-button v-on:click.prevent="generateMnemonic">Generate Mnemonic</b-button>
      </b-form-group>
      <b-form-group label="Step 2 : Enter the hd path for the address">
        <b-input v-model="hdPath" :disabled="!isValidMnemonic" />
      </b-form-group>
      <b-form-group>
        <b-button variant="primary" v-b-modal.modal v-on:click.prevent="generateSegwit" :disabled="!isValidMnemonic">Generate Segwit</b-button>
      </b-form-group>

      
    </b-form>

    <b-modal id="modal" title="Generated Segwit Address">
      <p class="my-4">To prevent human errors, please copy this address</p>
      
      <p class="my-4">
        {{ segwitAddress }}
      </p>
      <template v-slot:modal-footer="{ }">
        <b-button type="button" v-clipboard:copy="segwitAddress" v-clipboard:success="onCopy">Copy!</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script lang="ts">
import { Component, Provide, Emit, Watch, Vue } from "vue-property-decorator";
import { BitcoinUtils } from "../utils/btc-utils";

@Component
export default class HDWallet extends Vue {

  @Provide() segwitAddress = "";
  @Provide() mnemonic = "";
  @Provide() hdPath = "m/44'/0/0/0/0";

  @Provide() isValidMnemonic = false;
  @Provide() invalidFeedback = "";
  @Provide() btcutils = new BitcoinUtils();

  @Watch('mnemonic')
  onMnemonicChanged(val: string, oldVal: string) {
    this.isValidMnemonic = this.btcutils.validateMnemonic(val);
    this.invalidFeedback = this.isValidMnemonic?"":"Invalid mnemonic. You may want to generate one instead of entering your own";
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

  @Emit()
  onCopy() {
    console.log('copied');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
