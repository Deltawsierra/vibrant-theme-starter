
import React from 'react';
import { useStoryProgress } from '../hooks/useStoryProgress';

interface TimelineSection {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

const ProgressTimeline: React.FC = () => {
  const { 
    progress, 
    getProgressPercentage, 
    setCurrentChapter,
    setCurrentSection,
    completedSections 
  } = useStoryProgress();

  const sections: TimelineSection[] = [
    { id: 'about', title: 'About', completed: completedSections.includes('about'), current: progress.currentSection === 'about' },
    { id: 'work', title: 'Work', completed: completedSections.includes('work'), current: progress.currentSection === 'work' },
    { id: 'contact', title: 'Contact', completed: completedSections.includes('contact'), current: progress.currentSection === 'contact' },
    { id: 'showcase', title: 'Showcase', completed: completedSections.includes('showcase'), current: progress.currentSection === 'showcase' },
  ];

  const handleSectionClick = (sectionId: string, index: number) => {
    // Only allow navigation to completed sections or the next section
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    const canNavigate = sections[sectionIndex].completed || sectionIndex <= completedSections.length;
    
    if (canNavigate) {
      setCurrentChapter(index + 1);
      setCurrentSection(sectionId);
      // Navigate to section - would integrate with router in full implementation
      console.log(`Navigating to section: ${sectionId}`);
    }
  };

  return (
    <div className="fixed top-16 left-4 z-40 bg-amber-100 p-4 rounded-lg shadow-lg border border-amber-300 max-w-xs">
      <div className="text-sm font-medium text-amber-800 mb-3">
        Story Progress: {Math.round(getProgressPercentage())}%
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-amber-200 rounded-full mb-4">
        <div 
          className="h-full bg-amber-600 rounded-full transition-all duration-500"
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      {/* Section Timeline */}
      <div className="space-y-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id, index)}
            disabled={!section.completed && !section.current && index > completedSections.length}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              section.current
                ? 'bg-amber-600 text-white'
                : section.completed
                ? 'bg-amber-300 text-amber-900 hover:bg-amber-400'
                : 'bg-amber-200 text-amber-600 opacity-50 cursor-not-allowed'
            }`}
            aria-label={`${section.title} - ${section.completed ? 'Completed' : section.current ? 'Current' : 'Locked'}`}
          >
            <div className="flex items-center justify-between">
              <span>{section.title}</span>
              <span className="text-xs">
                {section.completed ? '✓' : section.current ? '▶' : '○'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Chapter indicator */}
      <div className="mt-4 pt-3 border-t border-amber-300">
        <div className="text-xs text-amber-700">
          Chapter {progress.currentChapter} of {progress.totalChapters}
        </div>
      </div>
    </div>
  );
};

export default ProgressTimeline;
