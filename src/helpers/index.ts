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
    const price = getFormattedFixedString(order.price);
    const quantity = getFormattedFixedString(order.quantity);
    const total = (Number(price) * Number(quantity)).toFixed(4);

    return {
        price,
        quantity,
        total,
    };
}

const getFormattedFixedString = (x: number): string => (
    Number(
        formatNearAmount(BigInt(x).toString()).replace(',', '')
    ).toFixed(4)
)

const sortFormattedOrders = ({ price: price1 }: FormattedOrder, { price: price2 }: FormattedOrder) => price1 < price2 ? 1 : -1;