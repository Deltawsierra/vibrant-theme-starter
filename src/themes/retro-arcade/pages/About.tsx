
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

        {/* Character Card */}
        <div className="flex justify-center mb-16">
          <div className="bg-black/80 border-4 border-arcade-neon-green p-8 max-w-2xl">
            <div className="flex items-start space-x-8">
              {/* Pixel Avatar */}
              <div className="w-32 h-32 bg-gradient-to-br from-arcade-neon-cyan to-arcade-neon-magenta border-2 border-arcade-neon-yellow flex items-center justify-center">
                <div className="text-4xl font-pixel text-black font-bold">DEV</div>
              </div>
              
              {/* Character Stats */}
              <div className="flex-1 space-y-4">
                <div className={`text-2xl font-pixel font-bold text-arcade-neon-green ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
                  SENIOR FULL-STACK DEVELOPER
                </div>
                
                {/* Stats Bars */}
                <div className="space-y-3">
                  {[
                    { label: 'FRONTEND', level: 95, color: 'arcade-neon-cyan' },
                    { label: 'BACKEND', level: 90, color: 'arcade-neon-magenta' },
                    { label: 'DATABASE', level: 85, color: 'arcade-neon-yellow' },
                    { label: 'DEVOPS', level: 80, color: 'arcade-neon-green' }
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

        {/* Special Abilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: 'SPECIAL MOVES',
              color: 'arcade-neon-cyan',
              items: [
                '↓→A: Scalable Architecture',
                '←↓→B: Performance Optimization', 
                '↑↑A+B: Bug-Free Deployment',
                '←→←→A: Code Review Combo'
              ]
            },
            {
              title: 'POWER-UPS',
              color: 'arcade-neon-magenta',
              items: [
                '◆ React/TypeScript Mastery',
                '◆ Database Design Expert',
                '◆ Cloud Infrastructure Pro',
                '◆ Team Leadership Bonus'
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

        {/* Backstory Terminal */}
        <div className="bg-black/80 border-2 border-arcade-neon-green p-6">
          <div className={`text-xl font-pixel font-bold text-arcade-neon-green mb-4 ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
            &gt; BACKSTORY.EXE
          </div>
          <div className="space-y-4 text-arcade-neon-green font-pixel text-sm leading-relaxed">
            <p>
              &gt; Specialized in creating scalable web applications with modern technologies.
              &gt; Experience spans frontend frameworks, backend architecture, and database design.
            </p>
            <p>
              &gt; Focused on clean code, performance optimization, and user-centered design.
              &gt; Committed to delivering solutions that balance technical excellence with business objectives.
            </p>
            <p className={settings.enableGlow ? 'animate-pixel-blink' : ''}>
              &gt; Available for consulting, full-time opportunities, and collaborative projects.
              &gt; INSERT COIN TO START MISSION_
            </p>
          </div>
        </div>

        {/* Achievement Unlocked */}
        <div className="text-center mt-16">
          <div className={`inline-block bg-arcade-neon-yellow/20 border-2 border-arcade-neon-yellow px-8 py-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            <div className="text-arcade-neon-yellow font-pixel font-bold">
              🏆 ACHIEVEMENT UNLOCKED: ABOUT PAGE CLEARED! 🏆
            </div>
            <div className="text-arcade-neon-yellow font-pixel text-sm mt-2">
              +1000 XP | BONUS: Developer Trust Level Up!
            </div>
          </div>
        </div>
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeAbout;
