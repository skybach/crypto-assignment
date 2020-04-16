<template>
  <div>
    <h1>HD Segwit Address Generator</h1>
    <b-form>
      <b-form-group label="Step 1 : Use the button to generate a secure mnemonic and seed if you do not already have one">
        <b-button v-on:click.prevent="generateMnemonic">Generate Mnemonic and Seed</b-button>
      </b-form-group>
      <b-form-group>
        <b-input v-model="mnemonic" readonly placeholder="No mnemonic generated"></b-input>
      </b-form-group>
      <b-form-group>
        <b-input v-model="seed" placeholder="or just enter your seed here"></b-input>
      </b-form-group>
      <b-form-group label="Step 2 : Enter the hd path for the address">
        <b-input v-model="hdPath" />
      </b-form-group>
      <b-form-group :invalid-feedback="invalidFeedback" :state="!invalidFeedback">
        <b-button variant="primary" v-on:click.prevent="generateSegwit">Generate Segwit</b-button>
      </b-form-group>

      
    </b-form>

    <b-modal id="hdwallet-modal" title="Generated Segwit Address">
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
  @Provide() seed = "";
  @Provide() hdPath = "m/49'/0'/0'/0/0";

  @Provide() invalidFeedback = "";
  @Provide() btcutils = new BitcoinUtils();

  @Watch('mnemonic')
  onMnemonicChanged(val: string, oldVal: string) {
    this.seed = this.btcutils.generateSeedFromMnemonic(this.mnemonic).toString('hex');
  }

  @Watch('seed')
  onSeedChanged(val: string, oldVal: string) {
    this.invalidFeedback = "";
  }

  @Watch('hdPAth')
  onHdPathChanged(val: string, oldVal: string) {
    this.invalidFeedback = "";
  }

  @Emit()
  generateMnemonic() {
    this.mnemonic = this.btcutils.generateMnemonic();
  }

  @Emit()
  generateSegwit() {
    try {
      this.segwitAddress = this.btcutils.generateSegwitFromSeed(Buffer.from(this.seed, "hex"), this.hdPath) as string;
      this.invalidFeedback = '';
      this.$bvModal.show("hdwallet-modal");
    } catch (error) {
      this.invalidFeedback = `Error generating Segwit address. ${error.message}`;
    }
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
