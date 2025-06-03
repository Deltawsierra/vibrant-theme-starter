
import React, { useState } from 'react';
import SpotlightVideo, { VideoSource } from './SpotlightVideo';

export interface ProjectData {
  id: string;
  title: string;
  genre: string;
  year: number;
  duration: string;
  description: string;
  video: VideoSource;
  credits: {
    director: string;
    producer: string;
    cinematographer: string;
    editor: string;
  };
  awards: string[];
  behindTheScenes: {
    images: string[];
    notes: string;
  };
  testimonials: {
    author: string;
    role: string;
    text: string;
  }[];
  downloadLinks: {
    mediaKit: string;
    cv: string;
  };
}

const demoProjects: ProjectData[] = [
  {
    id: '1',
    title: 'Urban Landscapes',
    genre: 'Documentary',
    year: 2023,
    duration: '45 min',
    description: 'An intimate look at urban development and its impact on communities.',
    video: {
      type: 'youtube',
      url: 'dQw4w9WgXcQ',
      title: 'Urban Landscapes',
      thumbnail: '/placeholder.svg'
    },
    credits: {
      director: 'John Smith',
      producer: 'Jane Doe',
      cinematographer: 'Mike Johnson',
      editor: 'Sarah Wilson'
    },
    awards: ['Best Documentary - Film Festival 2023', 'Audience Choice Award'],
    behindTheScenes: {
      images: ['/placeholder.svg', '/placeholder.svg'],
      notes: 'Filmed over 18 months in three major cities.'
    },
    testimonials: [
      {
        author: 'Robert Chen',
        role: 'Executive Producer',
        text: 'An exceptional piece of storytelling that captures the human spirit.'
      }
    ],
    downloadLinks: {
      mediaKit: '/placeholder.pdf',
      cv: '/placeholder.pdf'
    }
  },
  {
    id: '2',
    title: 'The Last Garden',
    genre: 'Short Film',
    year: 2023,
    duration: '12 min',
    description: 'A poetic exploration of nature\'s resilience in an urban environment.',
    video: {
      type: 'vimeo',
      url: '123456789',
      title: 'The Last Garden',
      thumbnail: '/placeholder.svg',
      qualities: ['4K', 'HD', 'SD']
    },
    credits: {
      director: 'Lisa Martinez',
      producer: 'John Smith',
      cinematographer: 'David Kim',
      editor: 'Emily Chen'
    },
    awards: ['Best Cinematography - Short Film Awards 2023'],
    behindTheScenes: {
      images: ['/placeholder.svg'],
      notes: 'Shot entirely with natural lighting during golden hour.'
    },
    testimonials: [
      {
        author: 'Maria Rodriguez',
        role: 'Film Critic',
        text: 'A visual masterpiece that speaks to the soul.'
      }
    ],
    downloadLinks: {
      mediaKit: '/placeholder.pdf',
      cv: '/placeholder.pdf'
    }
  }
];

const genres = ['All', 'Documentary', 'Short Film', 'Commercial', 'Music Video'];

interface ProjectShowcaseProps {
  layout?: 'grid' | 'carousel' | 'masonry';
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ layout = 'grid' }) => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'year' | 'title'>('year');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = selectedGenre === 'All' 
    ? demoProjects 
    : demoProjects.filter(project => project.genre === selectedGenre);

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'year') return b.year - a.year;
    return a.title.localeCompare(b.title);
  });

  const ProjectDetailModal = ({ project }: { project: ProjectData }) => (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            ×
          </button>
          
          <div className="aspect-video">
            <SpotlightVideo video={project.video} className="rounded-t-lg" />
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
            <div className="text-gray-600 mt-2">
              {project.genre} • {project.year} • {project.duration}
            </div>
          </div>
          
          <p className="text-gray-700">{project.description}</p>
          
          {/* Credits */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Credits</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <div>Director: {project.credits.director}</div>
              <div>Producer: {project.credits.producer}</div>
              <div>Cinematographer: {project.credits.cinematographer}</div>
              <div>Editor: {project.credits.editor}</div>
            </div>
          </div>
          
          {/* Awards */}
          {project.awards.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Awards</h3>
              <ul className="list-disc list-inside space-y-1">
                {project.awards.map((award, index) => (
                  <li key={index} className="text-gray-700">{award}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Behind the Scenes */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Behind the Scenes</h3>
            <p className="text-gray-700 mb-3">{project.behindTheScenes.notes}</p>
            <div className="grid grid-cols-2 gap-4">
              {project.behindTheScenes.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Behind the scenes ${index + 1}`}
                  className="rounded-lg w-full h-32 object-cover"
                />
              ))}
            </div>
          </div>
          
          {/* Testimonials */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Testimonials</h3>
            <div className="space-y-4">
              {project.testimonials.map((testimonial, index) => (
                <blockquote key={index} className="border-l-4 border-blue-500 pl-4">
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  <cite className="text-gray-600 text-sm">
                    — {testimonial.author}, {testimonial.role}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
          
          {/* Download Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Downloads</h3>
            <div className="flex space-x-4">
              <a
                href={project.downloadLinks.mediaKit}
                download
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Download Media Kit
              </a>
              <a
                href={project.downloadLinks.cv}
                download
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedGenre === genre
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="year">Sort by Year</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Project Grid */}
      <div className={`grid gap-6 ${
        layout === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
      }`}>
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-video">
              <SpotlightVideo 
                video={project.video} 
                autoplayOnHover={true}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <div className="text-gray-400 text-sm mb-2">
                {project.genre} • {project.year} • {project.duration}
              </div>
              <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && <ProjectDetailModal project={selectedProject} />}
    </div>
  );
};

export default ProjectShowcase;
