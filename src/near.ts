import { connect, Contract, keyStores, Near, WalletConnection } from "near-api-js";

import { AccountWithBalance, GetOrdersResponse, Market } from "./types/near";

let near: Near;
let wallet: WalletConnection;
let contract: Contract;

const networkId = 'testnet';
const config = {
    networkId,
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
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

export const signIn = async () => {
    if (!wallet.isSignedIn()) {
        return await wallet.requestSignIn();
    }
};

export const signOut = async () => wallet.signOut();


/*------------Contract----------------*/
export const initContract = async () => {
    if (wallet.isSignedIn()) {
        const methodOptions = {
            viewMethods: ['markets', 'view_market'],
            changeMethods: ['addMessage'],
            sender: wallet.account(),
        };

        contract = new Contract(
            wallet.account(),
            'app_2.spin_swap.testnet',
            methodOptions
        );
    }
}

export const getMarkets = async (): Promise<Market[] | undefined> => {
    //@ts-ignore
    return await contract.markets({});
}

export const getOrders = async (marketId: number): Promise<GetOrdersResponse> => {
    // @ts-ignore
    return await contract.view_market({ market_id: marketId });
}