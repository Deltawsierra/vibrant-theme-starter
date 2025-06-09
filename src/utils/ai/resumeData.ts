
// Sample resume data for embedding into pgvector database
export const resumeChunks = [
  {
    chunk: "Senior Frontend Engineer with 8 years of experience specializing in React, TypeScript, and modern JavaScript. Proficient in building complex, scalable applications with a focus on performance optimization and clean architecture.",
    metadata: { section: "summary", years: 8, focus: ["React", "TypeScript", "JavaScript"] }
  },
  {
    chunk: "Led frontend development for an e-commerce platform serving over 2 million monthly active users. Implemented code-splitting and lazy-loading techniques that reduced initial page load times by 43%. Integrated advanced state management with Redux and context API.",
    metadata: { section: "experience", role: "Senior Frontend Engineer", company: "E-Commerce Tech", years: "2020-2023" }
  },
  {
    chunk: "Architected and developed a real-time collaboration tool using React, TypeScript, and WebSockets. Implemented custom hooks system that improved developer productivity by 35%. Reduced bundle size by 28% through code optimization.",
    metadata: { section: "experience", role: "Frontend Developer", company: "Collaboration Inc", years: "2018-2020" }
  },
  {
    chunk: "Full-stack developer for a healthcare startup. Developed patient management system using React, Node.js and MongoDB. Implemented HIPAA-compliant authentication and data protection measures. Reduced database query times by 60% through index optimization.",
    metadata: { section: "experience", role: "Full-Stack Developer", company: "Health Tech Solutions", years: "2015-2018" }
  },
  {
    chunk: "Technical Skills: JavaScript (ES6+), TypeScript, React, Redux, Next.js, Vue.js, Angular, Node.js, Express, GraphQL, REST APIs, MongoDB, PostgreSQL, AWS, Docker, CI/CD, Webpack, Jest, Testing Library, Cypress",
    metadata: { section: "skills", category: "technical" }
  },
  {
    chunk: "Leadership Skills: Technical team leadership, mentoring junior developers, project planning, agile methodologies (Scrum, Kanban), cross-functional collaboration, technical specification writing, code reviews",
    metadata: { section: "skills", category: "leadership" }
  },
  {
    chunk: "Bachelor of Science in Computer Science from University of California, Berkeley. Graduated with honors (3.8 GPA). Senior thesis on performance optimization in JavaScript applications.",
    metadata: { section: "education", degree: "BS Computer Science", school: "UC Berkeley", year: "2015" }
  },
  {
    chunk: "Led a team of 5 engineers to deliver a complete redesign of the company's flagship product. Implemented component library and design system that increased development velocity by 40%. Mentored 3 junior developers who were later promoted.",
    metadata: { section: "achievements", category: "leadership" }
  },
  {
    chunk: "Reduced application error rates by 78% through implementation of comprehensive error tracking and improved testing practices. Championed shift to TypeScript across the organization.",
    metadata: { section: "achievements", category: "technical" }
  },
  {
    chunk: "Spoke at React Conference 2022 on advanced state management patterns. Published technical blog posts with over 50,000 cumulative views. Contributor to open source projects including React-Query.",
    metadata: { section: "achievements", category: "community" }
  }
];

// Function to chunk larger text into paragraphs
export const chunkText = (text: string, maxLength: number = 500): string[] => {
  if (text.length <= maxLength) return [text];
  
  // Try to split at paragraph breaks first
  let chunks = text.split(/\n\s*\n/);
  
  // If any chunk is still too large, split it further
  let result: string[] = [];
  for (const chunk of chunks) {
    if (chunk.length <= maxLength) {
      result.push(chunk);
    } else {
      // Split at sentence boundaries
      const sentences = chunk.split(/(?<=[.!?])\s+/);
      let currentChunk = "";
      
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length <= maxLength) {
          currentChunk += (currentChunk ? " " : "") + sentence;
        } else {
          if (currentChunk) result.push(currentChunk);
          currentChunk = sentence;
        }
      }
      
      if (currentChunk) result.push(currentChunk);
    }
  }
  
  return result;
};
