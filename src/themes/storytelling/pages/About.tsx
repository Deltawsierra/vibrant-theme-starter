
import React from 'react';
import StoryLayout from '../components/StoryLayout';

const StorytellingAbout = () => {
  return (
    <StoryLayout>
      <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">
        Storytelling – About Page
      </h1>
      <div className="space-y-6 text-lg leading-relaxed">
        <p className="text-amber-900 first-letter:text-6xl first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
          Once upon a time, in a digital realm far away, there lived a storyteller who crafted narratives that transported readers to magical worlds...
        </p>
        <p>
          This is a placeholder for the About page in the Storytelling theme. Content will be presented as an immersive narrative experience with rich typography and storybook aesthetics.
        </p>
        <p>
          Each page will unfold like chapters in a book, with progress tracked through the timeline at the top of the screen.
        </p>
      </div>
    </StoryLayout>
  );
};

export default StorytellingAbout;
