
import React from 'react';
import VideographyLayout from '../components/VideographyLayout';

const VideographyWork: React.FC = () => {
  return (
    <VideographyLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Videography – Work Page</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is a placeholder for the Work page in the Videography theme.
          </p>
          <p>
            Portfolio videos will be displayed in a spotlight format with accompanying project information in side drawers.
          </p>
          <p>
            Each video can be expanded to full-screen lightbox mode for immersive viewing.
          </p>
        </div>
      </div>
    </VideographyLayout>
  );
};

export default VideographyWork;
