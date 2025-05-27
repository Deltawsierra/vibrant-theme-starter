
import React from 'react';
import EcommerceLayout from '../components/EcommerceLayout';

const EcommerceAbout = () => {
  return (
    <EcommerceLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">E-commerce – About Page</h1>
        <div className="space-y-6 text-lg leading-relaxed bg-white p-8 rounded-lg shadow-md">
          <p>
            This is a placeholder for the About page in the E-commerce theme.
          </p>
          <p>
            Content will be presented in a clean, modern layout optimized for product discovery and sales conversion.
          </p>
          <p>
            The design focuses on trust-building elements and clear information hierarchy.
          </p>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default EcommerceAbout;
