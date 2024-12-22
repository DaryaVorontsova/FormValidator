import { ValidationError } from './validator-types';

export const nonEmptyArray = (value: unknown): ValidationError | null => {
    if (!Array.isArray(value)) {
        return { nonEmptyArray: 'Value is not an array' };
    }
    return value.length ? null : { nonEmptyArray: true };
};

export const requiredText = (value: string): ValidationError | null => {
    return value.trim().length ? null : { requiredText: true };
};

export const maxLength = (maxLength: number) => {
    return (value: string): ValidationError | null => {
        return value.length <= maxLength
            ? null
            : {
                  maxLength: {
                      limitLength: maxLength,
                      actualLength: value.length,
                  },
              };
    };
};
