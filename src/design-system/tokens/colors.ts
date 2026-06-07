export const colors = {
brand: {
primary: "#661093",
primaryHover: "#7A16AF",
primaryActive: "#4E0B74",

accent: "#D4AF37",
accentHover: "#E5C14D",
accentActive: "#B8942E",

},

neutral: {
0: "#FFFFFF",
50: "#FAFAFA",
100: "#F5F5F5",
200: "#E5E5E5",
300: "#D4D4D4",
400: "#A3A3A3",
500: "#737373",
600: "#525252",
700: "#404040",
800: "#262626",
900: "#171717",
950: "#0A0A0A",
},

semantic: {
success: "#16A34A",
warning: "#F59E0B",
error: "#DC2626",
info: "#2563EB",
},

background: {
primary: "#FFFFFF",
secondary: "#FAFAFA",
tertiary: "#F5F5F5",
inverse: "#0A0A0A",
},

surface: {
primary: "#FFFFFF",
secondary: "#FAFAFA",
elevated: "#FFFFFF",
overlay: "rgba(0,0,0,0.72)",
},

text: {
primary: "#171717",
secondary: "#525252",
tertiary: "#737373",
inverse: "#FFFFFF",
link: "#661093",
},

border: {
subtle: "#E5E5E5",
default: "#D4D4D4",
strong: "#A3A3A3",
},
} as const;

export type Colors = typeof colors;