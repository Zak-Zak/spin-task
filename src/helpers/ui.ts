import { FormattedOrder, Option, OrdersTableData } from "../types/helpers";

export const signButton = document.getElementById('sign-button') as HTMLButtonElement;
export const contentWrapper = document.getElementById('content-wrapper');
export const userNameParagraph = document.getElementById('username') as HTMLSpanElement;
export const balanceElement = document.getElementById('balance') as HTMLSpanElement;
export const marketSelect = document.getElementById('market-select') as HTMLSelectElement;

export const fillContent = (accountId: string, balance: string) => {
    if (accountId) {
        signButton.innerText = 'Sign out';
        userNameParagraph.innerText = accountId;
        setContentVisibility(true);

        if(balance) {
            balanceElement.innerText = balance || '';
        }
    }
};

export const prepareMarketsBlock = (options: Option[]) => {
    options.forEach(({ value, text }) => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute('value', value);
        optionElement.innerText = text;

        marketSelect.appendChild(optionElement);
    });
}

export const setContentVisibility = (visible: boolean) => {
    if (visible) {
        contentWrapper?.classList.remove('hidden');
    } else {
        contentWrapper?.classList.add('hidden');
    }
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