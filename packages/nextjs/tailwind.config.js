const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx,scss,svg}'],
	prefix: 'tl-',
	jit: true,
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				'3xl': '1800px',
			},
			fontFamily: {
				sans: ['var(--font-sans)'],
			},
			spacing: {
				13.25: '3.313rem',
			},
			colors: {
				text: 'hsl(var(--text))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				foreground: 'hsl(var(--foreground))',
				background: 'hsl(var(--background))',
				success: 'hsl(var(--success))',
				info: 'hsl(var(--info))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				gray: {
					50: '#e5e4e4',
					100: '#cccac9',
					200: '#b3b1b0',
					300: '#9a9897',
					400: '#83807e',
					500: '#6c6967',
					600: '#565250',
					700: '#413d3a',
					800: '#2d2926',
					900: '#1a1613',
					925: '#15120f',
					950: '#100d0b',
					975: '#0c0907',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				'.transition-default': {
					transition: 'all 120ms ease-in-out',
				},
			});
		}),
	],
};
