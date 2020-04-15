import * as bip32 from "bip32";
import * as bip39 from "bip39";
import * as bitcoin from 'bitcoinjs-lib';

export class BitcoinUtils {

    getAddress(node: any, network?: any): string | undefined {
        // return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address!;
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

    generateSegwitFromMnemonic(mnemonic: string, hdPath: string): string {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seed);
    
        return this.getAddress(root.derivePath(hdPath)) as string;
    }
}