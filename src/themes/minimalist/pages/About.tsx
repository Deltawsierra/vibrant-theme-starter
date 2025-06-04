
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistAbout = () => {
  return (
    <MinimalistLayout>
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="space-y-16">
          <div className="text-center">
            <h1 className="text-6xl font-magneti font-light mb-8 text-gray-900 dark:text-gray-100">
              About
            </h1>
          </div>
          
          <div className="space-y-12">
            <div className="text-center">
              <p className="text-2xl font-magneti font-light leading-relaxed text-gray-700 dark:text-gray-300">
                Senior Full-Stack Developer
              </p>
            </div>
            
            <div className="space-y-8 text-lg font-magneti font-light leading-loose text-gray-600 dark:text-gray-400">
              <p>
                Specialized in creating scalable web applications with modern technologies. 
                Experience spans frontend frameworks, backend architecture, and database design.
              </p>
              
              <p>
                Focused on clean code, performance optimization, and user-centered design. 
                Committed to delivering solutions that balance technical excellence with business objectives.
              </p>
              
              <p>
                Available for consulting, full-time opportunities, and collaborative projects.
              </p>
            </div>
            
            <div className="pt-8">
              <div className="text-center">
                <h2 className="text-3xl font-magneti font-light mb-8 text-gray-800 dark:text-gray-200">
                  Technical Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base font-magneti text-gray-600 dark:text-gray-400">
                  <div>Frontend Development</div>
                  <div>Backend Architecture</div>
                  <div>Database Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistAbout;
