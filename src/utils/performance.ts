
import React from 'react';

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private isEnabled: boolean = import.meta.env.DEV;

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public startTimer(name: string): void {
    if (!this.isEnabled) return;
    this.metrics.set(name, performance.now());
  }

  public endTimer(name: string): number {
    if (!this.isEnabled) return 0;
    
    const startTime = this.metrics.get(name);
    if (startTime === undefined) {
      console.warn(`Timer ${name} was not started`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.metrics.delete(name);
    
    // Only log in development and if duration is significant
    if (duration > 16) { // More than one frame
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  public measureComponent<T extends any[], R>(
    name: string,
    fn: (...args: T) => R
  ): (...args: T) => R {
    if (!this.isEnabled) return fn;
    
    return (...args: T): R => {
      this.startTimer(name);
      const result = fn(...args);
      this.endTimer(name);
      return result;
    };
  }

  public getWebVitals(): Promise<any> {
    if (!this.isEnabled) {
      return Promise.resolve({});
    }

    return new Promise((resolve) => {
      const vitals = {
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0
      };

      // Use a more efficient observer pattern
      const observerConfig = { entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] };
      
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          for (const entry of entries) {
            switch (entry.entryType) {
              case 'paint':
                if (entry.name === 'first-contentful-paint') {
                  vitals.fcp = entry.startTime;
                }
                break;
              case 'largest-contentful-paint':
                vitals.lcp = entry.startTime;
                break;
              case 'first-input':
                vitals.fid = (entry as any).processingStart - entry.startTime;
                break;
              case 'layout-shift':
                if (!(entry as any).hadRecentInput) {
                  vitals.cls += (entry as any).value;
                }
                break;
              case 'navigation':
                vitals.ttfb = (entry as any).responseStart - entry.startTime;
                break;
            }
          }

          resolve(vitals);
        });

        observer.observe(observerConfig);
        
        // Fallback timeout
        setTimeout(() => resolve(vitals), 2000);
      } catch (error) {
        console.warn('Performance Observer not supported', error);
        resolve(vitals);
      }
    });
  }

  public clearMetrics(): void {
    this.metrics.clear();
  }
}

export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  name?: string
) {
  if (!import.meta.env.DEV) {
    return React.memo(Component);
  }

  const componentName = name || Component.displayName || Component.name || 'Component';
  
  return React.memo((props: P) => {
    const monitor = PerformanceMonitor.getInstance();
    
    React.useEffect(() => {
      monitor.startTimer(`${componentName}-mount`);
      return () => {
        monitor.endTimer(`${componentName}-mount`);
      };
    }, []);

    return React.createElement(Component, props);
  });
}

// Utility for measuring async operations
export const measureAsync = async <T>(
  name: string,
  asyncFn: () => Promise<T>
): Promise<T> => {
  const monitor = PerformanceMonitor.getInstance();
  monitor.startTimer(name);
  try {
    const result = await asyncFn();
    return result;
  } finally {
    monitor.endTimer(name);
  }
};
