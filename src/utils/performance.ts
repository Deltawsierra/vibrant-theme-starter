
import React from 'react';

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public startTimer(name: string): void {
    this.metrics.set(name, performance.now());
  }

  public endTimer(name: string): number {
    const startTime = this.metrics.get(name);
    if (startTime === undefined) {
      console.warn(`Timer ${name} was not started`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.metrics.delete(name);
    
    if (import.meta.env.DEV) {
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  public measureComponent<T extends any[], R>(
    name: string,
    fn: (...args: T) => R
  ): (...args: T) => R {
    return (...args: T): R => {
      this.startTimer(name);
      const result = fn(...args);
      this.endTimer(name);
      return result;
    };
  }

  public getWebVitals(): Promise<any> {
    return new Promise((resolve) => {
      // Simple web vitals measurement
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const vitals = {
          fcp: 0,
          lcp: 0,
          fid: 0,
          cls: 0,
          ttfb: 0
        };

        entries.forEach((entry) => {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            vitals.fcp = entry.startTime;
          }
          if (entry.entryType === 'largest-contentful-paint') {
            vitals.lcp = entry.startTime;
          }
          if (entry.entryType === 'first-input') {
            vitals.fid = (entry as any).processingStart - entry.startTime;
          }
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            vitals.cls += (entry as any).value;
          }
          if (entry.entryType === 'navigation') {
            vitals.ttfb = (entry as any).responseStart - entry.startTime;
          }
        });

        resolve(vitals);
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
      
      // Fallback timeout
      setTimeout(() => resolve({}), 5000);
    });
  }
}

export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  name?: string
): React.ComponentType<P> {
  const componentName = name || Component.displayName || Component.name || 'Component';
  
  return React.memo((props: P) => {
    const monitor = PerformanceMonitor.getInstance();
    
    React.useEffect(() => {
      monitor.startTimer(`${componentName}-render`);
      return () => {
        monitor.endTimer(`${componentName}-render`);
      };
    }, []);

    return React.createElement(Component, props);
  });
}
