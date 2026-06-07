export const motion = {
duration: {
instant: "100ms",
fast: "200ms",
normal: "300ms",
slow: "500ms",
},

easing: {
standard: "cubic-bezier(0.4, 0, 0.2, 1)",
emphasized: "cubic-bezier(0.2, 0, 0, 1)",
},
} as const;

export type Motion = typeof motion;
