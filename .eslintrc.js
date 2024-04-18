module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  parser: 'babel-eslint', // Añade el analizador de Babel si usas características de ES6+
  plugins: [
    'react', // Añade el plugin de React para reglas específicas de React
    'react-native', // Añade el plugin de React Native
  ],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
  settings: {
    react: {
      version: 'detect', // Le dice a eslint-plugin-react que detecte automáticamente la versión de React
    },
  },
};
