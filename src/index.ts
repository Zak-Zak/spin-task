import { formatNearAmount } from 'near-api-js/lib/utils/format';

import { 
    getAccountInfo,
    getMarkets,
    init,
    initContract,
    signIn, 
    signOut,
    getOrders,
} from './near';
import { 
    signButton,
    userNameInput,
    setDisabled,
    prepareSignBlock,
    handleUserNameInputChange,
    prepareBalanceBlock,
    prepareMarketsBlock,
    hideContent,
    marketSelect,
    refillOrderBook
} from './helpers/ui';
import { getSelectOptions, getTableData } from './helpers';

const main = async () => {
    await init();

    const info = await getAccountInfo();
    const accountId = info?.account.accountId;
    const total = info?.balance.total || '';

    prepareSignBlock(accountId);
    prepareBalanceBlock(accountId, formatNearAmount(total));

    if (accountId) {
        initContract();

        const markets = await getMarkets();

        if (markets) {
            prepareMarketsBlock(getSelectOptions(markets));
            const orders = await getOrders(Number(marketSelect.value));
            
            refillOrderBook(getTableData(orders));
        }
    }

    userNameInput?.addEventListener('input', handleUserNameInputChange);
    signButton?.addEventListener('click', async function() {
        if (accountId) {
            await signOut();

            hideContent();
            setDisabled(this);
            setDisabled(userNameInput, false);
            this.innerText = 'Sign in'
            userNameInput.value = '';            
        } else {
            setDisabled(this);

            await signIn(userNameInput?.value);

            setDisabled(this, false);
        }
    });
    marketSelect.addEventListener('change', async function () {
        const orders = await getOrders(Number(this.value));
        refillOrderBook(getTableData(orders));
    });
}

main();