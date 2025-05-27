
import React from 'react';
import EcommerceLayout from '../components/EcommerceLayout';

const EcommerceShowcase = () => {
  return (
    <EcommerceLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">E-commerce – Showcase Page</h1>
        <div className="space-y-6 text-lg leading-relaxed bg-white p-8 rounded-lg shadow-md">
          <p>
            This is a placeholder for the Showcase page in the E-commerce theme.
          </p>
          <p>
            Featured work will be displayed as premium product collections with detailed descriptions and promotional elements.
          </p>
          <p>
            The showcase emphasizes value propositions and conversion optimization.
          </p>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default EcommerceShowcase;
