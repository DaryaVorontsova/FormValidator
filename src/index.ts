import { FormValidator } from '../src/form-validator';
import { maxLength, nonEmptyArray, requiredText } from '../src/validators';

const validator = new FormValidator({
    field1: nonEmptyArray,
    field2: requiredText,
    field3: [requiredText, maxLength(10)],
    field4: [requiredText, maxLength(20)],
});

const validatorNew = new FormValidator({
    field1: nonEmptyArray,
    field2: requiredText,
    field3: [requiredText, maxLength(10)],
    field4: [requiredText, maxLength(15)],
});

const dataToValidate = {
    field1: ['field1', 'field1'],
    field2: 'field2',
    field3: 'field3',
    field4: 'field4',
};

const dataToValidateNew = {
    field1: [],
    field2: '',
    field3: 'Short',
    field4: 'This is definitely too long for the limit',
};

const errors = validator.validate(dataToValidate);
const errorsNew = validatorNew.validate(dataToValidateNew);

console.log(errors);
console.log(errorsNew);
