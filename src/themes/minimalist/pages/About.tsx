
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistAbout = () => {
  return (
    <MinimalistLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Minimalist – About Page</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>This is a placeholder for the About page in the Minimalist theme.</p>
          <p>Content will be clean, typography-focused, and use only grayscale colors.</p>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistAbout;
