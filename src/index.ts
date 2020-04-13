import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

function getAddress(node: any, network?: any): string {
    // return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address!;
    return bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network })
    }).address;
}


// // *** can export a BIP32 xpriv, then import it
// const mnemonic =
//     'praise you muffin lion enable neck grocery crumble super myself license ghost';
// const seed = bip39.mnemonicToSeedSync(mnemonic);
// const node = bip32.fromSeed(seed);
// const strng = node.toBase58();
// const restored = bip32.fromBase58(strng);

// // *** can create a BIP32, bitcoin, account 0, external address
// const path = "m/0'/0/0";
// const root = bip32.fromSeed(
//     Buffer.from(
//     'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
//     'hex',
//     ),
// );

// const child1 = root.derivePath(path);

// // option 2, manually
// const child1b = root
//     .deriveHardened(0)
//     .derive(0)
//     .derive(0);

// // *** can create a BIP44, bitcoin, account 0, external address
// const root = bip32.fromSeed(
//     Buffer.from(
//     'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
//     'hex',
//     ),
// );

// const child1 = root.derivePath("m/44'/0'/0'/0/0");

// // option 2, manually
// const child1b = root
//     .deriveHardened(44)
//     .deriveHardened(0)
//     .deriveHardened(0)
//     .derive(0)
//     .derive(0);

function generateHDSegwit() {
    // *** can use BIP39 to generate BIP32 addresses
    // var mnemonic = bip39.generateMnemonic()
    const mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost';
    console.log(bip39.validateMnemonic(mnemonic));

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);

    // receive addresses
    // '1AVQHbGuES57wD68AJi7Gcobc3RZrfYWTC'
    console.log(getAddress(root.derivePath("m/0'/0/0")));

    // '1Ad6nsmqDzbQo5a822C9bkvAfrYv9mc1JL',
    console.log(getAddress(root.derivePath("m/0'/0/1")));

    // change addresses
    // '1349KVc5NgedaK7DvuD4xDFxL86QN1Hvdn'
    console.log(getAddress(root.derivePath("m/0'/1/0")));

    // '1EAvj4edpsWcSer3duybAd4KiR4bCJW5J6'
    console.log(getAddress(root.derivePath("m/0'/1/1")));
}

function generateNOfMSegwit() {
    // can generate a P2WSH (SegWit), pay-to-multisig (3-of-4) address
    const pubkeys = [
        '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        '023e4740d0ba639e28963f3476157b7cf2fb7c6fdf4254f97099cf8670b505ea59',
        '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
    ].map(hex => Buffer.from(hex, 'hex'));
    const { address } = bitcoin.payments.p2wsh({
        redeem: bitcoin.payments.p2ms({ m: 3, pubkeys }),
    });

    // 'bc1q75f6dv4q8ug7zhujrsp5t0hzf33lllnr3fe7e2pra3v24mzl8rrqtp3qul'
    console.log(address)
}

generateHDSegwit()

generateNOfMSegwit()