
import React, { useEffect } from 'react';

interface ErrorEvent {
  message: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
  timestamp: number;
  userAgent: string;
  url: string;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorEvent[] = [];
  private isProduction = import.meta.env.PROD;

  private constructor() {
    this.setupErrorHandlers();
  }

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  private setupErrorHandlers() {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });
  }

  private logError(errorEvent: ErrorEvent) {
    this.errors.push(errorEvent);
    
    if (this.isProduction) {
      // In production, send to error reporting service
      console.error('Error tracked:', errorEvent);
      // TODO: Send to actual error reporting service (Sentry, LogRocket, etc.)
    } else {
      // In development, just log to console
      console.error('Development Error:', errorEvent);
    }
  }

  public logCustomError(message: string, context?: Record<string, any>) {
    this.logError({
      message: `Custom Error: ${message}`,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      error: context ? new Error(JSON.stringify(context)) : undefined
    });
  }

  public getErrors(): ErrorEvent[] {
    return [...this.errors];
  }

  public clearErrors() {
    this.errors = [];
  }
}

const ErrorTrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize error tracker
    ErrorTracker.getInstance();
  }, []);

  return <>{children}</>;
};

export { ErrorTracker, ErrorTrackerProvider };
