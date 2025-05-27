
import React from 'react';
import ArcadeLayout from '../components/ArcadeLayout';

const RetroArcadeWork = () => {
  return (
    <ArcadeLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400 text-center">RETRO ARCADE – WORK PAGE</h1>
        <div className="space-y-6 text-lg leading-relaxed text-green-400 font-mono">
          <p className="border-2 border-magenta-400 p-4 bg-magenta-400/10">
            &gt; THIS IS A PLACEHOLDER FOR THE WORK PAGE IN THE RETRO ARCADE THEME.
          </p>
          <p className="border-2 border-cyan-400 p-4 bg-cyan-400/10">
            &gt; PORTFOLIO PROJECTS WILL BE DISPLAYED AS ARCADE GAME CABINETS.
          </p>
          <p className="border-2 border-yellow-400 p-4 bg-yellow-400/10 text-yellow-400">
            &gt; INSERT COIN TO VIEW PORTFOLIO ITEMS!
          </p>
        </div>
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeWork;
