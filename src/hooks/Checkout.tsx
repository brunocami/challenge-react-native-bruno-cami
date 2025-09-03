import { useState } from 'react';
import { PaymentMethod } from '../types/checkout';
import { PAYMENT_METHODS } from '../constants/paymentMethods';

type UseProductsReturn = {
    paymentMethod: PaymentMethod;
    changePaymentMethod: (newMethod: PaymentMethod) => void;
};

const useCheckout = (): UseProductsReturn => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
        PAYMENT_METHODS[0],
    );

    const changePaymentMethod = (newMethod: PaymentMethod) => {
        setPaymentMethod(newMethod);
    };

    return { paymentMethod, changePaymentMethod };
};

export default useCheckout;
