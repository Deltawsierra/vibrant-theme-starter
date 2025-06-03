
# 3D Interactive Theme

A cutting-edge theme featuring immersive 3D environments and interactive elements built with React Three Fiber.

## Implemented Features

### Core 3D System
- **3D Viewport**: React Three Fiber integration with OrbitControls for pan, zoom, and rotate
- **Loading Overlay**: "World loading" screen with fallback mode detection
- **Camera Controls**: Full camera manipulation with auto-reset functionality
- **Device Fallback**: Static image layout for mobile/low-end devices

### Interactive Elements
- **Floating Objects**: Cards, pods, and islands positioned in 3D space
- **Hover/Click Interactions**: Objects highlight and trigger animations on interaction
- **Drag System**: Basic drag-and-drop functionality for 3D objects
- **Object Discovery**: Strategically positioned elements for easy exploration

### Navigation & UI
- **3D Navigation**: Specialized navigation bar for 3D environment
- **Minimap**: Real-time scene overview with object positions
- **Control Panel**: Camera reset, interaction info, and device status
- **Back to Lobby**: Always-accessible return to main site

### State Management
- **3D Context**: Local state management for camera, objects, and interactions
- **Object Tracking**: Selected objects, highlighting, and position data
- **Minimap Integration**: Live object positions and selection state
- **Device Capabilities**: Hardware detection and fallback management

## Context API

The `ThreeDContext` provides:
- Camera position and controls
- Interactive object management
- Minimap visibility state
- Object selection and highlighting
- Device capability detection

## Usage

```tsx
import { ThreeDProvider } from './context/ThreeDContext';
import ThreeDLayout from './components/ThreeDLayout';

// Wrap your app with the provider
<ThreeDProvider>
  <ThreeDLayout>
    {/* Your 3D content */}
  </ThreeDLayout>
</ThreeDProvider>
```

## Components

- `ThreeDLayout`: Main layout with 3D viewport and controls
- `ThreeDViewport`: Core 3D scene with Three.js integration
- `ThreeDNavigation`: Navigation bar optimized for 3D environment
- `LoadingOverlay`: Loading screen with fallback detection

## Technical Notes

- Uses React Three Fiber v8.x for React 18 compatibility
- Three.js v0.160+ for modern 3D features
- Drei helper library for enhanced 3D components
- Automatic fallback for unsupported devices
- Memory management and cleanup on unmount

## Dependencies

- @react-three/fiber: 3D scene management
- @react-three/drei: Helper components and controls
- three: Core 3D engine

## Constraints

- No cross-theme context access
- Theme-specific 3D state only
- Fallback mode for accessibility
- Performance-optimized for web deployment
