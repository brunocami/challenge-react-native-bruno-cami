import { PaymentMethod } from "../types/checkout";

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        cardNumber: '4111111111111111',
        expirationDate: '12/25',
        cvv: '123',
        cardHolderName: 'John Doe',
        type: 'credit',
        bank: 'Mastercard',
    },
    {
        cardNumber: '5500000000000004',
        expirationDate: '11/24',
        cvv: '456',
        type: 'debit',
        cardHolderName: 'Jane Smith',
        bank: 'Visa',
    },
];
