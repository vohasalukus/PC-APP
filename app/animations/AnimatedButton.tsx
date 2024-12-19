import React, { useState } from 'react';
import { Animated, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';

interface AnimatedButtonProps {
    onPress: () => void;
    children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onPress, children }) => {
    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
        >
            <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
                <Text style={styles.buttonText}>{children}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#E94560",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default AnimatedButton;
