export const signButton = document.getElementById('sign-button') as HTMLButtonElement;
export const userNameInput = document.getElementById('username') as HTMLInputElement;
export const balanceWrapper = document.getElementById('balance-wrapper');
export const balanceElement = document.getElementById('balance') as HTMLSpanElement;

export const setDisabled = (el: HTMLElement, disabled = true) => {
    if (disabled) {  
        el.setAttribute('disabled', '');
    } else {
        el.removeAttribute('disabled');
    }
};

export const prepareSignBlock = (accountId?: string) => {
    if (accountId) {
        userNameInput.value = accountId.split('.')[0];
        setDisabled(userNameInput);

        signButton.innerText = 'Sign out';
    } else if (!userNameInput.value) {
        setDisabled(signButton);
    }
};

export const prepareBalanceBlock = (accountId?: string, balance?: string) => {
    if (accountId) {
        balanceWrapper?.classList.remove('hidden');
        balanceElement.innerText = balance || '';
    }
}

export const handleUserNameInputChange = () => {
    if (userNameInput.value) {
        setDisabled(signButton, false);
    } else {
        setDisabled(signButton);
    }
}
