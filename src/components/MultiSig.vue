<template>
  <div>
    <h1>Multi Sig Address Generator</h1>
    <b-form>
      <b-form-group label="Step 1 : Enter all the addresses per line">
        <b-textarea v-model="text" :rows="addresses.length" placeholder="Enter all addresses here"></b-textarea>
      </b-form-group>
      <b-form-group label="Step 2 : Specify how many addresses are needed to approve transaction">
        <b-input type="number" :min="1" :max="addresses.length" v-model="approveNum" />
      </b-form-group>
      <b-form-group :invalid-feedback="invalidFeedback" :state="!invalidFeedback">
        <b-button variant="primary" v-on:click.prevent="generateMultiSig" :disabled="addresses.length == 0">Generate Mutli Sig</b-button>
      </b-form-group>
    </b-form>

    <b-modal id="multisig-modal" title="Generated Multi Sig Address">
      <p class="my-4">To prevent human errors, please copy this address</p>
      
      <p class="my-4">
        {{ multiSigAddress }}
      </p>
      <template v-slot:modal-footer="{ }">
        <b-button type="button" v-clipboard:copy="multiSigAddress" v-clipboard:success="onCopy">Copy!</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script lang="ts">
import { Component, Provide, Emit, Watch, Vue } from "vue-property-decorator";
import { BitcoinUtils } from "../utils/btc-utils";

@Component
export default class MultiSig extends Vue {

  @Provide() multiSigAddress = "";
  @Provide() text = "";
  @Provide() addresses: string[] = [];
  @Provide() approveNum = 1;

  @Provide() invalidFeedback = "";
  @Provide() btcutils = new BitcoinUtils();

  @Emit()
  generateMultiSig() {
    try {
      this.multiSigAddress = this.btcutils.generateNOfMSig(this.addresses, this.approveNum) as string;
      this.invalidFeedback = '';
      this.$bvModal.show("multisig-modal");
    } catch (error) {
      this.invalidFeedback = `Error generating Multi Sig address. ${error.message}`;
    }
  }

  @Watch('text')
  onTextChanged(val: string, oldVal: string) {
    this.addresses = val.split("\n").filter((s) => {
      return s.length > 0;
    });
  }

  @Watch('approveNum')
  onApproveNumChanged(val: string, oldVal: string) {
    this.approveNum = parseInt(val);
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
