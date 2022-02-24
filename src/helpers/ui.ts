import { FormattedOrder, Option, OrdersTableData } from "../types/helpers";

export const signButton = document.getElementById('sign-button') as HTMLButtonElement;
export const userNameInput = document.getElementById('username') as HTMLInputElement;
export const balanceWrapper = document.getElementById('balance-wrapper');
export const balanceElement = document.getElementById('balance') as HTMLSpanElement;
export const marketWrapper = document.getElementById('market-wrapper');
export const marketSelect = document.getElementById('market-select') as HTMLSelectElement;

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

export const prepareMarketsBlock = (options: Option[]) => {
    marketWrapper?.classList.remove('hidden');

    options.forEach(({ value, text }) => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute('value', value);
        optionElement.innerText = text;

        marketSelect.appendChild(optionElement);
    });
}

export const hideContent = () => {
    balanceWrapper?.classList.add('hidden');
    marketWrapper?.classList.add('hidden');
}

/*-----------Order book----------*/
const orderBookBody = document.getElementById('order-book-body');

export const refillOrderBook = (orders: OrdersTableData) => {
    if (orderBookBody) {
        orderBookBody.innerHTML = '';

        for(const order of orders.ask_orders) {
            orderBookBody.appendChild(createRow(order, 'ask'));
        }

        for(const order of orders.bid_orders) {
            orderBookBody.appendChild(createRow(order, 'bid'));
        }
    }
}

const createRow = (order: FormattedOrder, className?: string) => {
    const row = document.createElement('tr');

    if(className) {
        row.classList.add(className);
    }

    row.appendChild(createCell(order.price));
    row.appendChild(createCell(order.quantity));
    row.appendChild(createCell(order.total));

    return row;
}

const createCell = (value: number) => {
    const cell = document.createElement('td');
    cell.innerText = value.toFixed(4);

    return cell;
}