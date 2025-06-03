
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistContact = () => {
  return (
    <MinimalistLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is the Contact page in the Minimalist theme.
          </p>
          <p>
            Contact information is presented in the simplest, most accessible format possible.
          </p>
          <p>
            Clean forms and direct communication channels without unnecessary embellishment.
          </p>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistContact;
