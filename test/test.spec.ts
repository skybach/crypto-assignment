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

it("can generate a P2SH(P2WSH(...)), pay-to-multisig (n-of-m) address", () => {

  assert.strictEqual(bitcoinutils.generateNOfMSig([
    "03d1b98e4f183a60bff312ac4d9ae32a9cac73ff5dd9ed6b4244f7e1c586a42d2d",
    "021d7e25870057383faad795f651b3f5844c4d3ebb1e3a31e444e6a21d9af37164",
    "028352c82acdade62cf86ee6092d0330fbdc38020e4b35acaed2ff96710ac3dd32"
  ], 2), "3Gbr54eNZVAEY2XvTdT3SAwbBLefkTxNRC");

  assert.strictEqual(bitcoinutils.generateNOfMSig([
    "04A97B658C114D77DC5F71736AB78FBE408CE632ED1478D7EAA106EEF67C55D58A91C6449DE4858FAF11721E85FE09EC850C6578432EB4BE9A69C76232AC593C3B",
    "04019EF04A316792F0ECBE5AB1718C833C3964DEE3626CFABE19D97745DBCAA5198919081B456E8EEEA5898AFA0E36D5C17AB693A80D728721128ED8C5F38CDBA0",
    "04A04F29F308160E6F945B33D943304B1B471ED8F9EACEEB5412C04E60A0FAB0376871D9D1108948B67CAFBC703E565A18F8351FB8558FD7C7482D7027EECD687C"
  ], 2), "38aNB81yPqNp6X2T3rXYZN8Z3C4pSbqEvs");

});
