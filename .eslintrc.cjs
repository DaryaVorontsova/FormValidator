module.exports =  {
    env: {
        browser: true,
        es2021: true,
    },

    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended'
    ],

    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },

    plugins: [
        'prettier',
    ],

    rules: {
        'no-unused-vars': 'error', // Неиспользуемые переменные
        'object-shorthand': ['error', 'always'], // Использование сокращенного синтаксиса для объектов
        'curly': ['error', 'all'], // Фигурные скобки в if
        'no-undef': 'error', // Переопределение переменных. Использование несуществующих переменных
        'no-redeclare': 'error', // Переопределение переменных. Дублирование объявлений переменных
        'quotes': ['error', 'single'], // Одинарные кавычки
        'keyword-spacing': ['error', { // Проверка пробелов после ключевых слов
            'before': true,
            'after': true,
            'overrides': {
                'if': { 'after': true },
                'for': { 'after': true },
                'while': { 'after': true },
                'switch': { 'after': true },
                'catch': { 'after': true },
            },
        }],
        'no-implicit-coercion': 'error', // Использование == вместо ===
        'no-unreachable': 'error', // Недостижимый код
        'prefer-const': ['error', {
            destructuring: 'all', 
            ignoreReadBeforeAssign: false
        }], // Использовать const, если значение переменной не меняется

        "prettier/prettier": "error", // обеспечивает соблюдение правил Prettier.
    },

}