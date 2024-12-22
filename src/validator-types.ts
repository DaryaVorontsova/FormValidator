export type ValidationError = Record<string, unknown>;
export type ValidatorFunction<T> = (value: T) => ValidationError | null;
