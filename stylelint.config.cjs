module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier',
    ],
    rules: {
        'color-named': 'never', // Использование именованных цветов
        'no-empty-source': true, // Пустые строки внутри селекторов
        'selector-no-qualifying-type': true, // Одинаковые селекторы
        'selector-max-specificity': '0,4,1', // Специфичность селекторов
        'rule-empty-line-before': ['always', {
            except: ['first-nested'], // Исключение для первого вложенного селектора
            ignore: ['after-comment'], // Игнорирование пустых строк после комментариев
        }],
    },
};