import * as bip32 from "bip32";
import * as bip39 from "bip39";
import * as bitcoin from 'bitcoinjs-lib';

export class BitcoinUtils {

    getSegwitAddress(node: any, network?: any): string | undefined {
        return bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network })
        }).address;
    }
    
    validateMnemonic(s: string) {
        return bip39.validateMnemonic(s);
    }

    generateMnemonic(): string {
        return bip39.generateMnemonic();
    }

    generateSeedFromMnemonic(mnemonic: string): Buffer {
        return bip39.mnemonicToSeedSync(mnemonic);
    }

    generateSegwitFromSeed(seed: Buffer, hdPath: string): string {
        const root = bip32.fromSeed(seed);
        return this.getSegwitAddress(root.derivePath(hdPath)) as string;
    }

    generateSegwitFromMnemonic(mnemonic: string, hdPath: string): string {
        const seed = this.generateSeedFromMnemonic(mnemonic);
        return this.generateSegwitFromSeed(seed, hdPath)
    }

    generateNOfMSegwit(s: string[], m: number): string {
        // const pubkeys = [
        //     '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        //     '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        //     '023e4740d0ba639e28963f3476157b7cf2fb7c6fdf4254f97099cf8670b505ea59',
        //     '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
        // ]

        const pubkeys = s.map(hex => Buffer.from(hex, 'hex'));
        const { address } = bitcoin.payments.p2wsh({
            redeem: bitcoin.payments.p2ms({ m: m, pubkeys }),
        });

        return address as string;
    }
}