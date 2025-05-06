import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}", // ajustá si usás otros formatos
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        serif: ['"PT Serif"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
