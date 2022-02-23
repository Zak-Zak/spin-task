import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { getAccountInfo, init, signIn, signOut } from './near';
import { 
    signButton,
    userNameInput,
    setDisabled,
    prepareSignBlock,
    handleUserNameInputChange,
    prepareBalanceBlock,
} from './uiHelpers';

const main = async () => {
    await init();

    const info = await getAccountInfo();
    const accountId = info?.account.accountId;
    const total = info?.balance.total || '';

    prepareSignBlock(accountId);
    prepareBalanceBlock(accountId, formatNearAmount(total));

    userNameInput?.addEventListener('input', handleUserNameInputChange);
    signButton?.addEventListener('click', async function() {
        if (accountId) {
            await signOut();

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
}

main();