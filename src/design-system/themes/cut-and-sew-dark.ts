import { colors } from "../tokens/colors";

export const cutAndSewDarkTheme = {
  background: {
    canvas: colors.neutral[950],
    subtle: colors.neutral[900],
    muted: colors.neutral[800],
  },

  surface: {
    primary: colors.neutral[900],
    secondary: colors.neutral[800],
    tertiary: colors.neutral[700],
    elevated: colors.neutral[900],
  },

  text: {
    primary: colors.neutral[0],
    secondary: colors.neutral[300],
    tertiary: colors.neutral[400],
    inverse: colors.text.primary,
    link: "#B983FF",
    linkHover: "#D2A8FF",
  },

  border: {
    subtle: colors.neutral[800],
    default: colors.neutral[700],
    strong: colors.neutral[600],
  },

  brand: {
    primary: colors.brand.primary,
    primaryHover: colors.brand.primaryHover,
    primaryActive: colors.brand.primaryActive,

    accent: colors.brand.accent,
    accentHover: colors.brand.accentHover,
    accentActive: colors.brand.accentActive,
  },

  focus: {
    ring: "#B983FF",
    offset: colors.neutral[950],
  },

  semantic: colors.semantic,

  course: colors.course,
} as const;

export type CutAndSewDarkTheme = typeof cutAndSewDarkTheme;

