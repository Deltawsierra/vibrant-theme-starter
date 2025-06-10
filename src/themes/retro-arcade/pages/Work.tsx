
import React from 'react';
import ArcadeLayout from '../components/ArcadeLayout';
import { useArcade } from '../context/ArcadeContext';

const RetroArcadeWork: React.FC = () => {
  const { settings } = useArcade();

  const projects = [
    {
      title: 'ENTERPRISE SAAS',
      subtitle: 'PLATFORM ARCHITECT',
      year: '2016-2025',
      company: 'Digital Systems Forge LLC',
      genre: 'Strategy RPG',
      difficulty: '★★★★★',
      color: 'arcade-neon-cyan',
      description: 'Principal Engineer leading serverless architecture for enterprise SaaS platform serving 50,000+ users with real-time collaboration.',
      tech: ['React', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'WebSocket'],
      achievements: ['Zero-downtime deployments', 'Cost optimization 40%', 'Performance boost 60%'],
      status: 'MISSION COMPLETE'
    },
    {
      title: 'LEGACY MIGRATION',
      subtitle: 'SYSTEM MODERNIZER',
      year: '2020-2022',
      company: 'Digital Systems Forge LLC',
      genre: 'Epic Adventure',
      difficulty: '★★★★★',
      color: 'arcade-neon-magenta',
      description: 'Led critical migration of legacy monolith to microservices, affecting 50,000+ active users with zero data loss.',
      tech: ['Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      achievements: ['100% uptime during migration', 'Performance improved 3x', 'Team mentored 5 devs'],
      status: 'LEGENDARY CLEAR'
    },
    {
      title: 'FINTECH DASHBOARD',
      subtitle: 'UI/UX ENGINEER',
      year: '2019-2020',
      company: 'Financial Solutions Inc',
      genre: 'Puzzle Platformer',
      difficulty: '★★★★☆',
      color: 'arcade-neon-yellow',
      description: 'Built responsive financial analytics dashboard with real-time data visualization and automated reporting.',
      tech: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
      achievements: ['User engagement +85%', 'Load time reduced 50%', 'A11y WCAG AAA'],
      status: 'PERFECT SCORE'
    }
  ];

  return (
    <ArcadeLayout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Game Selection Header */}
        <div className="text-center mb-16">
          <div className={`text-6xl font-pixel font-bold text-arcade-neon-cyan mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            MISSION SELECT
          </div>
          <div className="text-xl font-pixel text-arcade-neon-yellow">
            ▼ CHOOSE YOUR ADVENTURE ▼
          </div>
          <div className="text-sm font-pixel text-arcade-neon-green mt-2">
            9+ YEARS OF COMPLETED MISSIONS
          </div>
        </div>

        {/* Enhanced Project Game Cabinets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} className={`bg-black/80 border-4 border-${project.color} p-6 relative group hover:bg-${project.color}/10 transition-colors cursor-pointer`}>
              {/* Cabinet Screen */}
              <div className={`bg-gradient-to-br from-black to-gray-900 border-2 border-${project.color} p-4 mb-4 relative overflow-hidden`}>
                {/* Scanlines Effect */}
                <div className="absolute inset-0 bg-repeat-y opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgMSA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cmVjdCB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHN2Zz4K')]"></div>
                
                <div className={`text-2xl font-pixel font-bold text-${project.color} mb-2 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                  {project.title}
                </div>
                <div className={`text-lg font-pixel text-${project.color} opacity-80 mb-2`}>
                  {project.subtitle}
                </div>
                <div className={`text-sm font-pixel text-${project.color} opacity-60 mb-4`}>
                  {project.company}
                </div>
                
                {/* Game Info */}
                <div className="space-y-2 text-sm font-pixel">
                  <div className={`text-${project.color}`}>
                    PERIOD: {project.year} | TYPE: {project.genre}
                  </div>
                  <div className={`text-${project.color}`}>
                    DIFFICULTY: {project.difficulty}
                  </div>
                  <div className={`text-${project.color} font-bold ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
                    STATUS: {project.status}
                  </div>
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="mb-4">
                <div className={`text-sm font-pixel text-${project.color} mb-2 font-bold`}>
                  🏆 ACHIEVEMENTS UNLOCKED:
                </div>
                <div className="space-y-1">
                  {project.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className={`text-xs font-pixel text-${project.color} opacity-80`}>
                      ✓ {achievement}
                    </div>
                  ))}
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
                  VIEW CASE STUDY
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced High Score Board */}
        <div className="bg-black/80 border-4 border-arcade-neon-green p-8">
          <div className={`text-3xl font-pixel font-bold text-arcade-neon-green text-center mb-8 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            🏆 CAREER HIGH SCORES 🏆
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { rank: '1ST', name: 'SYSTEMS MIGRATED', score: '50K+ USERS', color: 'arcade-neon-yellow' },
              { rank: '2ND', name: 'ZERO DOWNTIME', score: '99.99%', color: 'arcade-neon-cyan' },
              { rank: '3RD', name: 'TEAM VELOCITY', score: '+300%', color: 'arcade-neon-magenta' }
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
            READY FOR NEXT MISSION?
          </div>
          <div className="text-arcade-neon-green font-pixel">
            LET'S BUILD SOMETHING AMAZING TOGETHER
          </div>
        </div>
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeWork;
