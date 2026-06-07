export const typography = {
fontFamily: {
heading: "'Playfair Display', serif",
body: "'Inter', sans-serif",
},

fontSize: {
xs: "0.75rem",
sm: "0.875rem",
base: "1rem",
lg: "1.125rem",
xl: "1.25rem",
"2xl": "1.5rem",
"3xl": "1.875rem",
"4xl": "2.25rem",
"5xl": "3rem",
"6xl": "3.75rem",
},

fontWeight: {
regular: 400,
medium: 500,
semibold: 600,
bold: 700,
},

lineHeight: {
tight: 1.2,
normal: 1.5,
relaxed: 1.75,
},

letterSpacing: {
tight: "-0.02em",
normal: "0",
wide: "0.03em",
},
} as const;

export type Typography = typeof typography;
