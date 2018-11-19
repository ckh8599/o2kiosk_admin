import { Item } from './Item';

export class Order {
    orderId: string;
    items: Array<Item>;
    check: string;
    countDown: string;
}