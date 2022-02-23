import { Account, ConnectedWalletAccount } from "near-api-js";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type AccountWithBalance = {
    account: ConnectedWalletAccount;
    balance: Awaited<ReturnType<Account['getAccountBalance']>>;
}