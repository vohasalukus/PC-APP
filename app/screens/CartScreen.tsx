import {useState} from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import {useCart} from "../context/CartContext";
import CustomAlert from "@/app/UI/CustomAlert";

export default function CartScreen() {
    const [showAlert, setShowAlert] = useState(false);

    const { cart, incrementQuantity, removeFromCart, decrementQuantity, getTotalPrice, clearCart } = useCart();

    const handleBuy = () => {
        clearCart();
        setShowAlert(true);
    };

    return (
        <View style={styles.container}>
            {cart.length === 0 ? (
                <Text style={styles.emptyCartText}>Вы еще не добавили товаров в корзину</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Image source={item.image} style={styles.cartItemImage} />
                                <View style={styles.cartItemInfo}>
                                    <Text style={styles.cartItemTitle}>{item.title}</Text>
                                    <Text style={styles.cartItemPrice}>{item.price}</Text>
                                    <View style={styles.quantityControls}>
                                        <Pressable onPress={() => decrementQuantity(item.id)}>
                                            <Text style={styles.quantityButton}>-</Text>
                                        </Pressable>
                                        <Text style={styles.quantityText}>{item.quantity}</Text>
                                        <Pressable onPress={() => incrementQuantity(item.id)}>
                                            <Text style={styles.quantityButton}>+</Text>
                                        </Pressable>
                                    </View>
                                    <Pressable onPress={() => removeFromCart(item.id)}>
                                        <Text style={styles.removeButton}>Удалить</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <Text style={styles.totalPrice}>Итого: {getTotalPrice()} ₽</Text>
                </>
            )}
            <Pressable
                style={[styles.buyButton, cart.length === 0 && styles.disabledButton]}
                disabled={cart.length === 0}  // Отключаем кнопку, если корзина пуста
                onPress={handleBuy}
            >
                <Text style={styles.buyButtonText}>Купить</Text>
            </Pressable>
            <CustomAlert
                visible={showAlert}
                message="Товары успешно куплены!"
                onClose={() => setShowAlert(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B1B2F",
        padding: 15,
    },
    emptyCartText: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    cartItem: {
        flexDirection: "row",
        backgroundColor: "#2A2A3D",
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    cartItemImage: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    cartItemInfo: {
        marginLeft: 15,
        justifyContent: "space-between",
        flex: 1,
    },
    cartItemTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    cartItemPrice: {
        color: "#E94560",
        fontSize: 16,
        fontWeight: "bold",
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        color: "#E94560",
        fontSize: 24,
        marginHorizontal: 10,
        fontWeight: "bold",
    },
    quantityText: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    totalPrice: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    removeButton: {
        color: "#E94560",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    },
    buyButton: {
        backgroundColor: "#E94560",
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 30,
    },
    buyButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#9E9E9E",
    },
});
