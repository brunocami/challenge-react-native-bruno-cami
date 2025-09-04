export type PaymentMethod = {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;
    type: 'credit' | 'debit';
    bank: string;
};
