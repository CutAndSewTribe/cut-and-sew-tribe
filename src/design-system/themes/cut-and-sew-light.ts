import { colors } from "../tokens/colors";

export const cutAndSewLightTheme = {
background: colors.background.primary,
surface: colors.surface.primary,

textPrimary: colors.text.primary,
textSecondary: colors.text.secondary,

primary: colors.brand.primary,
accent: colors.brand.accent,

border: colors.border.default,

success: colors.semantic.success,
warning: colors.semantic.warning,
error: colors.semantic.error,
info: colors.semantic.info,
} as const;
