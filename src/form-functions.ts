import { ValidationError } from './validator-types';

export const isNotEmpty = (value: string): ValidationError | null => {
    return value.trim() === ''
        ? { emptyField: 'Поле не может быть пустым' }
        : null;
};

export const isCardNumberValid = (value: string): ValidationError | null => {
    const cardNumberPattern = /^\d{16}$/;
    return !cardNumberPattern.test(value)
        ? { cardNumber: 'Неверный номер карты' }
        : null;
};

export const validateExpirationDateFormat = (
    value: string
): ValidationError | null => {
    const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return !datePattern.test(value)
        ? { expirationDate: 'Неверный срок действия карты' }
        : null;
};

export const isSecurityCodeValid = (value: string): ValidationError | null => {
    const codePattern = /^\d{3}$/;
    return !codePattern.test(value) ? { securityCode: 'Неверный код' } : null;
};
