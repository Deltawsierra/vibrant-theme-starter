
# Performance Optimization Guide

## Current Performance Metrics

### Target Metrics (Desktop)
- **Time to Interactive (TTI)**: < 1.5s
- **First Contentful Paint (FCP)**: < 1.0s
- **Largest Contentful Paint (LCP)**: < 2.0s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Bundle Size Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze

# Bundle size targets
- Main bundle: < 150kb gzipped
- Theme chunks: < 50kb each gzipped
- Vendor chunk: < 100kb gzipped
```

## Optimization Strategies

### Code Splitting
- **Route-based**: Each page loads only required code
- **Theme-based**: Themes loaded on demand
- **Component-based**: Heavy components lazy-loaded

### Image Optimization
```jsx
// Using optimized image component
<LazyImage
  src="/image.webp"
  alt="Description"
  sources={[
    { srcSet: "/image.avif", type: "image/avif" },
    { srcSet: "/image.webp", type: "image/webp" },
    { srcSet: "/image.jpg", type: "image/jpeg" }
  ]}
  loading="lazy"
  width={800}
  height={600}
/>
```

### Theme-Specific Optimizations

#### Minimalist Theme
- Minimal JavaScript
- No animations or transitions
- Optimized font loading
- Critical CSS inlined

#### Retro Arcade Theme
- Audio files compressed
- Sprite sheets optimized
- Game loop optimized for 60fps
- Reduced particle counts on mobile

#### Storytelling Theme
- Progressive image loading
- Intersection Observer for animations
- Optimized scroll performance
- Chapter-based code splitting

#### 3D Interactive Theme
- LOD (Level of Detail) models
- Texture compression
- Frustum culling
- Mobile fallback mode

#### E-commerce Theme
- Product image lazy loading
- Cart state optimization
- Search debouncing
- Pagination for large catalogs

#### Videography Theme
- Video poster images
- Progressive video loading
- Thumbnail optimization
- Lazy modal initialization

## Performance Monitoring

### Real User Monitoring (RUM)
```javascript
// Track Core Web Vitals
import { PerformanceMonitor } from '@/utils/performance';

const monitor = PerformanceMonitor.getInstance();
monitor.getWebVitals().then(vitals => {
  // Send to analytics
  Analytics.getInstance().track({
    name: 'web_vitals',
    properties: vitals
  });
});
```

### Development Tools
```bash
# Performance testing
npm run test:performance

# Lighthouse CI
npm run lighthouse

# Bundle analyzer
npm run analyze
```

## Caching Strategy

### Static Assets
- **Images**: 1 year cache with versioning
- **Fonts**: 1 year cache
- **CSS/JS**: Hashed filenames for cache busting

### API Responses
- **React Query**: 5 minute stale time
- **Theme Data**: Cached in localStorage
- **User Preferences**: Persistent storage

### Service Worker (Future)
- Offline theme fallbacks
- Critical resource caching
- Background sync for forms

## Network Optimization

### Resource Hints
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/magneti.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch likely resources -->
<link rel="prefetch" href="/themes/minimalist/bundle.js">

<!-- Preconnect to external services -->
<link rel="preconnect" href="https://supabase.co">
```

### CDN Configuration
- Global edge locations
- Automatic compression (Brotli/Gzip)
- HTTP/2 server push
- Image optimization pipeline

## Mobile Optimization

### Responsive Images
```jsx
// Responsive image implementation
<picture>
  <source media="(max-width: 768px)" srcSet="mobile.webp" />
  <source media="(max-width: 1200px)" srcSet="tablet.webp" />
  <img src="desktop.webp" alt="Description" />
</picture>
```

### Touch Optimizations
- 44px minimum touch targets
- Reduced animations on mobile
- Optimized scroll performance
- Gesture handling

### Battery Considerations
- Reduced animation intensity
- Lower frame rates when appropriate
- Background tab optimization
- Efficient 3D rendering

## Continuous Monitoring

### Performance Budget
- Bundle size alerts
- Performance regression detection
- Core Web Vitals monitoring
- User experience metrics

### Alerting
- Build time alerts for bundle size
- Real-time performance monitoring
- User feedback integration
- Error rate correlation

Last updated: January 2024
