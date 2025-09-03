import { ColorSchemeName } from 'react-native';

// Light palette
const light = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#0066CC',
  secondary: '#FF6600',
  border: '#E0E0E0',
};

// Dark palette
const dark = {
  background: '#000000',
  text: '#FFFFFF',
  primary: '#3399FF',
  secondary: '#FF8844',
  border: '#333333',
};

// Helper to select palette based on scheme
export const getColors = (scheme: ColorSchemeName) => {
  return scheme === 'dark' ? dark : light;
};
