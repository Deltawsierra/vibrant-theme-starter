
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistShowcase = () => {
  return (
    <MinimalistLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Minimalist – Showcase Page</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>This is a placeholder for the Showcase page in the Minimalist theme.</p>
          <p>Featured work will be presented with elegant simplicity and clear hierarchy.</p>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistShowcase;
