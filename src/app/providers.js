'use client';

import * as React from 'react';
import { ThemeProvider } from '@teispace/next-themes';

// Suppress the React 19 "Encountered a script tag" warning in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    orig.apply(console, args);
  };
}

export function Providers({ children }) {
  // Use 'ThemeProvider' here, as that is what you imported from '@teispace/next-themes'
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}