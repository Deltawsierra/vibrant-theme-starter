
# Multi-Theme Developer Portfolio

A sophisticated developer portfolio website showcasing senior-level full-stack development, UI/UX design, and technical mastery through six distinct, fully isolated themes.

## Project Purpose

This portfolio demonstrates Fortune 500-level development skills through:
- **Six Radically Distinct Themes**: Each theme represents a different design philosophy and technical approach
- **Dynamic Theme Loading**: Real-time theme switching with persistent user preferences
- **Full-Stack Capabilities**: Backend integration, authentication, payments, and AI features
- **UI/UX Mastery**: Responsive design, accessibility, and user experience optimization
- **Enterprise-Level Code Quality**: Modular architecture, TypeScript, and maintainable patterns

## Tech Stack

### Frontend
- **React 18** with **TypeScript** - Modern component architecture
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first styling framework
- **React Router DOM** - Client-side routing and navigation

### Backend & Services
- **Supabase** - Database, authentication, and real-time features
- **Stripe** - Payment processing (demo mode)
- **OpenAI API** - AI-powered features and interactions
- **OAuth** - Social authentication integration

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Automated code formatting
- **TypeScript** - Type safety and developer experience

## Architecture

```
src/
├── components/           # Shared, theme-agnostic components
│   ├── ThemeSelector.tsx    # Theme selection interface
│   ├── ThemePageLoader.tsx  # Dynamic theme component loader
│   ├── ThemeSwitcher.tsx    # Global theme switcher dropdown
│   ├── ErrorBoundary.tsx    # Error handling wrapper
│   └── Navigation.tsx       # Site navigation
├── pages/               # Core site pages (About, Work, Contact, Showcase)
├── themes/              # Six isolated theme implementations
│   ├── minimalist/         # Clean, typography-focused theme
│   ├── retro-arcade/       # Vibrant, pixel-art inspired theme
│   ├── storytelling/       # Narrative-driven experience
│   ├── 3d-interactive/     # Three-dimensional elements
│   ├── ecommerce/          # Product showcase with shopping
│   └── videography/        # Media-rich portfolio
├── context/             # Global state management
│   └── ThemeContext.tsx    # Theme persistence and switching
├── utils/               # Utility functions and hooks
│   ├── useResponsive.ts    # Responsive breakpoint utilities
│   ├── useLocalStorage.ts  # Storage management hooks
│   ├── useThemeUtils.ts    # Theme-specific utilities
│   └── storage.ts          # Storage helper functions
├── assets/              # Global assets and resources
└── hooks/               # Shared React hooks
```

## Core Components

### ThemeContext
Global context managing theme state with localStorage persistence:
- Theme selection and validation
- Cross-tab synchronization
- Automatic persistence

### ThemeSelector
Landing page component for theme selection:
- Accessible button grid for all six themes
- Current theme detection with options to keep or change
- Success feedback and automatic navigation

### ThemeSwitcher
Global dropdown component for theme switching:
- Visually neutral design that works with any theme
- Accessible keyboard navigation
- Available from any page

### ThemePageLoader
Dynamic component loader with lazy loading:
- Takes `pageName` prop ('About', 'Work', 'Contact', 'Showcase')
- Dynamically imports theme-specific page components
- React.Suspense integration with loading states
- Graceful error handling for missing components

### ErrorBoundary
Comprehensive error handling wrapper:
- Catches rendering errors in theme components
- User-friendly error messages with recovery options
- Development-mode error details
- Navigation back to theme selector

## Theme Isolation Philosophy

Each theme operates in complete isolation with:
- Own component library and design system (`/themes/[theme]/components/`)
- Independent page implementations (`/themes/[theme]/pages/`)
- Theme-specific assets (`/themes/[theme]/assets/`)
- Unique color palettes and typography
- Isolated routing and navigation overrides

## Available Themes

### 1. Minimalist
- **Layout**: Clean typography-focused design with optional dark mode
- **Navigation**: Horizontal links with subtle hover states
- **Features**: Dark/light mode toggle, grayscale palette
- **Status**: ✅ Layout and navigation implemented

