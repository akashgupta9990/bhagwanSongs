import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FontSettings {
  fontSize: string;
  fontStyle: string;
}

export const fontSizeOptions = [
  { label: 'Small', value: 'small', size: 14 },
  { label: 'Medium', value: 'medium', size: 16 },
  { label: 'Large', value: 'large', size: 18 },
  { label: 'Extra Large', value: 'xl', size: 20 },
  { label: 'XXL', value: 'xxl', size: 24 }
];

export const fontStyleOptions = [
  { label: 'Default', value: 'default', fontFamily: 'System' },
  { label: 'Serif', value: 'serif', fontFamily: 'serif' },
  { label: 'Monospace', value: 'monospace', fontFamily: 'monospace' },
  { label: 'Sans Serif', value: 'sans-serif', fontFamily: 'sans-serif' }
];

export const getFontSize = (sizeValue: string): number => {
  const option = fontSizeOptions.find(opt => opt.value === sizeValue);
  return option ? option.size : 16; // Default to medium
};

export const getFontFamily = (styleValue: string): string => {
  const option = fontStyleOptions.find(opt => opt.value === styleValue);
  return option ? option.fontFamily : 'System'; // Default to system
};

export const loadFontSettings = async (): Promise<FontSettings> => {
  try {
    const fontSize = await AsyncStorage.getItem('fontSize') || 'medium';
    const fontStyle = await AsyncStorage.getItem('fontStyle') || 'default';
    return { fontSize, fontStyle };
  } catch (error) {
    console.error('Error loading font settings:', error);
    return { fontSize: 'medium', fontStyle: 'default' };
  }
};

export const getFontStyles = (fontSize: string, fontStyle: string) => {
  return {
    fontSize: getFontSize(fontSize),
    fontFamily: getFontFamily(fontStyle)
  };
};

// Predefined text style multipliers for different text types
export const getTextStyles = (fontSize: string, fontStyle: string) => {
  const baseSize = getFontSize(fontSize);
  const fontFamily = getFontFamily(fontStyle);

  return {
    // Main text styles
    body: {
      fontSize: baseSize,
      fontFamily: fontFamily
    },
    small: {
      fontSize: baseSize * 0.875, // 14px if base is 16px
      fontFamily: fontFamily
    },
    large: {
      fontSize: baseSize * 1.125, // 18px if base is 16px
      fontFamily: fontFamily
    },
    // Header styles
    h1: {
      fontSize: baseSize * 1.75, // 28px if base is 16px
      fontFamily: fontFamily
    },
    h2: {
      fontSize: baseSize * 1.5, // 24px if base is 16px
      fontFamily: fontFamily
    },
    h3: {
      fontSize: baseSize * 1.25, // 20px if base is 16px
      fontFamily: fontFamily
    },
    // Special styles
    title: {
      fontSize: baseSize * 1.375, // 22px if base is 16px
      fontFamily: fontFamily
    },
    subtitle: {
      fontSize: baseSize * 1.125, // 18px if base is 16px
      fontFamily: fontFamily
    },
    caption: {
      fontSize: baseSize * 0.75, // 12px if base is 16px
      fontFamily: fontFamily
    }
  };
};
