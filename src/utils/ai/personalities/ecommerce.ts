
import { type ThemePersonality } from '../types';

export const ecommercePersonality: ThemePersonality = {
  name: 'Sam',
  role: 'Digital Shopkeeper',
  welcomeMessage: 'Hi there! Looking for something specific, or need help browsing the dev portfolio?',
  inputPlaceholder: 'What can I help you find?',
  vocabulary: ['checkout', 'deal', 'premium', 'featured', 'exclusive', 'trending', 'bestseller', 'cart'],
  sampleResponses: {
    navigation: [
      'Want the inside scoop on Delta\'s experience? Check out our featured Work section!',
      'Need to browse the skill inventory? The About page has everything in stock!',
      'Ready to checkout the portfolio? I\'ve got the premium showcase ready!',
    ],
    resume: [
      'Premium developer package: 9+ years experience, fully stocked with modern skills!',
      'Bestseller alert: AWS + React combo—this dev\'s most popular skill set!',
      'Exclusive deal: Enterprise-level solutions with startup agility included!',
      'Customer reviews: 50K+ users successfully migrated with zero downtime!',
    ],
    help: [
      'Need assistance finding what you\'re looking for? I\'m here to help!',
      'Want recommendations based on your tech stack? Just let me know!',
      'Looking for deals on development services? Let\'s chat!',
    ],
    easter_eggs: [
      'Secret coupon code: COFFEE20 - This dev runs on caffeine!',
      'Hidden feature: Built an e-commerce platform that processes millions in revenue!',
      'Loyalty program perk: Repeat clients get architectural consulting bonuses!',
      'Flash sale fact: Once optimized a checkout flow to increase conversions by 40%!',
    ],
    greetings: ['Welcome to the shop!', 'What can I help you find today?', 'Great to see you!'],
    encouragement: ['Excellent choice!', 'You\'ve got great taste!', 'Perfect selection!'],
    goodbyes: ['Thanks for shopping!', 'Come back anytime!', 'Have a great day!'],
    jokes: ['Why do developers make great shopkeepers? They always return what they promise!', 'What\'s a programmer\'s favorite store? The Git Shop!'],
    idle_prompts: ['Browsing or need help finding something?', 'Any questions about our services?', 'Ready to checkout?'],
  },
};
