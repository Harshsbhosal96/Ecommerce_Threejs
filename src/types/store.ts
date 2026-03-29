export interface ProductDataType {
    brand: string;
    name: string;
    price: number;
    id: number;
    description: string;
}

export interface CartItem {
    id: number;
    brand: string;
    name: string;
    price: number;
    quantity: number;
}
