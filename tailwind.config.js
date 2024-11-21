/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      colors: {
        themeColor: '#e76608',  // orange for major_buttons, highlights, logo 
        themeColorli8: '#e49a6594',  // orange for major_buttons, highlights, logo 
        themeColor2: '#0A2342', //  Dark navy for headers, footer, highlights and buttons
        themeColor2li8: '#334155', //  Dark navy for headers, footer, highlights and buttons
        bar_color1: '#4b9499',    // for bars
        bar_color2: '#F2C94C',    // second bars

        block: '#880808',
        
        main_bg: '#ffffff',     // White color for text and backgrounds
        muted_bg: '#e3e3e3',     // Light grey for backgrounds 
       
      },
      textColor: {
        head: '#00050a', // dark for main headings, icons, buttons
        body: '#000000', // dark for body
        sub: '#666666',     // Muted grey for less important text (subheadings, details)
        
        highlighter: '#ff3d00', // Bright orange as Highlighter color
        error: '#FF3333',     // Bright red for errors or warnings // highlight


      },
       fontSize: {
        h1: ['46px', '52px'], // Large headings (e.g., hero sections)
        h2: ['37px', '43px'], // Section headings
        h3: ['29px', '34px'], // Subheadings
        h4: ['21px', '28px'], // Smaller headings or callouts
        body: ['16px', '24px'], // Default body text
        small: ['14px', '20px'], // Small text for footnotes or muted text
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // For general body text
        heading: ['Poppins', 'sans-serif'], // For headings
        accent: ['Lato', 'sans-serif'], // For buttons or highlights
      },
      screens: {
        'sm': '640px',    // tablet
        'md': '768px',    // small laptop
        'lg': '1024px',   // laptop
        'xl': '1280px',   // desktop
      },
    },
  },
  plugins: [nextui()]
}
