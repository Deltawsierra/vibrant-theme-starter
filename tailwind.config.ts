
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
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
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Theme-specific colors
				minimalist: {
					100: '#ffffff',
					200: '#f8f9fa',
					300: '#e9ecef',
					400: '#dee2e6',
					500: '#adb5bd',
					600: '#6c757d',
					700: '#495057',
					800: '#343a40',
					900: '#212529'
				},
				arcade: {
					neon: {
						green: '#00ff00',
						cyan: '#00ffff',
						magenta: '#ff00ff',
						yellow: '#ffff00',
						orange: '#ff8000',
						red: '#ff0040'
					},
					dark: {
						100: '#1a1a1a',
						200: '#0d1117',
						300: '#000000'
					}
				},
				story: {
					warm: {
						50: '#fef7ed',
						100: '#fdd5a6',
						200: '#f6ad55',
						300: '#ed8936',
						400: '#dd6b20',
						500: '#c05621',
						600: '#9c4221',
						700: '#7c2d12',
						800: '#651e0e',
						900: '#44140a'
					},
					parchment: '#faf5eb',
					ink: '#2d1810'
				},
				threed: {
					blue: {
						400: '#60a5fa',
						500: '#3b82f6',
						600: '#2563eb'
					},
					slate: {
						700: '#334155',
						800: '#1e293b',
						900: '#0f172a'
					}
				},
				ecommerce: {
					primary: {
						50: '#eff6ff',
						100: '#dbeafe',
						500: '#3b82f6',
						600: '#2563eb',
						700: '#1d4ed8'
					},
					success: '#10b981',
					warning: '#f59e0b',
					error: '#ef4444'
				},
				video: {
					gold: {
						400: '#fbbf24',
						500: '#f59e0b',
						600: '#d97706'
					},
					cinematic: '#000000',
					editorial: '#ffffff'
				}
			},
			fontFamily: {
				// Theme-specific fonts
				'magneti': ['Magneti', 'system-ui', 'sans-serif'], // Minimalist theme
				'orbitron': ['Orbitron', 'Courier New', 'monospace'], // Retro Arcade theme
				'crimson': ['Crimson Text', 'Georgia', 'serif'], // Storytelling theme
				'inter': ['Inter', 'system-ui', 'sans-serif'], // 3D Interactive theme
				'source-sans': ['Source Sans Pro', 'system-ui', 'sans-serif'], // E-commerce theme
				'montserrat': ['Montserrat', 'system-ui', 'sans-serif'], // Videography theme
				'pixel': ['Perfect DOS VGA 437', 'Courier New', 'monospace'] // Retro Arcade pixel font
			},
			spacing: {
				// Theme-specific spacing
				'minimalist-lg': '4rem',
				'arcade-grid': '1.25rem',
				'story-indent': '2.5rem'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'arcade': '0', // Sharp corners for arcade
				'story': '0.25rem' // Subtle rounds for storytelling
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
				},
				'neon-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
						opacity: '1'
					},
					'50%': { 
						textShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor',
						opacity: '0.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
