import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadFontSettings, getTextStyles, FontSettings } from '../utils/fontSettings';

interface FontContextType {
  fontSettings: FontSettings;
  textStyles: ReturnType<typeof getTextStyles>;
  refreshFontSettings: () => Promise<void>;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    fontSize: 'medium',
    fontStyle: 'default'
  });

  const [textStyles, setTextStyles] = useState(() =>
    getTextStyles('medium', 'default')
  );

  const refreshFontSettings = async () => {
    const settings = await loadFontSettings();
    setFontSettings(settings);
    setTextStyles(getTextStyles(settings.fontSize, settings.fontStyle));
  };

  useEffect(() => {
    refreshFontSettings();
  }, []);

  return (
    <FontContext.Provider value={{ fontSettings, textStyles, refreshFontSettings }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontSettings = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFontSettings must be used within a FontProvider');
  }
  return context;
};
