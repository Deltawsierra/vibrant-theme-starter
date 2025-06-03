
import React from 'react';
import EcommerceLayout from '../components/EcommerceLayout';

const EcommerceWork = () => {
  return (
    <EcommerceLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">E-commerce – Work Page</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is a placeholder for the Work page in the E-commerce theme.
          </p>
          <p>
            Portfolio projects will be displayed as products in a catalog format with detailed specifications and purchasing options.
          </p>
          <p>
            Each project can be added to cart and includes comprehensive project details and deliverables.
          </p>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default EcommerceWork;
