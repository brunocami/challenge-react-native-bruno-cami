import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { PAYMENT_METHODS } from '../constants/paymentMethods';
import { PaymentMethod } from '../types/checkout';

interface ChagePaymentMethodModalProps {
    visible: boolean;
    onClose: () => void;
    selectedMethod: PaymentMethod;
    onSelect: (method: PaymentMethod) => void;
}

const ChagePaymentMethodModal = ({
    visible,
    onClose,
    selectedMethod,
    onSelect,
}: ChagePaymentMethodModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Cambiar método de pago</Text>
                    <FlatList
                        data={PAYMENT_METHODS}
                        keyExtractor={item => item.cardNumber}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => {
                            const isSelected =
                                item.cardNumber === selectedMethod.cardNumber;
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.methodItem,
                                        isSelected && styles.selectedMethod,
                                    ]}
                                    onPress={() => {
                                        onSelect(item);
                                        onClose();
                                    }}
                                >
                                    <View style={styles.methodItemContainer}>
                                        <View
                                            style={styles.selectedIconContainer}
                                        >
                                            {isSelected && (
                                                <View
                                                    style={styles.selectedIcon}
                                                >
                                                    <View
                                                        style={
                                                            styles.selectedIconInner
                                                        }
                                                    />
                                                </View>
                                            )}
                                            {!isSelected && (
                                                <View
                                                    style={
                                                        styles.unselectedIcon
                                                    }
                                                />
                                            )}
                                        </View>

                                        <View
                                            style={styles.methodInfoContainer}
                                        >
                                            <View style={styles.methodHeader}>
                                                <Text style={styles.methodText}>
                                                    {item.bank}
                                                </Text>
                                                <Text style={styles.methodText}>
                                                    *{item.cardNumber.slice(-4)}
                                                </Text>
                                            </View>
                                            <View style={styles.methodHeader}>
                                                <Text style={styles.methodText}>
                                                    {item.cardHolderName}
                                                </Text>
                                                <Text style={styles.methodText}>
                                                    {item.expirationDate}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Cerrar</Text>
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
    listContent: {
        width: 1000,
        maxWidth: '100%',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 24,
        alignItems: 'center',
        width: '90%',
        maxHeight: '70%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    methodItem: {
        padding: 14,
        borderRadius: 6,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        width: '100%',
    },
    methodItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedIconContainer: {
        width: '10%',
    },
    selectedIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0066CC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    selectedIconInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0066CC',
    },
    unselectedIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 12,
    },
    methodInfoContainer: {
        width: '90%',
    },
    methodHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
        width: '100%',
    },
    selectedMethod: {
        backgroundColor: '#cce5ff',
    },
    methodText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 18,
        backgroundColor: '#0066CC',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ChagePaymentMethodModal;
