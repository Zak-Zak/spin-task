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
    fillContent,
    prepareMarketsBlock,
    setContentVisibility,
    marketSelect,
    refillOrderBook
} from './helpers/ui';
import { getSelectOptions, getTableData } from './helpers';

const main = async () => {
    await init();

    const info = await getAccountInfo();
    let accountId = info?.account.accountId;

    if (accountId) {
        fillContent(accountId, formatNearAmount(info?.balance.total || ''));

        initContract();

        const markets = await getMarkets();

        if (markets) {
            prepareMarketsBlock(getSelectOptions(markets));
            const orders = await getOrders(Number(marketSelect.value));
            
            refillOrderBook(getTableData(orders));
        }
    }

    signButton?.addEventListener('click', async function() {
        if (accountId) {
            await signOut();
            accountId = '';

            setContentVisibility(false);

            this.innerText = 'Sign in'          
        } else {
            await signIn();
        }
    });
    marketSelect.addEventListener('change', async function () {
        const orders = await getOrders(Number(this.value));
        refillOrderBook(getTableData(orders));
    });
}

main();