### 2. Retro Arcade
- **Layout**: Neon colors, pixel-art aesthetic, game-like interface
- **Navigation**: Button-style links with score display
- **Features**: Mute toggle, animated backgrounds
- **Status**: ✅ Layout and navigation implemented

### 3. Storytelling
- **Layout**: Chapter-based narrative structure with timeline
- **Navigation**: Chapter navigation with progress indicators
- **Features**: Immersive reading experience, bookmark system
- **Status**: ✅ Layout and navigation implemented

### 4. 3D Interactive
- **Layout**: Fixed overlays over 3D viewport container
- **Navigation**: Floating controls with minimap and camera reset
- **Features**: Mobile fallback, loading animations
- **Status**: ✅ Layout shell implemented (3D logic pending)

### 5. E-commerce
- **Layout**: Product-focused with sticky navigation and mobile cart
- **Navigation**: Category links, search bar, user account area
- **Features**: Newsletter modals, responsive design
- **Status**: ✅ Layout and navigation implemented

### 6. Videography
- **Layout**: Cinematic with floating navigation and video spotlight
- **Navigation**: Mode-switching between cinematic and editorial
- **Features**: Video lightbox, drawer controls
- **Status**: ✅ Layout and navigation implemented

## Utility Functions

### Theme-Agnostic Hooks
- `useResponsive()` - Breakpoint detection and viewport dimensions
- `useLocalStorage()` - Type-safe localStorage management
- `useSessionStorage()` - Session storage utilities
- `useThemeUtils()` - Theme-specific helpers and utilities
- `useThemeValue()` - Conditional rendering based on theme

## Development Status

### Phase 3 Complete ✅
- [x] All theme layouts and navigation implemented
- [x] Theme-specific visual isolation achieved
- [x] Global ThemeSwitcher component
- [x] Utility hooks for responsive design and storage
- [x] Comprehensive documentation

### Phase 4 - Next Steps
- [ ] **TODO**: Real content and assets for each theme
- [ ] **TODO**: Advanced animations and interactions
- [ ] **TODO**: Backend integration (Supabase)
- [ ] **TODO**: Authentication system
- [ ] **TODO**: Payment processing (Stripe)
- [ ] **TODO**: 3D implementation for interactive theme
- [ ] **TODO**: Video player for videography theme

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Theme Development

### Adding a New Theme
1. Create theme folder: `/src/themes/[theme-name]/`
2. Add required page components: `About.tsx`, `Work.tsx`, `Contact.tsx`, `Showcase.tsx`
3. Create `Layout.tsx` and `Navigation.tsx` components
4. Export theme in `/src/themes/[theme-name]/index.ts`
5. Register theme in `/src/themes/index.ts`
6. Update theme type in `/src/context/ThemeContext.tsx`

### Theme Structure
```
themes/[theme-name]/
├── pages/           # Theme-specific page implementations
├── components/      # Theme-specific reusable components
│   ├── Layout.tsx      # Main layout wrapper
│   └── Navigation.tsx  # Theme navigation component
├── assets/          # Theme-specific images, fonts, etc.
├── index.ts         # Theme export configuration
└── README.md        # Theme documentation
```

## Code Quality

This project maintains enterprise-level code standards:
- Strict TypeScript configuration
- Comprehensive ESLint rules
- Automated Prettier formatting
- Modular, maintainable architecture
- Performance optimization through lazy loading
- Accessibility compliance
- Error boundary protection

## API Documentation

### ThemeContext API
```typescript
interface ThemeContextType {
  currentTheme: Theme;
  getTheme: () => Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
}
```

### Theme Types
```typescript
type Theme = 'minimalist' | 'retro-arcade' | 'storytelling' | 
             '3d-interactive' | 'ecommerce' | 'videography';
```

---

*This portfolio represents a comprehensive demonstration of modern web development capabilities, designed for Fortune 500-level technical evaluation.*
