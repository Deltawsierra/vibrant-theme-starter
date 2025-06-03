
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistShowcase = () => {
  return (
    <MinimalistLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Showcase</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is the Showcase page in the Minimalist theme.
          </p>
          <p>
            Featured work is presented with understated elegance and focus on quality over quantity.
          </p>
          <p>
            Every element serves a purpose and nothing is included without clear value.
          </p>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistShowcase;
