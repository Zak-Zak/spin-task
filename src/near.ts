import { connect, keyStores, Near, WalletConnection } from "near-api-js";

import { AccountWithBalance } from "./types/near";

let near: Near;
let wallet: WalletConnection;

const networkId = 'testnet';
const config = {
    networkId,
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    headers: {},
    keyStore: new keyStores.BrowserLocalStorageKeyStore()
};

export const init = async () => {
    near = await connect(config);
    wallet = new WalletConnection(near, '');
}

export const getAccountInfo = async (): Promise<AccountWithBalance | null> => {
    if(wallet.isSignedIn()) {
        const account = wallet.account();
        const balance = await account.getAccountBalance();

        return {
            account,
            balance,
        };
    }

    return null;
};

export const signIn = async (userName: string) => {
    if (!wallet.isSignedIn()) {
        return await wallet.requestSignIn(`${userName}.${networkId}`);
    }
};

export const signOut = async () => wallet.signOut();