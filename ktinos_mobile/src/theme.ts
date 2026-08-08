// Ktinoskare Brand Theme - React Native

export const theme = {
  colors: {
    primary: {
      deepPurple: '#6A1B9A',
      healthGreen: '#2ECC71',
      tealWellness: '#1ABC9C',
      softLavender: '#9B59B6',
    },
    neutral: {
      lightBg: '#F5F6F7',
      white: '#FFFFFF',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
    },
  },
  fonts: {
    heading: 'System',
    body: 'System',
  },
  fontWeights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
  },
} as const;

export type Theme = typeof theme;
