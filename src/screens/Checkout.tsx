import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from '../types/Products';
import { getColors } from '../constants/colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import useCheckout from '../hooks/Checkout';
import CheckoutModal from '../components/CheckoutModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Tab';
import ChagePaymentMethodModal from '../components/ChagePaymentMethodModal';

const cardImages: Record<string, any> = {
    Mastercard: require('../assets/images/Mastercard.png'),
    Visa: require('../assets/images/Visa.png'),
};

export default function CheckoutScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const route = useRoute();
    const { item } = route.params as { item: Product };
    const { paymentMethod, changePaymentMethod } = useCheckout();
    const [isModalVisible, setModalVisible] = useState(false);
    const [
        isChangePaymentMethodModalVisible,
        setChangePaymentMethodModalVisible,
    ] = useState(false);

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <CheckoutModal
                status={'success'}
                visible={isModalVisible}
                onClose={() => {
                    setModalVisible(false);
                    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
                }}
            />
            <ChagePaymentMethodModal
                visible={isChangePaymentMethodModalVisible}
                onClose={() => setChangePaymentMethodModalVisible(false)}
                selectedMethod={paymentMethod}
                onSelect={method => {
                    changePaymentMethod(method);
                }}
            />

            <TouchableOpacity
                style={styles.goBackbtn}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <MaterialIcons name="cancel" size={24} color={colors.text} />
            </TouchableOpacity>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.itemInfoContainer}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Revisá y confirmá
                    </Text>

                    {item.image ? (
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.itemImage}
                            />
                        </View>
                    ) : null}

                    <Text style={[{ color: colors.text }]}>{item.title}</Text>
                    <View style={styles.itemPriceContainer}>
                        <Text style={[{ color: colors.text }]}>Subtotal</Text>
                        <Text style={[{ color: colors.text }]}>
                            $ {item.price}
                        </Text>
                    </View>
                </View>

                <View style={styles.paymentMethodContainer}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Método de pago
                    </Text>
                    <View style={styles.cardSelectedContainer}>
                        <Image
                            source={cardImages[paymentMethod.bank]}
                            style={[styles.cardSelectedImage]}
                        />
                        <View style={styles.cardSelectedContent}>
                            <Text
                                style={[
                                    styles.cardSelectedTitle,
                                    { color: colors.text },
                                ]}
                            >
                                {paymentMethod.type === 'credit'
                                    ? 'Crédito'
                                    : 'Débito'}
                                {paymentMethod.cardNumber
                                    ? ` *${paymentMethod.cardNumber.slice(-4)}`
                                    : ''}
                            </Text>
                            <Text style={[{ color: colors.text }]}>
                                {paymentMethod.cardHolderName.toUpperCase()}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.changePaymentBtn}
                            onPress={() => {
                                setChangePaymentMethodModalVisible(true);
                            }}
                        >
                            <MaterialIcons
                                name="compare-arrows"
                                size={24}
                                color={colors.text}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View
                style={[
                    styles.totalInfoContainer,
                    { backgroundColor: colors.background },
                ]}
            >
                <Text style={[styles.totalInfoText, { color: colors.text }]}>
                    Total
                </Text>
                <Text style={[styles.totalInfoText, { color: colors.text }]}>
                    $ {item.price}
                </Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.checkoutBtn,
                    { backgroundColor: colors.primary },
                ]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.checkoutBtnText}>Confirmar compra</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 140,
    },
    goBackbtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        marginVertical: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    itemInfoContainer: {
        padding: 16,
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    },
    itemImage: {
        width: '50%',
        aspectRatio: 1, // Mantiene la proporción cuadrada, ajusta según necesites
        resizeMode: 'contain',
    },
    itemPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    paymentMethodContainer: {
        padding: 16,
    },
    cardSelectedContainer: {
        padding: 12,
        borderRadius: 4,
        marginTop: 8,
        flexDirection: 'row',
        width: '100%',
    },
    cardSelectedImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        resizeMode: 'contain',
        backgroundColor: '#F5F5F5',
    },
    cardSelectedContent: {
        flex: 1,
    },
    cardSelectedTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    changePaymentBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        height: 140,
        flexDirection: 'row',
        justifyContent: 'space-between',
        boxShadow: '0 -5px 10px rgba(0, 0, 0, 0.1)',
    },
    totalInfoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkoutBtn: {
        position: 'absolute',
        bottom: 40,
        left: 16,
        right: 16,
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    checkoutBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
