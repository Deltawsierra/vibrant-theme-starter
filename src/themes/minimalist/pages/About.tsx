
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistAbout = () => {
  return (
    <MinimalistLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is the About page in the Minimalist theme.
          </p>
          <p>
            Content is presented with clean typography, generous whitespace, and focus on essential information.
          </p>
          <p>
            The design emphasizes clarity and readability above all else.
          </p>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistAbout;
