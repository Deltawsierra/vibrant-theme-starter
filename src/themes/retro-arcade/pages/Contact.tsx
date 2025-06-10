
import React from 'react';
import ArcadeLayout from '../components/ArcadeLayout';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import StatusDisplay from '../components/StatusDisplay';
import SpecialAbilities from '../components/SpecialAbilities';
import MissionComplete from '../components/MissionComplete';
import { useArcade } from '../context/ArcadeContext';

const RetroArcadeContact = () => {
  const { settings } = useArcade();

  return (
    <ArcadeLayout>
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
          <ContactForm />

          {/* Contact Info - Arcade Cabinet Style */}
          <div className="space-y-8">
            <ContactInfo />
            <StatusDisplay />
            <SpecialAbilities />
          </div>
        </div>

        {/* Game Over Continue Screen */}
        <MissionComplete />
      </div>
    </ArcadeLayout>
  );
};

export default RetroArcadeContact;
