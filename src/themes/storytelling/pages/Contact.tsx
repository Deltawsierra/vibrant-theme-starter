
import React from 'react';
import StoryLayout from '../components/StoryLayout';

const StorytellingContact = () => {
  return (
    <StoryLayout>
      <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">
        Storytelling – Contact Page
      </h1>
      <div className="space-y-6 text-lg leading-relaxed">
        <p className="text-amber-900 first-letter:text-6xl first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
          Every great story begins with a conversation, a meeting of minds across the digital divide...
        </p>
        <p>
          This is a placeholder for the Contact page in the Storytelling theme. The contact form will be presented as a way to begin a new chapter together.
        </p>
        <p>
          Visitors will be invited to share their own story and begin a collaborative narrative journey.
        </p>
      </div>
    </StoryLayout>
  );
};

export default StorytellingContact;
