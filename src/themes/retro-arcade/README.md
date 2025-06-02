
# Retro Arcade Theme

Vibrant, pixel-art inspired design with authentic 80s arcade aesthetics.

## Design Philosophy
- **Nostalgic Gaming**: Authentic 8-bit/16-bit arcade experience
- **Neon Color Palette**: Electric blues, greens, magentas, and yellows
- **Pixel-Perfect Typography**: Orbitron font with pixelated elements
- **Motion & Effects**: Scanlines, glows, and screen flicker animations

## Audio Implementation

### Sound Effects (SFX)
All sound effects are placeholders and need to be replaced with royalty-free or CC-licensed audio:

**Required SFX Files** (to be added to `/src/themes/retro-arcade/assets/sfx/`):
- `coin-insert.wav` - Classic arcade coin insertion sound
- `button-press.wav` - Menu button press/selection
- `menu-navigate.wav` - Navigation between menu items
- `page-transition.wav` - Page/room transitions
- `error.wav` - Error/invalid action sound
- `success.wav` - Successful action completion
- `power-up.wav` - Achievement/power-up collection
- `game-over.wav` - Game over/failure sound

**Recommended Sources**:
- [Freesound.org](https://freesound.org) - CC-licensed audio
- [Zapsplat](https://zapsplat.com) - Royalty-free arcade sounds
- [8-bit Music Maker](https://www.8bitmusicmaker.com) - Custom retro sounds

### Background Music
Background music should loop seamlessly and match the 80s arcade aesthetic:

**Required Music Files** (to be added to `/src/themes/retro-arcade/assets/music/`):
- `background.mp3` - Main theme loop (synthwave/chiptune style)
- `menu.mp3` - Menu/navigation background music
- `game-room.mp3` - Individual game room themes

**Music Requirements**:
- Format: MP3 or OGG for web compatibility
- Loop-friendly (seamless start/end)
- 80s synthwave or chiptune style
- Volume normalized to prevent audio spikes

### Accessibility Features
- All audio controls include ARIA labels
- Keyboard navigation supported for all audio controls
- Visual indicators accompany audio feedback
- Mute controls persist across sessions
- Volume controls have clear min/max indicators

### Implementation Notes
```typescript
// Audio files should be imported as:
import coinSound from '../assets/sfx/coin-insert.wav';
import backgroundMusic from '../assets/music/background.mp3';

// Volume levels:
// SFX: 0.7 (default), range 0.0-1.0
// Music: 0.3 (default), range 0.0-1.0
```

### Motion & Animation Controls
- Motion warning modal on first visit
- All animations can be disabled via settings
- Scanlines and glow effects are toggleable
- Fallback to static design for reduced motion preference

## Layout Structure

### ArcadeLayout.tsx
**Purpose**: Main layout with arcade room atmosphere and persistent audio controls

**Features Implemented**:
- ✅ Motion warning modal with accessibility
- ✅ Persistent audio controls (SFX + Music)
- ✅ Background scanlines and effects
- ✅ Arcade carpet footer with scrolling text

### AudioControls.tsx
**Purpose**: Floating audio control panel for SFX and music

**Features Implemented**:
- ✅ SFX mute/volume controls
- ✅ Background music play/pause/mute
- ✅ Volume sliders with accessibility
- ✅ Persistent settings via localStorage

## Game Components (Scaffolded)
- Mini-game mounting system
- RPG stat cards for portfolio items
- Easter egg/collectibles tracking
- High score persistence

## Development Notes
```typescript
// Theme context usage:
const { settings, playSFX, toggleScanlines } = useArcade();

// Audio hook usage:
const { playBackgroundMusic, toggleMusic, isMusicPlaying } = useArcadeAudio();
```

## Audio Licensing
**IMPORTANT**: All placeholder audio must be replaced with properly licensed content before production deployment. Current implementation logs audio actions to console for development purposes.
