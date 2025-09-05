import { useState } from 'react';
import { PaymentMethod } from '../types/checkout';
import PAYMENT_METHODS from '../assets/payment_methods.json';

type UseProductsReturn = {
    paymentMethod: PaymentMethod;
    changePaymentMethod: (newMethod: PaymentMethod) => void;
};

const useCheckout = (): UseProductsReturn => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
        PAYMENT_METHODS[0] as PaymentMethod,
    );

    const changePaymentMethod = (newMethod: PaymentMethod) => {
        setPaymentMethod(newMethod);
    };

    return { paymentMethod, changePaymentMethod };
};

export default useCheckout;
