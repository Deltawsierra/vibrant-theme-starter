
import React from 'react';
import EcommerceLayout from '../components/EcommerceLayout';

const EcommerceShowcase = () => {
  return (
    <EcommerceLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">E-commerce – Showcase Page</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is a placeholder for the Showcase page in the E-commerce theme.
          </p>
          <p>
            Featured work will be displayed as premium products with detailed galleries and customer testimonials.
          </p>
          <p>
            The showcase emphasizes quality, value proposition, and social proof to drive conversions.
          </p>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default EcommerceShowcase;
