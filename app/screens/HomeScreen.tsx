import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Pressable,
    ListRenderItem,
    StatusBar,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useCart} from "@/app/context/CartContext";
import AnimatedButton from "@/app/animations/AnimatedButton"; // Импортируем иконки

interface Product {
    id: string;
    title: string;
    price: string;
    image: any;
}

interface News {
    id: string;
    title: string;
    image: any;
}

const featuredProducts: Product[] = [
    { id: "1", title: "Игровой ПК Raptor X", price: "120 000 ₽", image: require("../../assets/images/pc1.png") },
    { id: "2", title: "Мощный ПК Titan Pro", price: "180 000 ₽", image: require("../../assets/images/pc2.png") },
    { id: "3", title: "Эконом ПК Starter", price: "50 000 ₽", image: require("../../assets/images/pc3.png") },
];

const newsItems: News[] = [
    { id: "1", title: "Новый игровой процессор от Intel", image: require("../../assets/images/news1.jpg") },
    { id: "2", title: "Как выбрать ПК для игр в 2024 году", image: require("../../assets/images/news2.jpg") },
    { id: "3", title: "Тренды в игровой индустрии", image: require("../../assets/images/news3.jpg") },
];

export default function HomeScreen({ navigation }) {
    const { addToCart } = useCart();

    const renderProductCard = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <AnimatedButton onPress={() => addToCart(item)}>
                Купить
            </AnimatedButton>
        </View>
    );

    const renderNewsCard: ListRenderItem<News> = ({ item }) => (
        <View style={styles.newsCard}>
            <Image source={item.image} style={styles.newsImage} />
            <Text style={styles.newsTitle}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1E1E2F" />
            <View style={styles.banner}>
                <Text style={styles.bannerText}>Топовый ПК месяца</Text>
                <Image source={require("../../assets/images/banner.png")} style={styles.bannerImage} />
            </View>

            <Pressable onPress={() => navigation.navigate('Cart')} style={styles.cartIconContainer}>
                <Icon name="shopping-cart" size={30} color="white" />
            </Pressable>

            <Text style={styles.sectionTitle}>Хитовые продажи</Text>
            <FlatList
                data={featuredProducts}
                renderItem={renderProductCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
            />

            <Text style={styles.sectionTitle}>Новости о компьютерах и играх</Text>
            <FlatList
                data={newsItems}
                renderItem={renderNewsCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.newsList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B1B2F",
    },
    banner: {
        backgroundColor: "#E94560",
        borderRadius: 20,
        padding: 20,
        margin: 15,
        alignItems: "center",
    },
    bannerText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    bannerImage: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
    },
    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginVertical: 10,
    },
    productList: {
        paddingHorizontal: 15,
    },
    productCard: {
        backgroundColor: "#2A2A3D",
        borderRadius: 10,
        padding: 2,
        marginRight: 10,
        width: 150,
        height: 220,
        alignItems: "center"
    },
    productImage: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        marginBottom: 10,
    },
    productTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 5,
    },
    productPrice: {
        color: "#E94560",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    buyButton: {
        backgroundColor: "#E94560",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    buyButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },
    newsList: {
        paddingHorizontal: 15,
    },
    newsCard: {
        backgroundColor: "#2A2A3D",
        borderRadius: 10,
        padding: 15,
        marginRight: 10,
        width: 150,
        height: 200,
        justifyContent: "space-between",
    },
    newsImage: {
        width: "100%",
        height: 100,
        resizeMode: "cover",
        borderRadius: 10,
        marginBottom: 10,
    },
    newsTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cartIconContainer: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 1,
    }
});
