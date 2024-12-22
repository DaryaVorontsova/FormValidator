import { ValidationError } from './validator-types';
import { ValidatorFunction } from './validator-types';

export class FormValidator<T extends Record<string, unknown>> {
    private validationRules: { [K in keyof T]: ValidatorFunction<T[K]>[] };

    constructor(configuration: {
        [K in keyof T]: ValidatorFunction<T[K]> | ValidatorFunction<T[K]>[];
    }) {
        if (!this.isValidConfiguration(configuration)) {
            throw new Error(
                'Configuration must be a non-empty object containing validator functions'
            );
        }

        this.validationRules = {} as {
            [K in keyof T]: ValidatorFunction<T[K]>[];
        };

        for (const key in configuration) {
            if (configuration.hasOwnProperty(key)) {
                const rule = configuration[key as keyof T];
                this.validationRules[key as keyof T] = Array.isArray(rule)
                    ? rule
                    : [rule];
            }
        }
    }

    private isValidConfiguration(configuration: {
        [K in keyof T]: ValidatorFunction<T[K]> | ValidatorFunction<T[K]>[];
    }): boolean {
        if (typeof configuration !== 'object' || configuration === null) {
            return false;
        }
        return (Object.keys(configuration) as Array<keyof T>).every((key) => {
            const rule = configuration[key];
            return (
                typeof rule === 'function' ||
                (Array.isArray(rule) &&
                    rule.every((fn) => typeof fn === 'function'))
            );
        });
    }

    public validate(data: T): Record<string, ValidationError> | null {
        const errors: Record<string, ValidationError> = {};

        for (const fieldName in this.validationRules) {
            if (this.validationRules.hasOwnProperty(fieldName)) {
                const fieldValue = data[fieldName as keyof T];
                const validators = this.validationRules[fieldName as keyof T];

                const composeValidator = this.composeValidators(...validators);
                const error = composeValidator(fieldValue);

                if (error) {
                    errors[fieldName] = error;
                }
            }
        }

        return Object.keys(errors).length > 0 ? errors : null;
    }

    private composeValidators<K extends keyof T>(
        ...validators: ValidatorFunction<T[K]>[]
    ): ValidatorFunction<T[K]> {
        return (value: T[K]) => {
            const allErrors: ValidationError = {};
    
            for (const validator of validators) {
                const error = validator(value);
                if (error) {
                    Object.assign(allErrors, error);
                }
            }
            return Object.keys(allErrors).length > 0 ? allErrors : null;
        };
    }
}
