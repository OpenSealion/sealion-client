module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        eqeqeq: ['error', 'allow-null'],
        'prefer-const': 'warn',
        'array-callback-return': 'warn',
        'template-curly-spacing': 'off',
        'prefer-destructuring': 'off',
        'guard-for-in': 'warn',
        camelcase: ['warn'],
        'import/prefer-default-export': 'off',
        'no-useless-escape': 'warn',
        'no-unused-expressions': 'warn',
        'no-restricted-syntax': 'off',
        'max-len': ['warn', {
            code: 200
        }],
        'no-shadow': ['warn'],
        indent: ['error', 4, {
            ignoredNodes: ['TemplateLiteral']
        }],
        'no-proto': 'error',
        'no-unused-vars': 'warn',
        'class-methods-use-this': 'warn',
        'prefer-promise-reject-errors': 'warn',
        'object-shorthand': 'warn',
        semi: ['warn', 'always', { omitLastInOneLineBlock: true }]
    }
}
