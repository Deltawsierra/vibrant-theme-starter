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
				'magneti': ['Magneti', 'system-ui', 'sans-serif'],
				'orbitron': ['Orbitron', 'Courier New', 'monospace'],
				'crimson': ['Crimson Text', 'Georgia', 'serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'source-sans': ['Source Sans Pro', 'system-ui', 'sans-serif'],
				'montserrat': ['Montserrat', 'system-ui', 'sans-serif'],
				'pixel': ['Perfect DOS VGA 437', 'Courier New', 'monospace']
			},
			spacing: {
				'minimalist-lg': '4rem',
				'arcade-grid': '1.25rem',
				'story-indent': '2.5rem'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'arcade': '0',
				'story': '0.25rem'
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
				},
				'pixel-blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' }
				},
				'screen-flicker': {
					'0%': { opacity: '1' },
					'98%': { opacity: '1' },
					'99%': { opacity: '0.96' },
					'100%': { opacity: '1' }
				},
				'neon-glow': {
					'0%': { 
						boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor' 
					},
					'50%': { 
						boxShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor, 0 0 12px currentColor' 
					},
					'100%': { 
						boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor' 
					}
				},
				'arcade-entrance': {
					'0%': { 
						transform: 'scale(0) rotate(180deg)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.1) rotate(90deg)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					}
				},
				'page-turn': {
					'0%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(-90deg)' },
					'100%': { transform: 'rotateY(-180deg)' }
				},
				'page-flip': {
					'0%': { transform: 'rotateY(0deg)', zIndex: '2' },
					'50%': { transform: 'rotateY(90deg)', zIndex: '2' },
					'100%': { transform: 'rotateY(180deg)', zIndex: '1' }
				},
				'parallax-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'story-fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'dramatic-slide': {
					'0%': { 
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				// New 3D Interactive animations
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotateX(0deg)',
						boxShadow: '0 5px 15px 0px rgba(59, 130, 246, 0.1)'
					},
					'50%': { 
						transform: 'translateY(-10px) rotateX(2deg)',
						boxShadow: '0 25px 25px 0px rgba(59, 130, 246, 0.2)'
					}
				},
				'scan': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(calc(100vh + 100%))' }
				},
				'slide': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				// New E-commerce animations
				'product-hover': {
					'0%': { transform: 'translateY(0) scale(1)' },
					'100%': { transform: 'translateY(-4px) scale(1.02)' }
				},
				'cart-bounce': {
					'0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
					'40%': { transform: 'translateY(-8px)' },
					'60%': { transform: 'translateY(-4px)' }
				},
				// New Videography animations
				'curtain-reveal': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.05)' }
				},
				'spotlight': {
					'0%': { opacity: '0.3' },
					'50%': { opacity: '0.7' },
					'100%': { opacity: '0.3' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'pixel-blink': 'pixel-blink 1s step-start infinite',
				'screen-flicker': 'screen-flicker 0.15s ease-in-out infinite',
				'neon-glow': 'neon-glow 2s ease-in-out infinite alternate',
				'arcade-entrance': 'arcade-entrance 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'page-turn': 'page-turn 1.5s ease-in-out',
				'page-flip': 'page-flip 1.2s ease-in-out',
				'parallax-float': 'parallax-float 6s ease-in-out infinite',
				'story-fade-in': 'story-fade-in 0.8s ease-out',
				'dramatic-slide': 'dramatic-slide 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				// New 3D Interactive animations
				'float': 'float 6s ease-in-out infinite',
				'scan': 'scan 2s ease-in-out infinite',
				'slide': 'slide 4s linear infinite',
				// New E-commerce animations
				'product-hover': 'product-hover 0.3s ease-out',
				'cart-bounce': 'cart-bounce 1s ease-in-out',
				// New Videography animations
				'curtain-reveal': 'curtain-reveal 0.8s ease-out',
				'zoom-in': 'zoom-in 0.5s ease-out',
				'spotlight': 'spotlight 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
