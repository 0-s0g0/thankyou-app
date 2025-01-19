import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'base-black': '#030303',
  			mainbackground: '#fffafa',
  			outbackground: '#e6e6fa',
  			'pink-light': '#FFD9E4',
  			'pink-dark': '#FF78A0',
  			'yellow-dark': '#FFB520',
  			'light-yellow': '#FFE5B4',
  			orange: '#FF470B',
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
  		keyframes: {
  			flowRight: {
  				'0%': {
  					transform: 'translateX(8%)'
  				},
  				'50%': {
  					transform: 'translateX(-430%)'
  				},
  				'100%': {
  					transform: 'translateX(8%)'
  				}
  			},
  			flowLeft: {
  				'0%': {
  					transform: 'translateX(-430%)'
  				},
  				'50%': {
  					transform: 'translateX(8%)'
  				},
  				'100%': {
  					transform: 'translateX(-430%)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					transform: 'translateX(1000px)',
  					opacity: '0'
  				},
  				to: {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'fade-in-top': {
  				'0%': {
  					transform: 'translateY(-50px)',
  					opacity: '0'
  				},
  				to: {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			'fade-in-right': {
  				'0%': {
  					transform: 'translateX(-50px)',
  					opacity: '0'
  				},
  				to: {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'tracking-in-expand': {
  				'0%': {
  					'letter-spacing': '-.5em',
  					opacity: '0'
  				},
  				'40%': {
  					opacity: '.6'
  				},
  				to: {
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'flow-right': 'flowRight 60s linear infinite',
  			'flow-left': 'flowLeft 60s linear infinite',
  			'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
  			'fade-in-top': 'fade-in-top 3.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
  			'fade-in-right': 'fade-in-right 2.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
  			'tracking-in-expand': 'tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
