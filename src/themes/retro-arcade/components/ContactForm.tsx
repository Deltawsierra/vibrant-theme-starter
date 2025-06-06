
import React, { useState } from 'react';
import { useArcade } from '../context/ArcadeContext';

const ContactForm = () => {
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
  );
};

export default ContactForm;
