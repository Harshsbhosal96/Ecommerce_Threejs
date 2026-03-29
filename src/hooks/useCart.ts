import { useEffect, useMemo, useState } from 'react';
import { CartItem, ProductDataType } from '../types/store';

const CART_STORAGE_KEY = 'earbeats-cart';

const readStoredCart = (): CartItem[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (!storedCart) {
            return [];
        }

        const parsedCart = JSON.parse(storedCart) as CartItem[];

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart.filter((item) =>
            typeof item.id === 'number' &&
            typeof item.brand === 'string' &&
            typeof item.name === 'string' &&
            typeof item.price === 'number' &&
            typeof item.quantity === 'number' &&
            item.quantity > 0
        );
    } catch (error) {
        console.error('Unable to read cart from localStorage.', error);
        return [];
    }
};

export interface UseCartReturn {
    cartItems: CartItem[];
    cartCount: number;
    cartTotal: number;
    addToCart: (product: ProductDataType) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const useCart = (): UseCartReturn => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => readStoredCart());

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: ProductDataType) => {
        setCartItems((currentCart) => {
            const existingItem = currentCart.find((item) => item.id === product.id);

            if (existingItem) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    id: product.id,
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                },
            ];
        });
    };

    const increaseQuantity = (id: number) => {
        setCartItems((currentCart) =>
            currentCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCartItems((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id: number) => {
        setCartItems((currentCart) => currentCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = useMemo(
        () => cartItems.reduce((total, item) => total + item.quantity, 0),
        [cartItems]
    );

    const cartTotal = useMemo(
        () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    );

    return {
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    };
};
