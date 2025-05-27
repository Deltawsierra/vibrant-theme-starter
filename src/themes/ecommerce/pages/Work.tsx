
import React from 'react';
import EcommerceLayout from '../components/EcommerceLayout';

const EcommerceWork = () => {
  return (
    <EcommerceLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">E-commerce – Work Page</h1>
        <div className="space-y-6 text-lg leading-relaxed bg-white p-8 rounded-lg shadow-md">
          <p>
            This is a placeholder for the Work page in the E-commerce theme.
          </p>
          <p>
            Portfolio projects will be displayed as product listings with detailed specifications and pricing information.
          </p>
          <p>
            Each project will include features like reviews, ratings, and purchase options.
          </p>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default EcommerceWork;
