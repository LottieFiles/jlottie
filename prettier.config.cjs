module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  printWidth: 120,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,

  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
      },
    },

    {
      files: ['*.html'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
