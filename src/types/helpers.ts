export type Option = {
    value: string;
    text: string;
};

export type FormattedOrder = {
    price: number;
    quantity: number;
    total: number;
}

export type OrdersTableData = {
    ask_orders: FormattedOrder[];
    bid_orders: FormattedOrder[];
}