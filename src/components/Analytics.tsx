
import React, { useEffect } from 'react';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  private static instance: Analytics;
  private isProduction = import.meta.env.PROD;
  private isDevelopment = import.meta.env.DEV;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public track(event: AnalyticsEvent) {
    if (this.isDevelopment) {
      console.log('Analytics Event (Dev):', event);
      return;
    }

    if (!this.isProduction) return;

    // Privacy-friendly analytics tracking
    const anonymizedEvent = {
      ...event,
      timestamp: Date.now(),
      page: window.location.pathname,
      // Remove any potential PII
      properties: this.sanitizeProperties(event.properties || {})
    };

    console.log('Analytics Event:', anonymizedEvent);
    // TODO: Send to analytics service (Plausible, PostHog, etc.)
  }

  private sanitizeProperties(properties: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(properties)) {
      // Skip potential PII fields
      if (this.isPotentialPII(key)) {
        continue;
      }
      
      // Sanitize string values
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  private isPotentialPII(key: string): boolean {
    const piiFields = ['email', 'phone', 'address', 'name', 'ip', 'userAgent'];
    return piiFields.some(field => key.toLowerCase().includes(field));
  }

  private sanitizeString(value: string): string {
    // Remove email patterns
    return value.replace(/\S+@\S+\.\S+/g, '[email]');
  }

  // Common tracking methods
  public trackPageView(page: string, theme?: string) {
    this.track({
      name: 'page_view',
      properties: { page, theme }
    });
  }

  public trackThemeSelection(theme: string) {
    this.track({
      name: 'theme_selected',
      properties: { theme }
    });
  }

  public trackGamePlay(gameType: string, score?: number) {
    this.track({
      name: 'game_played',
      properties: { gameType, score }
    });
  }

  public trackConversion(type: string, value?: number) {
    this.track({
      name: 'conversion',
      properties: { type, value }
    });
  }

  public trackError(error: string, context?: string) {
    this.track({
      name: 'error',
      properties: { error, context }
    });
  }
}

const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize analytics
    const analytics = Analytics.getInstance();
    analytics.trackPageView(window.location.pathname);
  }, []);

  return <>{children}</>;
};

export { Analytics, AnalyticsProvider };
