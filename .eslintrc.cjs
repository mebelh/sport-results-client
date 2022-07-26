module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'prettier',
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [2, { 'extensions': ['.ts', '.tsx'] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 'off',
    'no-bitwise': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-plusplus': 'off',
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["src"],
      }
    }
  }
};
