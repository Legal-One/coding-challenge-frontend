module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  settings: {
    "import/resolver": {
      node: {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      alias: {
        "map" : [
          ["@components","./src/components/*"]
          ["@","./src/*"]
        ],
        "extensions": [".vue"]
      },
    }
  },
};
