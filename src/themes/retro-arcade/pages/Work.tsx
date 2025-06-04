
import React from 'react';
import ArcadeLayout from '../components/ArcadeLayout';
import { useArcade } from '../context/ArcadeContext';

const RetroArcadeWork = () => {
  const { settings } = useArcade();

  const projects = [
    {
      title: 'ENTERPRISE SAAS',
      subtitle: 'PLATFORM FIGHTER',
      year: '2024',
      genre: 'Strategy RPG',
      difficulty: '★★★★★',
      color: 'arcade-neon-cyan',
      description: 'Full-stack web application serving 10,000+ users with real-time collaboration features.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      status: 'COMPLETED'
    },
    {
      title: 'E-COMMERCE',
      subtitle: 'INFRASTRUCTURE',
      year: '2023',
      genre: 'Racing Sim',
      difficulty: '★★★★☆',
      color: 'arcade-neon-magenta',
      description: 'Scalable backend system processing high-volume transactions with 99.9% uptime.',
      tech: ['Python', 'Docker', 'Kubernetes', 'AWS'],
      status: 'COMPLETED'
    },
    {
      title: 'DATA VISUALIZATION',
      subtitle: 'DASHBOARD',
      year: '2023',
      genre: 'Puzzle Adventure',
      difficulty: '★★★☆☆',
      color: 'arcade-neon-yellow',
      description: 'Interactive analytics platform for complex dataset analysis and reporting.',
      tech: ['React', 'D3.js', 'Python', 'ML'],
      status: 'COMPLETED'
    }
  ];

  return (
    <ArcadeLayout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Game Selection Header */}
        <div className="text-center mb-16">
          <div className={`text-6xl font-pixel font-bold text-arcade-neon-cyan mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            GAME SELECT
          </div>
          <div className="text-xl font-pixel text-arcade-neon-yellow">
            ▼ CHOOSE YOUR ADVENTURE ▼
          </div>
          <div className="text-sm font-pixel text-arcade-neon-green mt-2">
            INSERT COIN TO VIEW PROJECT DETAILS
          </div>
        </div>

        {/* Project Game Cabinets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} className={`bg-black/80 border-4 border-${project.color} p-6 relative group hover:bg-${project.color}/10 transition-colors cursor-pointer`}>
              {/* Cabinet Screen */}
              <div className={`bg-gradient-to-br from-black to-gray-900 border-2 border-${project.color} p-4 mb-4 relative overflow-hidden`}>
                {/* Scanlines */}
                <div className="absolute inset-0 bg-repeat-y opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgMSA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cmVjdCB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHN2Zz4K')]"></div>
                
                <div className={`text-2xl font-pixel font-bold text-${project.color} mb-2 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                  {project.title}
                </div>
                <div className={`text-lg font-pixel text-${project.color} opacity-80 mb-4`}>
                  {project.subtitle}
                </div>
                
                {/* Game Info */}
                <div className="space-y-2 text-sm font-pixel">
                  <div className={`text-${project.color}`}>
                    YEAR: {project.year} | GENRE: {project.genre}
                  </div>
                  <div className={`text-${project.color}`}>
                    DIFFICULTY: {project.difficulty}
                  </div>
                  <div className={`text-${project.color} font-bold ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
                    STATUS: {project.status}
                  </div>
                </div>

                {/* Fake Game Screen */}
                <div className="mt-4 h-24 bg-gray-900 border border-gray-700 flex items-center justify-center">
                  <div className={`text-${project.color} font-pixel text-xs ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
                    [GAME PREVIEW]
                  </div>
                </div>
              </div>

              {/* Cabinet Controls */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  {['A', 'B', 'X', 'Y'].map((button) => (
                    <div key={button} className={`w-8 h-8 rounded-full border-2 border-${project.color} bg-${project.color}/20 flex items-center justify-center text-${project.color} font-pixel text-xs font-bold`}>
                      {button}
                    </div>
                  ))}
                </div>
                <div className={`text-${project.color} font-pixel text-xs`}>
                  1 PLAYER
                </div>
              </div>

              {/* Project Description */}
              <div className={`text-${project.color} font-pixel text-xs leading-relaxed mb-4 opacity-90`}>
                {project.description}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className={`px-2 py-1 bg-${project.color}/20 border border-${project.color} text-${project.color} font-pixel text-xs`}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Insert Coin Prompt */}
              <div className={`text-center py-2 border-2 border-${project.color} bg-${project.color}/10 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                <div className={`text-${project.color} font-pixel font-bold text-sm`}>
                  INSERT COIN TO PLAY
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* High Score Board */}
        <div className="bg-black/80 border-4 border-arcade-neon-green p-8">
          <div className={`text-3xl font-pixel font-bold text-arcade-neon-green text-center mb-8 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            🏆 HIGH SCORES 🏆
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { rank: '1ST', name: 'CLIENT SATISFACTION', score: '99.9%', color: 'arcade-neon-yellow' },
              { rank: '2ND', name: 'PROJECT DELIVERY', score: '100%', color: 'arcade-neon-cyan' },
              { rank: '3RD', name: 'CODE QUALITY', score: '96.5%', color: 'arcade-neon-magenta' }
            ].map(({ rank, name, score, color }) => (
              <div key={rank} className={`text-center border-2 border-${color} p-4 bg-${color}/10`}>
                <div className={`text-2xl font-pixel font-bold text-${color} mb-2`}>{rank}</div>
                <div className={`text-sm font-pixel text-${color} mb-2`}>{name}</div>
                <div className={`text-xl font-pixel font-bold text-${color} ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>{score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Screen */}
        <div className="text-center mt-16">
          <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow mb-4 ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
            CONTINUE? 10... 9... 8...
          </div>
          <div className="text-arcade-neon-green font-pixel">
            INSERT COIN FOR MORE PROJECTS
          </div>
        </div>
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeWork;
