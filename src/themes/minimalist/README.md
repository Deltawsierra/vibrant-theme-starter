
# Minimalist Theme

Clean, typography-focused design emphasizing content over decoration.

## Design Philosophy
- **Typography First**: Content and readability are paramount
- **Grayscale Palette**: Only black, white, and gray tones
- **Minimal Interactions**: Subtle hover states and transitions
- **Accessibility**: WCAG 2.1 AA compliant (optional for this theme)

## Layout Structure

### MinimalistLayout.tsx
**Purpose**: Main layout wrapper providing consistent structure and dark mode functionality

**Features Implemented**:
- ✅ Dark/light mode toggle (fixed top-right)
- ✅ Horizontal navigation integration
- ✅ Clean footer with theme attribution
- ✅ Font-magneti typography (pending font loading)

**TODO**:
- [ ] Load and integrate Magneti font from MyFonts
- [ ] Add subtle page transitions
- [ ] Implement proper focus management
- [ ] Add reading time estimates

### MinimalistNavigation.tsx
**Purpose**: Clean horizontal navigation with active state indicators

**Features Implemented**:
- ✅ Horizontal link layout
- ✅ Active page highlighting
- ✅ Dark mode support
- ✅ Keyboard navigation

**TODO**:
- [ ] Add breadcrumb navigation for deeper pages
- [ ] Implement smooth scrolling to sections
- [ ] Add skip-to-content link

## Pages
All pages follow the format: "Minimalist – [Page Name]"

### Constraints
- Only use grayscale colors (#000000 to #FFFFFF)
- Typography-focused content hierarchy
- Minimal decorative elements
- Clean whitespace management

### Content Structure (Placeholder)
```
About: Personal introduction, skills, philosophy
Work: Project showcase with detailed descriptions
Contact: Simple contact form and information
Showcase: Featured work with case studies
```

## Accessibility Notes
- High contrast ratios maintained
- Focus indicators visible
- Semantic HTML structure
- Screen reader friendly

## Development Notes
```typescript
// Dark mode implementation
const [isDarkMode, setIsDarkMode] = useState(false);

// Theme-specific color classes
const colors = {
  background: isDarkMode ? 'bg-gray-900' : 'bg-white',
  text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
  accent: isDarkMode ? 'text-gray-400' : 'text-gray-600'
};
```
