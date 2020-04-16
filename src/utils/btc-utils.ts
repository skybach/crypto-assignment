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

    generateNOfMSig(s: string[], m: number): string {
        const pubkeys = s.map(hex => Buffer.from(hex, 'hex'));
        // const { address } = bitcoin.payments.p2sh({
        //     redeem: bitcoin.payments.p2ms({ m: m, pubkeys }),
        // });
        const { address } = bitcoin.payments.p2sh({
            // redeem: bitcoin.payments.p2wsh({
              redeem: bitcoin.payments.p2ms({ m: m, pubkeys })
            // })
        })
        return address as string;
    }
}