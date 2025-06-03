
# Videography Theme

A cinematic portfolio theme showcasing video projects with professional presentation and client interaction tools.

## Implemented Features

### Video Showcase
- **Spotlight Video Component**: Self-hosted, YouTube, and Vimeo support
- **Lightbox Playback**: Full-screen modal with quality selection
- **Autoplay on Hover**: Subtle preview functionality
- **Mute/Unmute Controls**: Always-accessible audio controls
- **Quality Selection**: HD, 4K, and custom quality options

### Project Portfolio
- **Project Showcase**: Grid and carousel layouts for video projects
- **Detailed Project Pages**: Video, description, credits, awards
- **Behind-the-Scenes**: Production notes and gallery images
- **Testimonials**: Client feedback and reviews
- **Download Center**: Media kits and CV downloads

### Client Interaction
- **Inquiry Form**: "Book me" project request system
- **Scheduling Calendar**: Appointment booking (scaffolded)
- **Live Chat Widget**: AI support integration (placeholder)
- **Contact Management**: Professional communication tools

### Cinematic Features
- **Dual Mode Toggle**: Cinematic (dark) and Editorial (light) themes
- **Video Animations**: Smooth transitions and focus effects
- **Sidebar Drawers**: Project info and download actions
- **Responsive Layouts**: Mobile-optimized video playback

## Components

### Video System
- `SpotlightVideo`: Core video component with platform support
- `VideoLightbox`: Full-screen playback with controls
- `ProjectShowcase`: Portfolio grid with filtering
- `VideoAnimations`: Cinematic transitions and effects

### Client Tools
- `InquiryForm`: Project booking and contact form
- `SchedulingCalendar`: Appointment management (scaffolded)
- `LiveChatWidget`: AI support integration (placeholder)
- `DownloadCenter`: Media kit and CV distribution

### Layout
- `VideographyLayout`: Main theme layout with dual modes
- `VideographyNavigation`: Specialized navigation bar
- `CinematicModeToggle`: Theme switching controls

## Video Integration

```tsx
interface VideoSource {
  type: 'youtube' | 'vimeo' | 'self-hosted';
  url: string;
  title: string;
  thumbnail?: string;
  qualities?: string[];
}
```

### Supported Platforms
- **YouTube**: Embed with custom controls
- **Vimeo**: Professional video hosting
- **Self-hosted**: Direct video files with full control

## Project Data Structure

```tsx
interface ProjectData {
  id: string;
  title: string;
  genre: string;
  year: number;
  duration: string;
  description: string;
  video: VideoSource;
  credits: {
    director: string;
    producer: string;
    cinematographer: string;
    editor: string;
  };
  awards: string[];
  behindTheScenes: {
    images: string[];
    notes: string;
  };
  testimonials: {
    author: string;
    role: string;
    text: string;
  }[];
  downloadLinks: {
    mediaKit: string;
    cv: string;
  };
}
```

## Layout Variations

### Cinematic Mode
- Dark background with high contrast
- Minimal UI with focus on content
- Dramatic transitions and animations
- Professional presentation style

### Editorial Mode
- Light, clean interface
- Enhanced readability
- Structured content layout
- Business-friendly appearance

## Context API

The `VideoContext` manages:
- Cinematic/Editorial mode state
- Drawer visibility (left/right)
- Video playback preferences
- Quality settings and autoplay

## Accessibility Features

- **Focus Management**: Proper tab order and focus trapping
- **Keyboard Navigation**: Full keyboard accessibility
- **ARIA Labels**: Screen reader support
- **Video Controls**: Accessible playback controls
- **Modal Management**: Proper modal behavior

## Technical Implementation

- **React Player**: Multi-platform video support
- **Responsive Design**: Mobile-optimized layouts
- **Performance**: Lazy loading and optimization
- **SEO Ready**: Proper meta tags and structure

## Integration Ready

- **Analytics**: Video engagement tracking
- **CMS Integration**: Project management systems
- **Client Portals**: Secure project sharing
- **Payment Integration**: Invoice and payment processing

All client interaction features are currently scaffolded for demo purposes and ready for real API integration.
