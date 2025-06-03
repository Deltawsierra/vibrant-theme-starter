
# Accessibility Guide

This portfolio follows WCAG 2.1 AA standards across all themes with documented exceptions.

## Keyboard Navigation

### Global Navigation
- **Tab/Shift+Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals, dialogs, and dropdowns
- **Arrow Keys**: Navigate within components (menus, carousels, etc.)

### Skip Links
- **Skip to main content**: Available on focus (Tab from any page)
- Automatically focuses main content area
- Visible on keyboard focus, hidden otherwise

## Theme-Specific Accessibility

### Minimalist Theme
✅ **Fully Accessible**
- High contrast ratios (4.5:1 minimum)
- Clear focus indicators
- Semantic HTML structure
- No animations to conflict with reduced motion preferences

### Retro Arcade Theme
⚠️ **Accessibility with Warnings**
- **Motion Warning**: Required dialog before entering theme
- **Audio Controls**: Full keyboard navigation for SFX/music
- **High Contrast Mode**: Reduced neon effects for better readability
- **Known Limitation**: Some visual effects intentionally chaotic for theme authenticity

### Storytelling Theme
✅ **Accessible with Motion Respect**
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce`
- **Timeline Navigation**: Full keyboard support
- **Progress Tracking**: Screen reader announcements
- **Audio Toggles**: Accessible controls for background audio

### 3D Interactive Theme
⚠️ **Accessible with Fallbacks**
- **Mobile Fallback**: 2D grid view for devices without 3D support
- **Keyboard Controls**: All 3D interactions have keyboard alternatives
- **Camera Reset**: Accessible via keyboard (R key or button)
- **Minimap**: Keyboard toggle and navigation
- **Known Limitation**: 3D spatial navigation inherently challenging for screen readers

### E-commerce Theme
✅ **Fully Accessible Commerce**
- **ARIA Live Regions**: Stock updates, cart changes
- **Form Labels**: All inputs properly labeled
- **Cart Management**: Full keyboard navigation
- **Error Handling**: Clear, accessible error messages
- **Focus Management**: Maintained through modal interactions

### Videography Theme
✅ **Accessible Media Experience**
- **Video Controls**: Full keyboard support for lightbox
- **Drawer Navigation**: Keyboard accessible side panels
- **Inquiry Forms**: Proper labeling and error handling
- **Mode Switching**: Cinematic/Editorial modes fully accessible

## Screen Reader Support

### Tested With
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Key Features
- Semantic HTML structure
- ARIA labels and descriptions
- Live regions for dynamic content
- Logical heading hierarchy
- Alt text for all images
- Focus management in modals

## Accessibility Testing Tools

### Automated Testing
```bash
# Run accessibility tests
npm run test:a11y

# Generate accessibility report
npm run a11y:report
```

### Recommended Tools
- **axe DevTools**: Browser extension for automated testing
- **Lighthouse**: Built into Chrome DevTools
- **WAVE**: Web accessibility evaluation tool
- **Colour Contrast Analyser**: For color testing

## Known Limitations

### By Design (Theme-Specific)
1. **Retro Arcade**: Some visual chaos intentional for authenticity
2. **3D Interactive**: Spatial navigation challenging for screen readers
3. **Videography**: Video content requires manual captions

### Technical Limitations
1. **Browser Support**: Some features require modern browsers
2. **JavaScript Required**: Progressive enhancement where possible
3. **3D Fallbacks**: Limited to 2D alternatives on incompatible devices

## Feedback and Reporting

### Report Accessibility Issues
- Email: accessibility@yoursite.com
- Include: Browser, assistive technology, specific issue
- Response time: 48 hours for critical issues

### Accessibility Statement
This site strives for WCAG 2.1 AA compliance. We welcome feedback and are committed to continuous improvement.

Last updated: January 2024
