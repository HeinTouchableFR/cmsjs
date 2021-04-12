module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'eslint:recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'linebreak-style': 'off',
        indent: ['error', 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-first-prop-new-line': ['error', 'never'],
        'react/jsx-max-props-per-line': [1, {
            maximum: 1,
        }],
        'function-paren-newline': ['error', 'never'],
        'one-var-declaration-per-line': ['error', 'always'],
        'object-property-newline': ['error', {
            allowAllPropertiesOnSameLine: false,
        }],
        'object-curly-newline': ['error', 'always'],
        'array-element-newline': ['error', 'consistent'],
    },
};
