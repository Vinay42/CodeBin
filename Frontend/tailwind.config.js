export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		screens: {
			'xs': '475px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					alt: 'hsl(var(--background-alt))'
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground))',
					light: 'hsl(var(--foreground-light))'
				},
				navbar: {
					background: 'hsl(var(--navbar-background))',
					border: 'hsl(var(--navbar-border))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				editor: {
					background: 'hsl(var(--editor-background))',
					foreground: 'hsl(var(--editor-foreground))',
					'line-numbers': 'hsl(var(--editor-line-numbers))',
					selection: 'hsl(var(--editor-selection))'
				},
				terminal: {
					background: 'hsl(var(--terminal-background))',
					foreground: 'hsl(var(--terminal-foreground))',
					green: 'hsl(var(--terminal-green))',
					red: 'hsl(var(--terminal-red))',
					yellow: 'hsl(var(--terminal-yellow))'
				},
				panel: {
					background: 'hsl(var(--panel-background))',
					border: 'hsl(var(--panel-border))'
				},
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', 'monospace']
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-terminal': 'var(--gradient-terminal)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'elegant': 'var(--shadow-elegant)',
				'navbar': 'var(--shadow-navbar)'
			},
			backdropBlur: {
				'lg': '10px'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};