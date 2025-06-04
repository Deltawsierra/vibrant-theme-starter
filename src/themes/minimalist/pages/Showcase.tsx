
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistShowcase = () => {
  const showcaseItems = [
    {
      category: "Development",
      title: "Full-Stack Architecture",
      description: "Scalable systems built with modern frameworks and cloud infrastructure."
    },
    {
      category: "Design",
      title: "User Interface Systems",
      description: "Clean, functional interfaces focused on user experience and accessibility."
    },
    {
      category: "Strategy",
      title: "Technical Consulting",
      description: "Strategic guidance for technology decisions and implementation planning."
    }
  ];

  return (
    <MinimalistLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-16">
          <div className="text-center">
            <h1 className="text-6xl font-magneti font-light mb-8 text-gray-900 dark:text-gray-100">
              Showcase
            </h1>
          </div>
          
          <div className="space-y-16">
            {showcaseItems.map((item, index) => (
              <div key={index} className="space-y-6">
                <div className="text-center">
                  <div className="text-sm font-magneti font-medium tracking-wider uppercase text-gray-500 dark:text-gray-500 mb-2">
                    {item.category}
                  </div>
                  <h2 className="text-4xl font-magneti font-light text-gray-900 dark:text-gray-100 mb-4">
                    {item.title}
                  </h2>
                  <p className="text-xl font-magneti font-light leading-relaxed text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {item.description}
                  </p>
                </div>
                {index < showcaseItems.length - 1 && (
                  <div className="pt-16">
                    <div className="w-16 h-px bg-gray-300 dark:bg-gray-700 mx-auto"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center pt-16">
            <p className="text-lg font-magneti font-light text-gray-600 dark:text-gray-400">
              Detailed case studies available upon request
            </p>
          </div>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistShowcase;
