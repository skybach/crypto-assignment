import * as assert from 'assert';
import { describe, it } from 'mocha';
import { BitcoinUtils } from "../src/utils/btc-utils";

const bitcoinutils = new BitcoinUtils();
console.log(bitcoinutils);

it('can validate Mnemonic', () => {
  assert.strictEqual(bitcoinutils.validateMnemonic(
    "private edit volcano task turn extra provide siren cannon dish kick jealous"
  ), true);

  assert.strictEqual(bitcoinutils.validateMnemonic(
    "private edit volcano task turn extra provide siren cannon dish kick jealous jealous"
  ), false);
})

it('can generate Seed from Mnemonic', () => {
  assert.strictEqual(bitcoinutils.generateSeedFromMnemonic(
    "private edit volcano task turn extra provide siren cannon dish kick jealous"
  ).toString("hex"), "989fa4fc5bd5e858065f941dc43cd4e4a2eb44919aeb77fc73062fc1aa7fda394f476f7140d7d426d3f0df9a8314bd317d133db264e8fa2a778d150f60b7c746");
})

it('can generate Segwit from Seed', () => {
  assert.strictEqual(bitcoinutils.generateSegwitFromSeed(
    Buffer.from("989fa4fc5bd5e858065f941dc43cd4e4a2eb44919aeb77fc73062fc1aa7fda394f476f7140d7d426d3f0df9a8314bd317d133db264e8fa2a778d150f60b7c746", "hex"),
    "m/49'/0'/0'/0/0"
  ), "3HKhuqgjujLw2Yybxa4YrW4DktmuoZFx68");
})

it('can generate Segwit from Mnemonic', () => {

  assert.strictEqual(bitcoinutils.generateSegwitFromMnemonic(
    "nerve method major unable lounge motor student tired water protect cactus speak",
    "m/49'/0'/0'/0/0"
  ), "3AxFjQmUZzSGp15KeBYQ5cL9uhM4p4hNRM");

  assert.strictEqual(bitcoinutils.generateSegwitFromMnemonic(
    "praise you muffin lion enable neck grocery crumble super myself license ghost",
    "m/49'/0'/0'/0/0"
  ), "3GU5e9mPrLgPemhawVHHrDt6bjZZ6M9CPc");

  assert.strictEqual(bitcoinutils.generateSegwitFromMnemonic(
    "private edit volcano task turn extra provide siren cannon dish kick jealous",
    "m/49'/0'/0'/0/0"
  ), "3HKhuqgjujLw2Yybxa4YrW4DktmuoZFx68");
});

it("can generate a P2SH(P2WSH(...)), pay-to-multisig (2-of-2) address", () => {

  const address = bitcoinutils.generateNOfMSig([
    "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
    "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
  ], 2);

  assert.strictEqual(address, "3P4mrxQfmExfhxqjLnR2Ah4WES5EB1KBrN");
});
