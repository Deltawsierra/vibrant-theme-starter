
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistWork = () => {
  return (
    <MinimalistLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Work</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is the Work page in the Minimalist theme.
          </p>
          <p>
            Portfolio projects are displayed with minimal visual noise and maximum focus on the content itself.
          </p>
          <p>
            Each project is presented with clean layouts and essential details only.
          </p>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistWork;
