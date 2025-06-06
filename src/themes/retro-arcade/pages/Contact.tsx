
import React, { useState } from 'react';
import { useArcade } from '../context/ArcadeContext';

const RetroArcadeContact = () => {
  const { settings, playSFX } = useArcade();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    playSFX('button-press');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSFX('power-up');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* High Score Entry Header */}
      <div className="text-center mb-16">
        <div className={`text-6xl font-pixel font-bold text-arcade-neon-cyan mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          HIGH SCORE!
        </div>
        <div className="text-xl font-pixel text-arcade-neon-yellow">
          ENTER YOUR INITIALS
        </div>
        <div className="text-sm font-pixel text-arcade-neon-green mt-2">
          NEW RECORD: CONTACT MISSION UNLOCKED
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form - High Score Entry Style */}
        <div className="space-y-8">
          <div className="bg-black/80 border-4 border-arcade-neon-magenta p-8">
            <div className={`text-2xl font-pixel font-bold text-arcade-neon-magenta mb-6 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
              ENTER YOUR DATA
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-arcade-neon-cyan font-pixel text-sm mb-2">
                  PLAYER NAME:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-black border-2 border-arcade-neon-cyan text-arcade-neon-cyan font-pixel p-3 focus:border-arcade-neon-yellow focus:outline-none transition-colors"
                  placeholder="ENTER NAME..."
                  maxLength={20}
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-arcade-neon-green font-pixel text-sm mb-2">
                  EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black border-2 border-arcade-neon-green text-arcade-neon-green font-pixel p-3 focus:border-arcade-neon-yellow focus:outline-none transition-colors"
                  placeholder="PLAYER@EXAMPLE.COM"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-arcade-neon-yellow font-pixel text-sm mb-2">
                  MISSION BRIEFING:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full bg-black border-2 border-arcade-neon-yellow text-arcade-neon-yellow font-pixel p-3 focus:border-arcade-neon-magenta focus:outline-none transition-colors resize-none"
                  placeholder="DESCRIBE YOUR QUEST..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-arcade-neon-magenta/20 border-4 border-arcade-neon-magenta text-arcade-neon-magenta font-pixel font-bold text-xl py-4 hover:bg-arcade-neon-magenta hover:text-black transition-colors ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}
              >
                TRANSMIT MESSAGE
              </button>
            </form>
          </div>

          {/* Lives/Credits Display */}
          <div className="bg-black/60 border-2 border-arcade-neon-green p-4">
            <div className="flex justify-between items-center font-pixel">
              <div className="text-arcade-neon-green">LIVES: ◆◆◆</div>
              <div className="text-arcade-neon-cyan">CREDITS: {settings.credits}</div>
              <div className="text-arcade-neon-yellow">SCORE: 999999</div>
            </div>
          </div>
        </div>

        {/* Contact Info - Arcade Cabinet Style */}
        <div className="space-y-8">
          {/* Direct Contact Cabinet */}
          <div className="bg-black/80 border-4 border-arcade-neon-cyan p-8">
            <div className={`text-2xl font-pixel font-bold text-arcade-neon-cyan mb-6 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
              DIRECT CONNECTION
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 border-2 border-arcade-neon-cyan p-4">
                <div className="text-arcade-neon-cyan font-pixel text-sm mb-1">EMAIL PROTOCOL:</div>
                <div className="text-arcade-neon-yellow font-pixel">hello@portfolio.dev</div>
              </div>
              
              <div className="bg-gray-900 border-2 border-arcade-neon-cyan p-4">
                <div className="text-arcade-neon-cyan font-pixel text-sm mb-1">VOICE CHANNEL:</div>
                <div className="text-arcade-neon-yellow font-pixel">+1 555 123 4567</div>
              </div>
              
              <div className="bg-gray-900 border-2 border-arcade-neon-cyan p-4">
                <div className="text-arcade-neon-cyan font-pixel text-sm mb-1">RESPONSE TIME:</div>
                <div className={`text-arcade-neon-green font-pixel ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
                  &lt; 24 HOURS
                </div>
              </div>
            </div>
          </div>

          {/* Status Screen */}
          <div className="bg-black/80 border-4 border-arcade-neon-yellow p-8">
            <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow mb-6 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
              MISSION STATUS
            </div>
            
            <div className="space-y-3">
              {[
                { label: 'AVAILABILITY', status: 'ONLINE', color: 'arcade-neon-green' },
                { label: 'NEW PROJECTS', status: 'ACCEPTING', color: 'arcade-neon-cyan' },
                { label: 'CONSULTATION', status: 'AVAILABLE', color: 'arcade-neon-magenta' },
                { label: 'COLLABORATION', status: 'OPEN', color: 'arcade-neon-yellow' }
              ].map(({ label, status, color }) => (
                <div key={label} className="flex justify-between items-center font-pixel text-sm">
                  <span className={`text-${color}`}>{label}:</span>
                  <span className={`text-${color} font-bold ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Power-Up Info */}
          <div className="bg-black/60 border-2 border-arcade-neon-magenta p-6">
            <div className={`text-lg font-pixel font-bold text-arcade-neon-magenta mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
              SPECIAL ABILITIES
            </div>
            <div className="space-y-2 text-sm font-pixel text-arcade-neon-magenta">
              <div>◆ Rapid Response Protocol</div>
              <div>◆ Cross-Platform Compatibility</div>
              <div>◆ Agile Development Boost</div>
              <div>◆ 24/7 Support Mode</div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Continue Screen */}
      <div className="text-center mt-16">
        <div className={`inline-block bg-arcade-neon-green/20 border-4 border-arcade-neon-green px-8 py-6 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          <div className="text-arcade-neon-green font-pixel font-bold text-xl mb-2">
            MISSION OBJECTIVE: COMPLETE
          </div>
          <div className="text-arcade-neon-green font-pixel text-sm">
            CONTACT FORM DEPLOYED | STANDING BY FOR TRANSMISSION
          </div>
          <div className={`text-arcade-neon-yellow font-pixel text-xs mt-2 ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
            PRESS START TO CONTINUE
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroArcadeContact;
