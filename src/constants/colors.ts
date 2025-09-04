import { ColorSchemeName } from 'react-native';

// Light
const light = {
  background: '#FFFFFF',
  text: '#000000',
  textSecondary: '#AAAAAA',
  primary: '#0066CC',
  secondary: '#FF6600',
  border: '#E0E0E0',
  card: '#F5F5F5',
  error: '#FF4444'
};

// Dark
const dark = {
  background: '#000000',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  primary: '#3399FF',
  secondary: '#FF8844',
  border: '#444444',
  card: '#1E1E1E',
  error: '#FF4444',
};

export const getColors = (scheme: ColorSchemeName) => {
  return scheme === 'dark' ? dark : light;
};
