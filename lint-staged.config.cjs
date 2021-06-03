/**
 * Copyright 2021 Design Barn Inc.
 */

module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,html,css}': 'prettier --write',
};
