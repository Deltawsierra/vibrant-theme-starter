
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';
import ContactForm from '../components/ContactForm';
import { useDarkMode } from '../hooks/useDarkMode';

const MinimalistContact = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <MinimalistLayout>
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="space-y-16">
          <div className="text-center">
            <h1 className="text-6xl font-magneti font-light mb-8 text-gray-900 dark:text-gray-100">
              Contact
            </h1>
          </div>
          
          <div className="space-y-12">
            <div className="text-center">
              <p className="text-xl font-magneti font-light leading-relaxed text-gray-600 dark:text-gray-400">
                Available for new projects and collaborations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-magneti font-light mb-4 text-gray-800 dark:text-gray-200">
                    Direct Contact
                  </h2>
                  <div className="space-y-3 text-lg font-magneti text-gray-600 dark:text-gray-400">
                    <div>hello@portfolio.dev</div>
                    <div>+1 555 123 4567</div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-magneti font-light mb-4 text-gray-800 dark:text-gray-200">
                    Response Time
                  </h2>
                  <p className="text-lg font-magneti text-gray-600 dark:text-gray-400">
                    Within 24 hours
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-magneti font-light mb-8 text-gray-800 dark:text-gray-200">
                  Send Message
                </h2>
                <ContactForm isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistContact;
