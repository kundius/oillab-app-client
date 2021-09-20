module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-custom-media': {
      importFrom: 'src/features/app/components/ThemeContext/custom-media.css'
    },
  },
}
