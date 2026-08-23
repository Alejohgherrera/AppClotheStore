export const colors = {
  background: '#10141A',
  surface: '#1C2229',
  surfaceRaised: '#232B36',

  textPrimary: '#F4F6F9',
  textSecondary: '#9AA9BB',
  textDisabled: '#5C6875',

  border: '#2A3340',
  borderStrong: '#3A4757',

  accent: '#A5C3FA',
  onAccent: '#10141A',

  interactive: {
    default: '#A5C3FA',
    pressed: '#7FA3EC',
    active: '#C7D9FE',
    disabled: '#3E4A5C',
  },
};

export const typography = {
  heading: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  highlight: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
};

const theme = {
  colors,
  typography,
  spacing,
  radius,
};

export default theme;
