export class CartItem {
    productId: number;
    name: string;
    price: number;
    category: string;
    quantity: number;

    constructor(productId: number, name: string, price: number, category: string, quantity: number) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
    }
}