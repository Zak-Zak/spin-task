export type Option = {
    value: string;
    text: string;
};

export type FormattedOrder = {
    price: string;
    quantity: string;
    total: string;
}

export type OrdersTableData = {
    ask_orders: FormattedOrder[];
    bid_orders: FormattedOrder[];
}