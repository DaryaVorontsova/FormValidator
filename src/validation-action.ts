import '../public/style.css';

import { FormValidator } from '../src/form-validator';
import {
    isNotEmpty,
    isCardNumberValid,
    validateExpirationDateFormat,
    isSecurityCodeValid,
} from '../src/form-functions';

const validator = new FormValidator({
    name: isNotEmpty,
    number: [isNotEmpty, isCardNumberValid],
    date: [isNotEmpty, validateExpirationDateFormat],
    code: [isNotEmpty, isSecurityCodeValid],
});

const form = document.querySelector('form');
const cardHolderField = document.querySelector(
    'input[placeholder="Имя владельца карты"]'
) as HTMLInputElement;
const cardNumberField = document.querySelector(
    'input[placeholder="Номер карты"]'
) as HTMLInputElement;
const expirationDateField = document.querySelector(
    'input[placeholder="Срок"]'
) as HTMLInputElement;
const securityCodeField = document.querySelector(
    'input[placeholder="Код"]'
) as HTMLInputElement;

const nameOwnerError = document.getElementById('fieldName');
const numberOwnerError = document.getElementById('fieldNumber');
const dateOwnerError = document.getElementById('fieldDate');
const codeOwnerError = document.getElementById('fieldCode');

const afterAll = document.getElementById('successful') as HTMLDivElement;
const paymentContainers = document.querySelectorAll(
    '.payment-container'
) as NodeListOf<HTMLElement>;

const addClearErrorListeners = (
    field: HTMLInputElement,
    errorElement: HTMLElement
) => {
    field.addEventListener('input', () => {
        errorElement.textContent = '';
    });
};

addClearErrorListeners(cardHolderField, nameOwnerError!);
addClearErrorListeners(cardNumberField, numberOwnerError!);
addClearErrorListeners(expirationDateField, dateOwnerError!);
addClearErrorListeners(securityCodeField, codeOwnerError!);

form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
        name: cardHolderField.value,
        number: cardNumberField.value,
        date: expirationDateField.value,
        code: securityCodeField.value,
    };

    const errors = validator.validate(data);
    console.log(errors);

    nameOwnerError!.textContent = '';
    numberOwnerError!.textContent = '';
    dateOwnerError!.textContent = '';
    codeOwnerError!.textContent = '';

    if (errors) {
        if (errors.name) {
            console.log('name ', errors.name);
            nameOwnerError!.textContent = Object.values(errors.name).join(', ');
        }
        if (errors.number) {
            console.log('number ', errors.number);
            numberOwnerError!.textContent = Object.values(errors.number).join(
                ', '
            );
        }
        if (errors.date) {
            console.log('date ', errors.date);
            dateOwnerError!.textContent = Object.values(errors.date).join(', ');
        }
        if (errors.code) {
            console.log('code ', errors.code);
            codeOwnerError!.textContent = Object.values(errors.code).join(', ');
        }
    } else {
        paymentContainers.forEach(
            (container) => (container.style.display = 'none')
        );
        afterAll.style.display = 'block';
    }
});
