
import React from 'react';
import VideographyLayout from '../components/VideographyLayout';

const VideographyAbout = () => {
  return (
    <VideographyLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Videography – About Page</h1>
        <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            This is a placeholder for the About page in the Videography theme.
          </p>
          <p>
            Content will be presented with cinematic flair, featuring video backgrounds and professional storytelling.
          </p>
          <p>
            The layout can switch between cinematic (dark) and editorial (bright) modes.
          </p>
        </div>
      </div>
    </VideographyLayout>
  );
};

export default VideographyAbout;
