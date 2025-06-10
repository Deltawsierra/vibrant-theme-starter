
import React from 'react';
import MinimalistLayout from '../components/MinimalistLayout';

const MinimalistWork: React.FC = () => {
  const projects = [
    {
      title: "Enterprise SaaS Platform",
      year: "2024",
      description: "Full-stack web application serving 10,000+ users with real-time collaboration features."
    },
    {
      title: "E-commerce Infrastructure",
      year: "2023", 
      description: "Scalable backend system processing high-volume transactions with 99.9% uptime."
    },
    {
      title: "Data Visualization Dashboard",
      year: "2023",
      description: "Interactive analytics platform for complex dataset analysis and reporting."
    }
  ];

  return (
    <MinimalistLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-16">
          <div className="text-center">
            <h1 className="text-6xl font-magneti font-light mb-8 text-gray-900 dark:text-gray-100">
              Work
            </h1>
          </div>
          
          <div className="space-y-16">
            {projects.map((project, index) => (
              <div key={index} className="border-t border-gray-300 dark:border-gray-700 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-1">
                    <div className="text-lg font-magneti text-gray-500 dark:text-gray-500">
                      {project.year}
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <h2 className="text-3xl font-magneti font-light text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h2>
                    <p className="text-lg font-magneti font-light leading-relaxed text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-16">
            <p className="text-lg font-magneti font-light text-gray-600 dark:text-gray-400">
              Additional projects available upon request
            </p>
          </div>
        </div>
      </div>
    </MinimalistLayout>
  );
};

export default MinimalistWork;
