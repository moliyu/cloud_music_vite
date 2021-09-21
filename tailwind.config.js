const space = {
  sideBar: 'calc(100vh - 50px)',
  content: 'calc(100% - 200px)',
  contenth: 'calc(100vh - 100px)'
}
for (let i = 0; i < 400; i++) {
  space[i + 'px'] = i + 'px'
}
module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: { 
        DEFAULT: '#D23931',
        light: '#F14B3E',
        weight: '#D64238'
      },
      sideBar: '#EDEDEE',
      gray: {
        DEFAULT: '#E9E9E9',
        light: '#F9F9F9',
        text: '#646464'
      },
      black: {
        DEFAULT: '#333333'
      },
      link: '#507DAF',
      white: '#ffffff'
    },
    extend: {
      width: space,
      height: space,
      padding: space,
      margin: space,
      borderRadius: space,
      lineHeight: space
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus']
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
