'use client';
import React, { useEffect, useState } from 'react';
import { createTheme, PaletteMode, PaletteOptions, ThemeProvider } from '@mui/material';
import { responsiveFontSizes } from '../utils/getFontValue';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

declare module '@mui/material/styles' {
  interface Palette {
    customBlue: Palette['primary'];
    customGray: Palette['primary'];
    customBlack: Palette['primary'];
  }
  interface PaletteOptions {
    customBlue: PaletteOptions['primary'];
    customGray: PaletteOptions['primary'];
    customBlack: PaletteOptions['primary'];
  }
}

function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('dark');

  // Initial theme configuration
  const initialTheme = createTheme({
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      mode: mode,
      customBlue: {
        main: '#3A3F5D',
        light: '#f4f7fe',
        dark: '#1B2559 ',
        contrastText: '#FFF',
      },
      customGray: {
        main: '#797979',
        dark: '#5C5C5C ',
        light: '#D2D2D2',
        contrastText: '#FFF',
      },
      customBlack: {
        main: '#000',
        contrastText: '#FFF',
      },
      primary: {
        main: '#8842FF',
        contrastText: '#FFF',
      },
      secondary: {
        main: '#15CEDA',
        contrastText: '#FFF',
      },
      success: {
        main: '#4caf50',
        contrastText: '#FFF',
      },
      warning: {
        main: '#ed6c02',
        contrastText: '#FFF',
      },
      info: {
        main: '#102042',
        dark: '#252B4D',
        light: '#3A3F5D',
        contrastText: '#FFF',
      },
      error: {
        main: '#ef3d18',
        contrastText: '#FFF',
      },
      action: {
        disabled: '#FFF',
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontWeight: 700,
        lineHeight: 80 / 64,
        fontSize: 40,
        letterSpacing: 2,
        ...responsiveFontSizes({ sm: 3.25, md: 3.625, lg: 4 }),
      },
      h2: {
        fontWeight: 700,
        lineHeight: 64 / 48,
        fontSize: 32,
        ...responsiveFontSizes({ sm: 2.5, md: 2.75, lg: 3 }),
      },
      h3: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: 24,
        ...responsiveFontSizes({ sm: 1.625, md: 1.875, lg: 2 }),
      },
      h4: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: 20,
        ...responsiveFontSizes({ sm: 1.25, md: 1.5, lg: 1.5 }),
      },
      h5: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: 18,
        ...responsiveFontSizes({ sm: 1.118, md: 1.25, lg: 1.25 }),
      },
      h6: {
        fontWeight: 700,
        lineHeight: 28 / 18,
        fontSize: 17,
        ...responsiveFontSizes({ sm: 1.125, md: 1.125, lg: 1.125 }),
      },
      subtitle1: {
        fontWeight: 600,
        lineHeight: 1.5,
        fontSize: 14,
        ...responsiveFontSizes({ sm: 0.75, md: 0.875, lg: 0.875 }),
      },
      subtitle2: {
        fontWeight: 700,
        lineHeight: 22 / 14,
        fontSize: 12,
        ...responsiveFontSizes({ sm: 0.75, md: 0.75, lg: 0.75 }),
      },
      body1: {
        lineHeight: 1.5,
        fontSize: 16,
      },
      body2: {
        lineHeight: 22 / 14,
        fontSize: 14,
        fontWeight: 600,
      },
      caption: {
        lineHeight: 1.5,
        fontSize: 12,
        fontWeight: 600,
        ...responsiveFontSizes({ sm: 0.625, md: 0.75, lg: 0.875 }),
      },
      overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: 12,
        textTransform: 'uppercase',
      },
      button: {
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: 14,
        letterSpacing: '0.02857em',
        textTransform: 'none',
      },
    },
    components: {
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#3A3F5D' : '#fff', // Set background color based on theme mode
            color: mode === 'dark' ? '#fff' : '#3A3F5D',
          },
        },
      },
      MuiInputLabel: {
        variants: [
          {
            props: {},
            style: {
              color: '#ACACAC',
              fontSize: 12,
              opacity: 0.8,
              fontWeight: 300,
            },
          },
          {
            props: { shrink: true },
            style: {
              color: '#E6E6E6',
              opacity: 1,
            },
          },
        ],
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            margin: 0,
          },
        },
      },
    },
  });

  // Declare the 'theme' variable and apply the custom button styles
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Check for dark mode preference on the client side
    setTheme((prevTheme) =>
      createTheme({
        ...prevTheme,
        palette: {
          ...prevTheme.palette,
          mode: mode,
        },
        components: {
          ...prevTheme.components,
        },
      }),
    );
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={{ toggleColorMode: toggleTheme }}>{children}</ColorModeContext.Provider>
    </ThemeProvider>
  );
}

export default AppThemeProvider;
