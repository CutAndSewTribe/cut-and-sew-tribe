import { colors } from "../tokens/colors";

export const cutAndSewDarkTheme = {
background: colors.neutral[950],
surface: colors.neutral[900],

textPrimary: colors.neutral[0],
textSecondary: colors.neutral[300],

primary: colors.brand.primary,
accent: colors.brand.accent,

border: colors.neutral[800],

success: colors.semantic.success,
warning: colors.semantic.warning,
error: colors.semantic.error,
info: colors.semantic.info,
} as const;
