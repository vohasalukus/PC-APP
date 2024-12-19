import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';

const ProfileScreen = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState('Иван Иванов');
    const [updatedEmail, setUpdatedEmail] = useState('ivan@example.com');

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1E1E2F" barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'} />
            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.infoContainer}>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={updatedName}
                                onChangeText={setUpdatedName}
                                placeholder="Введите имя"
                                placeholderTextColor="#888"
                            />
                            <TextInput
                                style={styles.input}
                                value={updatedEmail}
                                onChangeText={setUpdatedEmail}
                                placeholder="Введите email"
                                placeholderTextColor="#888"
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Сохранить</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.text}>Имя: {updatedName}</Text>
                            <Text style={styles.text}>Email: {updatedEmail}</Text>
                            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                                <Text style={styles.editButtonText}>Редактировать</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1B2F',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profileCard: {
        width: '90%',
        padding: 20,
        backgroundColor: '#2A2A3D',
        borderRadius: 15,
        shadowColor: '#E94560',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#E94560',
        overflow: 'hidden',
        marginBottom: 20,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#FFFFFF',
        marginVertical: 5,
        fontFamily: 'monospace',
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: '#3C3C4E',
        color: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderColor: '#E94560',
        borderWidth: 1,
    },
    editButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#E94560',
        borderRadius: 8,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#1E90FF',
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
