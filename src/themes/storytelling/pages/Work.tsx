
import React from 'react';
import StoryLayout from '../components/StoryLayout';

const StorytellingWork: React.FC = () => {
  return (
    <StoryLayout>
      <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">
        Storytelling – Work Page
      </h1>
      <div className="space-y-6 text-lg leading-relaxed">
        <p className="text-amber-900 first-letter:text-6xl first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
          In the grand library of accomplishments, each project tells its own unique tale...
        </p>
        <p>
          This is a placeholder for the Work page in the Storytelling theme. Portfolio pieces will be presented as individual stories, each with their own narrative arc and visual journey.
        </p>
        <p>
          Visitors will experience the work through an immersive storytelling format, complete with chapters, character development, and plot progression.
        </p>
      </div>
    </StoryLayout>
  );
};

export default StorytellingWork;
