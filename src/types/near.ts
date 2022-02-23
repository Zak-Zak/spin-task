import { Account, ConnectedWalletAccount } from "near-api-js";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type AccountWithBalance = {
    account: ConnectedWalletAccount;
    balance: Awaited<ReturnType<Account['getAccountBalance']>>;
}

export type Market = {
    id: number;
    base: {
        ticker: string;
        decimal: number;
        address: string;
    }
    quote: {
        ticker: string;
        decimal: number;
        address: string;
    }
    fee: number;
}

export type Order = {
    price: number;
    quantity: number;
}

export type GetOrdersResponse = {
    ask_orders: Order[];
    bid_orders: Order[];
}