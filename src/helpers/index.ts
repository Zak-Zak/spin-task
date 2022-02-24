import { GetOrdersResponse, Market, Order } from "../types/near";
import { FormattedOrder, Option, OrdersTableData } from "../types/helpers";
import { formatNearAmount } from "near-api-js/lib/utils/format";

export const getSelectOptions = (markets: Market[]): Option[] => (
    markets.reduce((options, { id, base, quote }): Option[] => (
        [
            ...options,
            {
                value: id.toString(),
                text: `${base.ticker}/${quote.ticker}`,
            },
        ]
    ), [] as Option[])
);

export const getTableData = (orders: GetOrdersResponse): OrdersTableData => ({
    ask_orders: orders.ask_orders.map(getFormattedOrder).sort(sortFormattedOrders),
    bid_orders: orders.bid_orders.map(getFormattedOrder).sort(sortFormattedOrders),
});

const getFormattedOrder = (order: Order): FormattedOrder => {
    const price = getNearFormattedNumber(order.price);
    const quantity = getNearFormattedNumber(order.quantity);
    const total = price * quantity;

    return {
        price,
        quantity,
        total,
    };
}

const getNearFormattedNumber = (x: number): number => (
    Number(formatNearAmount(BigInt(x).toString()).replace(',', ''))
)

const sortFormattedOrders = ({ price: price1 }: FormattedOrder, { price: price2 }: FormattedOrder) => (
    Number(price1) < Number(price2) ? 1 : -1
);