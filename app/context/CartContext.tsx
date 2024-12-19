import {createContext, useState, ReactNode, useContext} from "react";

interface CartProduct {
    id: string;
    title: string;
    price: string;
    image: any;
    quantity: number;
}

interface CartContextType {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    getTotalPrice: () => number;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    const addToCart = (product: CartProduct) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const incrementQuantity = (id: string) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id: string) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const getTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + parseInt(item.price.replace(/\D/g, "")) * item.quantity,
            0
        );
    };

    const removeFromCart = (id: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, incrementQuantity, clearCart, decrementQuantity, addToCart, removeFromCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart с ним проблемы какие то хуй знает что");
    }
    return context;
};