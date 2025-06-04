import type { Config } from "tailwindcss";

const config: Config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Minimalist theme font
        'magneti': ['Magneti', 'Inter', 'system-ui', 'sans-serif'],
        
        // Retro Arcade theme fonts
        'pixel': ['Press Start 2P', 'VT323', 'Courier New', 'monospace'],
        'arcade': ['VT323', 'Courier New', 'monospace'],
        
        // Other theme fonts
        'story': ['Crimson Text', 'Georgia', 'serif'],
        'modern': ['Inter', 'system-ui', 'sans-serif'],
        'video': ['Montserrat', 'system-ui', 'sans-serif'],
        'commerce': ['Source Sans Pro', 'system-ui', 'sans-serif']
      },
      colors: {
        // Shadcn colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Retro Arcade neon palette
        'arcade-neon': {
          'pink': '#ff00ff',
          'purple': '#8a2be2',
          'blue': '#00bfff',
          'cyan': '#00ffff',
          'green': '#00ff00',
          'yellow': '#ffff00',
          'orange': '#ffa500',
          'red': '#ff0000',
          'magenta': '#ff1493',
          'lime': '#32cd32',
          'violet': '#9400d3',
          'gold': '#ffd700'
        },
        
        // Story theme colors
        'story-warm': {
          50: '#fdf8f3',
          100: '#faf0e4',
          200: '#f4dfc4',
          300: '#ecc89f',
          400: '#e2a86a',
          500: '#db9455',
          600: '#cd7c47',
          700: '#ab5f3c',
          800: '#8a4d37',
          900: '#70402e'
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Accordion animations
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        
        // Retro Arcade animations
        "neon-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            opacity: "1" 
          },
          "50%": { 
            textShadow: "0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor",
            opacity: "0.8" 
          }
        },
        "neon-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, inset 0 0 10px currentColor" 
          },
          "50%": { 
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, inset 0 0 20px currentColor" 
          }
        },
        "pixel-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" }
        },
        "screen-flicker": {
          "0%, 100%": { opacity: "0.02" },
          "50%": { opacity: "0.05" }
        },
        "slide": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "parallax-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-1deg)" }
        },
        "arcade-boot": {
          "0%": { 
            transform: "scale(0.8)",
            opacity: "0",
            filter: "brightness(0)"
          },
          "30%": {
            transform: "scale(1.1)",
            opacity: "0.5",
            filter: "brightness(2)"
          },
          "60%": {
            transform: "scale(0.95)",
            opacity: "0.8",
            filter: "brightness(1.5)"
          },
          "100%": { 
            transform: "scale(1)",
            opacity: "1",
            filter: "brightness(1)"
          }
        },
        "coin-insert": {
          "0%, 100%": { 
            transform: "translateY(0px) rotate(0deg)",
            textShadow: "0 0 10px #ffd700"
          },
          "25%": { 
            transform: "translateY(-5px) rotate(2deg)",
            textShadow: "0 0 15px #ffd700, 0 0 25px #ffd700"
          },
          "75%": { 
            transform: "translateY(5px) rotate(-2deg)",
            textShadow: "0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700"
          }
        },
        "glitch": {
          "0%, 100%": { 
            transform: "translateX(0)",
            filter: "hue-rotate(0deg)"
          },
          "10%": { 
            transform: "translateX(-2px)",
            filter: "hue-rotate(90deg)"
          },
          "20%": { 
            transform: "translateX(2px)",
            filter: "hue-rotate(180deg)"
          },
          "30%": { 
            transform: "translateX(-1px)",
            filter: "hue-rotate(270deg)"
          },
          "40%": { 
            transform: "translateX(1px)",
            filter: "hue-rotate(360deg)"
          }
        },
        
        // Storytelling animations
        "story-fade-in": {
          "0%": { 
            opacity: "0",
            transform: "translateY(30px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "dramatic-slide": {
          "0%": { 
            opacity: "0",
            transform: "translateX(-100px) scale(0.8)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateX(0) scale(1)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        
        // Retro Arcade animations
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "neon-glow": "neon-glow 1.5s ease-in-out infinite",
        "pixel-blink": "pixel-blink 1s step-end infinite",
        "screen-flicker": "screen-flicker 0.15s ease-in-out infinite",
        "slide": "slide 20s linear infinite",
        "parallax-float": "parallax-float 6s ease-in-out infinite",
        "arcade-boot": "arcade-boot 2s ease-out",
        "coin-insert": "coin-insert 2s ease-in-out infinite",
        "glitch": "glitch 0.5s ease-in-out infinite",
        
        // Storytelling animations
        "story-fade-in": "story-fade-in 1s ease-out",
        "dramatic-slide": "dramatic-slide 0.8s ease-out"
      },
      backgroundImage: {
        'arcade-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
        'crt-scanlines': "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)"
      },
      backgroundSize: {
        'arcade-grid': '20px 20px',
        'crt-scanlines': '100% 4px'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
