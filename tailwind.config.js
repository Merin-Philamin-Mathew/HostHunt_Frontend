/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,jsx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			themeColor: '#e76608',
  			themeColorli8: '#e49a6594',
  			themeColor2: '#0A2342',
  			themeColor2li8: '#334155',
  			bar_color1: '#4b9499',
  			bar_color2: '#F2C94C',
  			block: '#880808',
  			main_bg: '#ffffff',
  			muted_bg: '#e3e3e3',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		textColor: {
  			head: '#00050a',
  			body: '#000000',
  			sub: '#666666',
  			highlighter: '#ff3d00',
  			error: '#FF3333'
  		},
  		fontSize: {
  			h1: [
  				'46px',
  				'52px'
  			],
  			h2: [
  				'37px',
  				'43px'
  			],
  			h3: [
  				'29px',
  				'34px'
  			],
  			h4: [
  				'21px',
  				'28px'
  			],
  			body: [
  				'16px',
  				'24px'
  			],
  			small: [
  				'14px',
  				'20px'
  			]
  		},
  		fontFamily: {
  			sans: [
  				'Roboto',
  				'sans-serif'
  			],
  			heading: [
  				'Poppins',
  				'sans-serif'
  			],
  			accent: [
  				'Lato',
  				'sans-serif'
  			]
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px'
  		},
  		keyframes: {
  			skeleton: {
  				'0%': {
  					backgroundPosition: '200% 0'
  				},
  				'100%': {
  					backgroundPosition: '-200% 0'
  				}
  			}
  		},
  		animation: {
  			skeleton: 'skeleton 1.5s ease-in-out infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [nextui(), require("tailwindcss-animate")],
}
