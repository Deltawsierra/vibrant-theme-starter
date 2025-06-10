
import React from 'react';
import ThreeDLayout from '../components/ThreeDLayout';

const ThreeDInteractiveWork: React.FC = () => {
  return (
    <ThreeDLayout>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">3D Interactive – Work Page</h1>
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed bg-slate-800 bg-opacity-80 p-8 rounded-lg backdrop-blur-sm">
          <p>
            This is a placeholder for the Work page in the 3D Interactive theme.
          </p>
          <p>
            Portfolio projects will be displayed as 3D objects that users can interact with and explore.
          </p>
          <p>
            Each project will have its own space in the virtual environment.
          </p>
        </div>
      </div>
    </ThreeDLayout>
  );
};

export default ThreeDInteractiveWork;
