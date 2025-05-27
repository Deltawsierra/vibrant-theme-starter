
import React from 'react';
import StoryLayout from '../components/StoryLayout';

const StorytellingShowcase = () => {
  return (
    <StoryLayout>
      <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">
        Storytelling – Showcase Page
      </h1>
      <div className="space-y-6 text-lg leading-relaxed">
        <p className="text-amber-900 first-letter:text-6xl first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
          In this grand anthology, the most treasured tales are gathered for all to witness and wonder...
        </p>
        <p>
          This is a placeholder for the Showcase page in the Storytelling theme. Featured work will be presented as epic tales and legendary achievements.
        </p>
        <p>
          Each showcase item will unfold as a complete story, with beginning, middle, and triumphant conclusion.
        </p>
      </div>
    </StoryLayout>
  );
};

export default StorytellingShowcase;
