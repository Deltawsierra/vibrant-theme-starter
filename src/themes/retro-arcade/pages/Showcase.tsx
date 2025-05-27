
import React from 'react';
import ArcadeLayout from '../components/ArcadeLayout';

const RetroArcadeShowcase = () => {
  return (
    <ArcadeLayout>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400 text-center">RETRO ARCADE – SHOWCASE PAGE</h1>
        <div className="space-y-6 text-lg leading-relaxed text-green-400 font-mono">
          <p className="border-2 border-magenta-400 p-4 bg-magenta-400/10">
            &gt; THIS IS A PLACEHOLDER FOR THE SHOWCASE PAGE IN THE RETRO ARCADE THEME.
          </p>
          <p className="border-2 border-cyan-400 p-4 bg-cyan-400/10">
            &gt; FEATURED WORK WILL BE PRESENTED AS BOSS BATTLES AND ACHIEVEMENTS.
          </p>
          <p className="border-2 border-yellow-400 p-4 bg-yellow-400/10 text-yellow-400">
            &gt; FINAL BOSS: ULTIMATE PORTFOLIO SHOWCASE!
          </p>
        </div>
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeShowcase;
