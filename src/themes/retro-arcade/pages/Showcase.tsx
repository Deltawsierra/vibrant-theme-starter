
import React from 'react';
import ArcadeLayout from '../components/ArcadeLayout';
import { useArcade } from '../context/ArcadeContext';

const RetroArcadeShowcase = () => {
  const { settings } = useArcade();

  const featuredProjects = [
    {
      title: 'ENTERPRISE FORTRESS',
      type: 'FINAL BOSS',
      difficulty: '★★★★★',
      color: 'arcade-neon-cyan',
      health: 100,
      damage: 95,
      description: 'The ultimate challenge - a complete enterprise solution that handles massive scale.',
      abilities: ['Auto-scaling', 'Load Balancing', 'Zero Downtime', 'Real-time Sync']
    },
    {
      title: 'AI INTEGRATION DRAGON',
      type: 'SECRET BOSS',
      difficulty: '★★★★☆',
      color: 'arcade-neon-magenta',
      health: 85,
      damage: 90,
      description: 'Hidden challenge unlocked - machine learning and AI integration mastery.',
      abilities: ['Neural Networks', 'Data Processing', 'Predictive Analytics', 'NLP']
    },
    {
      title: 'PERFORMANCE DEMON',
      type: 'SPEED BOSS',
      difficulty: '★★★☆☆',
      color: 'arcade-neon-yellow',
      health: 70,
      damage: 88,
      description: 'Lightning-fast optimization challenges that push performance to the limit.',
      abilities: ['Code Splitting', 'Lazy Loading', 'Caching', 'Minification']
    }
  ];

  return (
    <ArcadeLayout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Boss Battle Header */}
        <div className="text-center mb-16">
          <div className={`text-7xl font-pixel font-bold text-arcade-neon-red mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            FINAL STAGE
          </div>
          <div className="text-2xl font-pixel text-arcade-neon-yellow">
            ⚡ BOSS BATTLE ARENA ⚡
          </div>
          <div className="text-sm font-pixel text-arcade-neon-green mt-2">
            WARNING: MAXIMUM DIFFICULTY SHOWCASE
          </div>
        </div>

        {/* Boss Battle Arena */}
        <div className="space-y-12">
          {featuredProjects.map((boss, index) => (
            <div key={index} className={`bg-black/90 border-4 border-${boss.color} p-8 relative overflow-hidden`}>
              {/* Boss Arena Background */}
              <div className="absolute inset-0 opacity-10">
                <div className={`w-full h-full bg-gradient-to-br from-${boss.color}/30 to-transparent`}></div>
              </div>

              <div className="relative z-10">
                {/* Boss Name and Type */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className={`text-4xl font-pixel font-bold text-${boss.color} mb-2 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                      {boss.title}
                    </div>
                    <div className={`text-lg font-pixel text-${boss.color} opacity-80`}>
                      {boss.type} | DIFFICULTY: {boss.difficulty}
                    </div>
                  </div>
                  <div className={`text-right text-${boss.color} font-pixel text-sm`}>
                    <div>STAGE {index + 1}/3</div>
                    <div className={settings.enableGlow ? 'animate-pixel-blink' : ''}>PREPARE FOR BATTLE</div>
                  </div>
                </div>

                {/* Boss Health Bar */}
                <div className="mb-8">
                  <div className={`text-${boss.color} font-pixel text-sm mb-2`}>BOSS HEALTH</div>
                  <div className={`w-full h-6 bg-gray-800 border-2 border-${boss.color} relative overflow-hidden`}>
                    <div 
                      className={`h-full bg-gradient-to-r from-${boss.color} to-red-500 ${settings.enableGlow ? 'animate-neon-glow' : ''}`}
                      style={{ width: `${boss.health}%` }}
                    ></div>
                    <div className={`absolute inset-0 flex items-center justify-center text-${boss.color} font-pixel font-bold text-xs`}>
                      {boss.health}/100 HP
                    </div>
                  </div>
                </div>

                {/* Boss Stats and Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className={`text-xl font-pixel font-bold text-${boss.color} mb-4`}>
                      BOSS DESCRIPTION
                    </div>
                    <div className={`text-${boss.color} font-pixel text-sm leading-relaxed mb-6 opacity-90`}>
                      {boss.description}
                    </div>
                    
                    {/* Attack Damage */}
                    <div className="mb-4">
                      <div className={`text-${boss.color} font-pixel text-sm mb-2`}>ATTACK POWER</div>
                      <div className={`w-full h-4 bg-gray-800 border border-${boss.color}`}>
                        <div 
                          className={`h-full bg-gradient-to-r from-red-500 to-${boss.color} ${settings.enableGlow ? 'animate-neon-glow' : ''}`}
                          style={{ width: `${boss.damage}%` }}
                        ></div>
                      </div>
                      <div className={`text-${boss.color} font-pixel text-xs mt-1`}>{boss.damage}/100 DMG</div>
                    </div>
                  </div>

                  <div>
                    <div className={`text-xl font-pixel font-bold text-${boss.color} mb-4`}>
                      SPECIAL ABILITIES
                    </div>
                    <div className="space-y-3">
                      {boss.abilities.map((ability, abilityIndex) => (
                        <div key={abilityIndex} className={`bg-${boss.color}/10 border border-${boss.color} p-3 flex items-center`}>
                          <div className={`w-6 h-6 bg-${boss.color} mr-3 flex items-center justify-center text-black font-pixel font-bold text-xs`}>
                            {abilityIndex + 1}
                          </div>
                          <div className={`text-${boss.color} font-pixel text-sm`}>{ability}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Battle Actions */}
                <div className="flex justify-center space-x-4">
                  <button className={`px-6 py-3 bg-${boss.color}/20 border-2 border-${boss.color} text-${boss.color} font-pixel font-bold hover:bg-${boss.color} hover:text-black transition-colors ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                    ATTACK
                  </button>
                  <button className={`px-6 py-3 bg-arcade-neon-green/20 border-2 border-arcade-neon-green text-arcade-neon-green font-pixel font-bold hover:bg-arcade-neon-green hover:text-black transition-colors`}>
                    DEFEND
                  </button>
                  <button className={`px-6 py-3 bg-arcade-neon-yellow/20 border-2 border-arcade-neon-yellow text-arcade-neon-yellow font-pixel font-bold hover:bg-arcade-neon-yellow hover:text-black transition-colors`}>
                    SPECIAL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Victory Screen */}
        <div className="bg-black/90 border-4 border-arcade-neon-yellow p-12 text-center mt-16">
          <div className={`text-5xl font-pixel font-bold text-arcade-neon-yellow mb-6 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            🏆 CONGRATULATIONS! 🏆
          </div>
          <div className="text-2xl font-pixel text-arcade-neon-green mb-4">
            ALL BOSSES DEFEATED!
          </div>
          <div className="text-lg font-pixel text-arcade-neon-cyan mb-8">
            YOU HAVE WITNESSED THE ULTIMATE PORTFOLIO SHOWCASE
          </div>
          
          {/* Final Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'TOTAL SCORE', value: '999,999', color: 'arcade-neon-yellow' },
              { label: 'BOSSES DEFEATED', value: '3/3', color: 'arcade-neon-green' },
              { label: 'COMPLETION TIME', value: '00:15:42', color: 'arcade-neon-cyan' },
              { label: 'RANK ACHIEVED', value: 'S++', color: 'arcade-neon-magenta' }
            ].map(({ label, value, color }) => (
              <div key={label} className={`bg-${color}/10 border-2 border-${color} p-4`}>
                <div className={`text-${color} font-pixel text-sm mb-2`}>{label}</div>
                <div className={`text-${color} font-pixel font-bold text-xl ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Credits Roll */}
          <div className={`text-arcade-neon-green font-pixel text-sm mb-6 ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
            PRESS START TO PLAY AGAIN
          </div>
          <div className="text-arcade-neon-magenta font-pixel text-xs">
            THANK YOU FOR EXPERIENCING THE RETRO ARCADE PORTFOLIO
          </div>
        </div>
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeShowcase;
