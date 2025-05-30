/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Vibrant Purple
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Vibrant Teal
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
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
        // DDR Theme Colors
        'electric-blue': '#00FFFF', // Neon Cyan/Blue
        'neon-pink': '#FF00FF',    // Magenta
        'glow-magenta': '#F0F',  // Brighter Magenta (short form)
        'flame-orange': '#FF4500',  // OrangeRed
        'ddr-arrow-blue': '#30A2FF',
        'ddr-arrow-pink': '#E746A5',
        'ddr-arrow-green': '#A8DF8E',
        'ddr-arrow-yellow': '#F3CC46',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
        'ddr-pulse': {
          '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        'ddr-grid-sparkle': {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.8, boxShadow: '0 0 15px #00FFFF' },
        },
        'ddr-flicker': {
          '0%, 100%': { opacity: 0.5 },
          '25%': { opacity: 0.2 },
          '50%': { opacity: 0.7 },
          '75%': { opacity: 0.3 },
        },
        'ddr-stardust': {
          '0%': { transform: 'translateY(100%) translateX(-50%) scale(0.5)', opacity: 0 },
          '50%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-100%) translateX(50%) scale(1)', opacity: 0 },
        },
        'ddr-arrow-up': {
          '0%': { transform: 'translateY(20px) scale(0.8)', opacity: 0 },
          '50%': { opacity: 0.7 },
          '100%': { transform: 'translateY(-20px) scale(1.2)', opacity: 0 },
        },
        'ddr-text-pop': {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'ddr-flame-border': {
          '0%, 100%': { boxShadow: '0 0 15px 5px #FF4500, 0 0 25px 10px #FF00FF inset' },
          '50%': { boxShadow: '0 0 20px 8px #FF4500, 0 0 30px 12px #FF00FF inset' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'ddr-pulse': 'ddr-pulse 1s ease-in-out infinite',
        'ddr-grid-sparkle': 'ddr-grid-sparkle 3s ease-in-out infinite alternate',
        'ddr-flicker': 'ddr-flicker 0.5s linear infinite',
        'ddr-stardust': 'ddr-stardust 5s linear infinite',
        'ddr-arrow-up': 'ddr-arrow-up 2s ease-out infinite',
        'ddr-text-pop': 'ddr-text-pop 0.5s ease-out forwards',
        'ddr-flame-border': 'ddr-flame-border 1.5s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};