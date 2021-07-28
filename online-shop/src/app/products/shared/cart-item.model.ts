export class CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;

    constructor(productId: number, name: string, price: number, quantity: number) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}