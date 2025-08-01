import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
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
				// Современная палитра из дизайна
				'chat-bg': '#87CEEB', // Основной голубой фон
				'chat-light': '#B0E0E6', // Светлый голубой
				'chat-blue': '#4682B4', // Средний синий
				'chat-dark-blue': '#1E90FF', // Темный синий
				'chat-red': '#DC143C', // Красный
				'chat-coral': '#F08080', // Коралловый/розовый
				'chat-pink': '#FFB6C1', // Светлый розовый
				'chat-green': '#90EE90', // Зеленый
				'chat-lime': '#9ACD32', // Лайм
				'chat-yellow': '#FFFF99', // Желтый
				'chat-orange': '#FFA500', // Оранжевый
				'chat-white': '#FFFFFF', // Белый
				'chat-cream': '#F5DEB3', // Кремовый
				'chat-text': '#000000', // Черный текст
				'chat-text-light': '#333333' // Серый текст
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// Сибирские анимации
				'fadeIn': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'bearTracks': {
					'0%': { transform: 'scale(0.9) rotate(-1deg)' },
					'50%': { transform: 'scale(1.05) rotate(1deg)' },
					'100%': { transform: 'scale(1) rotate(0deg)' }
				},
				'auroraGlow': {
					'0%, 100%': { opacity: '0.5', filter: 'hue-rotate(0deg)' },
					'50%': { opacity: '1', filter: 'hue-rotate(90deg)' }
				},
				'snowfall': {
					'0%': { transform: 'translateY(-100vh) rotate(0deg)' },
					'100%': { transform: 'translateY(100vh) rotate(360deg)' }
				},
				'icecrack': {
					'0%': { transform: 'scaleX(0)' },
					'100%': { transform: 'scaleX(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulseGlow': {
					'0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.3s ease-out',
				'bear-tracks': 'bearTracks 0.5s ease-out',
				'aurora-glow': 'auroraGlow 3s ease-in-out infinite',
				'snowfall': 'snowfall 10s linear infinite',
				'ice-crack': 'icecrack 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;