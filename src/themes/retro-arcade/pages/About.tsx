
import React from 'react';
import ArcadeLayout from '../components/ArcadeLayout';
import { useArcade } from '../context/ArcadeContext';

const RetroArcadeAbout = () => {
  const { settings } = useArcade();

  return (
    <ArcadeLayout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Character Select Screen Style Header */}
        <div className="text-center mb-16">
          <div className={`text-6xl font-pixel font-bold text-arcade-neon-cyan mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            PLAYER SELECT
          </div>
          <div className="text-xl font-pixel text-arcade-neon-yellow">
            ▼ CHOOSE YOUR DEVELOPER ▼
          </div>
        </div>

        {/* Enhanced Character Card with Resume Info */}
        <div className="flex justify-center mb-16">
          <div className="bg-black/80 border-4 border-arcade-neon-green p-8 max-w-3xl">
            <div className="flex items-start space-x-8">
              {/* Pixel Avatar */}
              <div className="w-40 h-40 bg-gradient-to-br from-arcade-neon-cyan to-arcade-neon-magenta border-4 border-arcade-neon-yellow flex flex-col items-center justify-center">
                <div className="text-3xl font-pixel text-black font-bold">DAVID</div>
                <div className="text-sm font-pixel text-black font-bold">SMITH</div>
              </div>
              
              {/* Enhanced Character Stats */}
              <div className="flex-1 space-y-4">
                <div className={`text-2xl font-pixel font-bold text-arcade-neon-green ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                  SENIOR FULL-STACK DEVELOPER
                </div>
                <div className="text-sm font-pixel text-arcade-neon-cyan">
                  LEVEL: 9+ YEARS EXPERIENCE | CLASS: TECH LEAD
                </div>
                
                {/* Enhanced Stats Bars with Real Skills */}
                <div className="space-y-3">
                  {[
                    { label: 'REACT/TS', level: 98, color: 'arcade-neon-cyan' },
                    { label: 'AWS CLOUD', level: 95, color: 'arcade-neon-magenta' },
                    { label: 'NODE.JS', level: 92, color: 'arcade-neon-yellow' },
                    { label: 'TEAM LEAD', level: 90, color: 'arcade-neon-green' },
                    { label: 'CI/CD', level: 88, color: 'arcade-neon-red' }
                  ].map(({ label, level, color }) => (
                    <div key={label} className="flex items-center space-x-4">
                      <div className={`w-20 text-sm font-pixel text-${color}`}>{label}</div>
                      <div className="flex-1 h-3 bg-gray-800 border border-gray-600">
                        <div 
                          className={`h-full bg-${color} ${settings.enableGlow ? 'animate-neon-glow' : ''}`}
                          style={{ width: `${level}%` }}
                        ></div>
                      </div>
                      <div className={`text-sm font-pixel text-${color}`}>{level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Abilities & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: 'SPECIAL MOVES',
              color: 'arcade-neon-cyan',
              items: [
                '↓→A: Serverless Architecture (AWS Lambda)',
                '←↓→B: Performance Optimization (Core Web Vitals)', 
                '↑↑A+B: Zero-Downtime Deployment',
                '←→←→A: Code Review & Mentoring Combo'
              ]
            },
            {
              title: 'UNLOCKED ACHIEVEMENTS',
              color: 'arcade-neon-magenta',
              items: [
                '🏆 AWS Cloud Solutions Architect',
                '🏆 Meta Frontend Developer Certified',
                '🏆 IBM Generative AI Expert',
                '🏆 NVIDIA GenAI Fundamentals'
              ]
            }
          ].map(({ title, color, items }) => (
            <div key={title} className={`bg-black/60 border-2 border-${color} p-6`}>
              <div className={`text-xl font-pixel font-bold text-${color} mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                {title}
              </div>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className={`text-sm font-pixel text-${color} opacity-80`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Inventory */}
        <div className="bg-black/80 border-4 border-arcade-neon-yellow p-6 mb-16">
          <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow mb-6 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            🎒 TECH STACK INVENTORY
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'React', 'TypeScript', 'Node.js', 'AWS',
              'Python', 'Docker', 'Kubernetes', 'MongoDB',
              'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs',
              'Jest', 'Cypress', 'Terraform', 'Jenkins'
            ].map((tech, index) => (
              <div key={tech} className="bg-arcade-neon-yellow/20 border border-arcade-neon-yellow p-3 text-center">
                <div className="text-arcade-neon-yellow font-pixel text-sm font-bold">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Backstory Terminal */}
        <div className="bg-black/80 border-2 border-arcade-neon-green p-6">
          <div className={`text-xl font-pixel font-bold text-arcade-neon-green mb-4 ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
            &gt; PLAYER_PROFILE.EXE
          </div>
          <div className="space-y-4 text-arcade-neon-green font-pixel text-sm leading-relaxed">
            <p>
              &gt; DAVID SMITH - Mission-driven Senior Full-Stack Developer with 9+ years XP
              &gt; Currently: Principal Engineer at Digital Systems Forge LLC (2016-2025)
            </p>
            <p>
              &gt; SPECIAL ABILITIES: Serverless architecture, team mentoring, agile leadership
              &gt; ACHIEVEMENTS: Migrated 50k+ user systems, built enterprise SaaS platforms
            </p>
            <p>
              &gt; EDUCATION: BS Computer Science, continuous learning mindset
              &gt; MISSION: Delivering scalable solutions that balance tech excellence with business value
            </p>
            <p className={settings.enableGlow ? 'animate-pixel-blink' : ''}>
              &gt; STATUS: Available for new quests and collaborative missions
              &gt; INSERT_COIN_TO_START_COLLABORATION_
            </p>
          </div>
        </div>

        {/* Achievement Unlocked */}
        <div className="text-center mt-16">
          <div className={`inline-block bg-arcade-neon-yellow/20 border-2 border-arcade-neon-yellow px-8 py-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            <div className="text-arcade-neon-yellow font-pixel font-bold">
              🏆 ACHIEVEMENT UNLOCKED: DEVELOPER PROFILE ANALYZED! 🏆
            </div>
            <div className="text-arcade-neon-yellow font-pixel text-sm mt-2">
              +2500 XP | BONUS: Trust Level Maximum!
            </div>
          </div>
        </div>
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeAbout;
