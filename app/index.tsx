import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './context/CartContext';
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";


type RootTabParamList = {
    Home: undefined;
    Profile: undefined;
    Cart: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootTabParamList>(); // Применяем типизацию к Tab

const AppTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveBackgroundColor: "#E94560",
                tabBarIcon: ({ color, size }) => {
                    let iconName: 'home-outline' | 'person-outline' | 'cart-outline';
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }  else if (route.name === 'Cart') {
                        iconName = 'cart-outline';
                    }
                    else {
                        iconName = 'home-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2f95dc',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#1B1B2F',
                    borderColor: "#1B1B2F",
                    elevation: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
            <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
    );
};

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <CartProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Screen name="Auth">
                        {(props) => <AuthScreen {...props} onLoginSuccess={handleLoginSuccess} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Tabs" component={AppTabs} />
                )}
            </Stack.Navigator>
        </CartProvider>
    );
}
