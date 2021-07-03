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
    'object-curly-newline': 'off',
    "import/extensions": "off",
    "no-restricted-imports": [
      'error',
      {
        "paths": [
          {
            "name": "react-native",
            "importNames": ["Button", "Text", "TextInput"],
            "message": "Please import the appropriate component from 'react-native-paper' instead."
          },
        ]
      }
    ],

    // TS Specific usage
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],

    'react/jsx-curly-newline': 'off',
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": 0,
    'react/require-default-props': 0,

    'react-hooks/exhaustive-deps': 'error',

    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': [
        2,
        {
          skip: ['Paragraph', 'Headline', 'Subheading', 'Caption', 'Title', 'Button'],
        },
      ],
    'react-native/no-single-element-style-arrays': 2,
    "react-native/no-color-literals": "off", // consider
  },
  globals: {
    fetch: false
  }
};