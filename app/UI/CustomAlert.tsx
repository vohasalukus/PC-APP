import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';

interface CustomAlertProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, message, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.message}>{message}</Text>
                    <Pressable style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Закрыть</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
    },
    modal: {
        backgroundColor: '#1B1B2F',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    message: {
        color: '#E94560',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#E94560',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomAlert;
