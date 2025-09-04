import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';
import { getColors } from '../constants/colors';

interface CheckoutModalProps {
    visible: boolean;
    onClose: () => void;
    status: 'success' | 'error';
}

const statusMessages = {
    success: {
        title: '¡Felicitaciones!',
        message:
            'Tu compra se realizó con éxito. Pronto recibirás un correo con los detalles.',
        buttonText: 'Cerrar',
    },
    error: {
        title: '¡Error!',
        message:
            'Hubo un problema con tu compra. Por favor, inténtalo de nuevo más tarde.',
        buttonText: 'Reintentar',
    },
};

export const CheckoutModal = ({
    visible,
    onClose,
    status,
}: CheckoutModalProps) => {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={[styles.overlay]}>
                <View
                    style={[
                        styles.modalContent,
                        { backgroundColor: colors.card },
                    ]}
                >
                    <Text style={[styles.title, { color: colors.primary }]}>
                        {statusMessages[status].title}
                    </Text>
                    <Text style={[styles.message, { color: colors.text }]}>
                        {statusMessages[status].message}
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: colors.primary },
                        ]}
                        onPress={onClose}
                    >
                        <Text style={[styles.buttonText]}>
                            {statusMessages[status].buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 24,
        alignItems: 'center',
        width: '80%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#2ecc71',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#2ecc71',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CheckoutModal;
