module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint-config-airbnb-base'],
  rules: {
    'no-underscore-dangle': 'off',
    'no-restricted-properties': 'off',
    'prefer-destructuring': 'off',
    'no-param-reassign': 'off',
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'no-continue': 'off',
  },
};
