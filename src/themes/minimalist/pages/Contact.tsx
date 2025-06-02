
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';
import ContactForm from '../components/ContactForm';
import { useDarkMode } from '../hooks/useDarkMode';

const MinimalistContact = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <MinimalistLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <div className="space-y-8">
          <div className="text-lg leading-relaxed">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Get in touch with any questions, project inquiries, or collaboration opportunities.
            </p>
          </div>
          <ContactForm isDarkMode={isDarkMode} />
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistContact;
