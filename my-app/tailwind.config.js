
module.exports = {
  mode:'jit',
  purge:[
    './src/**/*.{js,ts,jsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './_components/**/*.{js,jsx,ts,tsx}',
    './globals.css', 
    './app/**/*.{js,ts,jsx,tsx}',
  ]
  ,
  theme: {
    extend: {},
  },
  variants:[],
  plugins: [],
};


