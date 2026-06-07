export const shadows = {
xs: "0 1px 2px rgba(0,0,0,0.05)",

sm: "0 2px 4px rgba(0,0,0,0.08)",

md: "0 4px 12px rgba(0,0,0,0.10)",

lg: "0 8px 24px rgba(0,0,0,0.12)",

xl: "0 16px 40px rgba(0,0,0,0.15)",

focus: "0 0 0 4px rgba(102,16,147,0.20)",

goldGlow: "0 0 20px rgba(212,175,55,0.25)",
} as const;

export type Shadows = typeof shadows;