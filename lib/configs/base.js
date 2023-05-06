/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ['pit'],
  rules: {
    'pit/columns-order': 'off',
    'pit/columns-show-overflow': ['warn'],
    'pit/form-base-request-interface': ['warn'],
  }
}
