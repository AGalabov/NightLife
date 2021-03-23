module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    "@typescript-eslint",
    'prettier'
  ],
  parser: "@typescript-eslint/parser",
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'object-curly-newline': 'off',
    'react/jsx-curly-newline': 'off',
    "import/extensions": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": 0,


    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",

    "react-native/no-color-literals": "off", // consider
    "react-native/no-inline-styles": "off" // enable later
  },
  globals: {
    fetch: false
  }
};