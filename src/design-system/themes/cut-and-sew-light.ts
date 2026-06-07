import { colors } from "../tokens/colors";

export const cutAndSewLightTheme = {
  background: {
    canvas: colors.background.canvas,
    subtle: colors.background.subtle,
    muted: colors.background.muted,
  },

  surface: {
    primary: colors.surface.primary,
    secondary: colors.surface.secondary,
    tertiary: colors.surface.tertiary,
    elevated: colors.surface.elevated,
  },

  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    tertiary: colors.text.tertiary,
    inverse: colors.text.inverse,
    link: colors.text.link,
    linkHover: colors.text.linkHover,
  },

  border: {
    subtle: colors.border.subtle,
    default: colors.border.default,
    strong: colors.border.strong,
  },

  brand: {
    primary: colors.brand.primary,
    primaryHover: colors.brand.primaryHover,
    primaryActive: colors.brand.primaryActive,

    accent: colors.brand.accent,
    accentHover: colors.brand.accentHover,
    accentActive: colors.brand.accentActive,
  },

  focus: colors.focus,

  semantic: colors.semantic,

  course: colors.course,
} as const;

export type CutAndSewLightTheme = typeof cutAndSewLightTheme;

