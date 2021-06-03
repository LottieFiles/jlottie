/**
 * Copyright 2021 Design Barn Inc.
 */

module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --ignore-pattern "/src/jlottie.js"', 'prettier --write'],
  '*.{json,md,html,css}': 'prettier --write',
};
