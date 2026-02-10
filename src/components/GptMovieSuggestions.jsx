import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieResults) return null;

  return (
    <div className="mt-16">
      <div className="space-y-12">
        {movieNames.map((movieName, index) => (
          <section key={movieName} className="relative">
            {/* Section title with glow effect */}
            <div className="relative mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">
                {movieName}
              </h2>
              <div 
                className="absolute -left-2 top-0 w-1 h-full bg-red-600 rounded-full opacity-60"
                style={{
                  boxShadow: '0 0 20px rgba(229, 9, 20, 0.6)',
                }}
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1">
              {movieResults[index]
                ?.filter((movie) => movie.poster_path && movie.poster_path.trim() !== '')
                .map((movie, idx) => (
                  <div
                    key={movie.id}
                    className="w-40 sm:w-44 flex-shrink-0 group cursor-pointer"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                    }}
                  >
                    <div className="relative rounded-lg overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:z-10">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/20 group-hover:via-red-600/10 group-hover:to-red-600/20 transition-all duration-500 rounded-lg z-10 pointer-events-none" />
                      
                      <img
                        className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={movie.title}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      />
                      
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-gray-300 line-clamp-2 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                      {movie.title}
                    </h3>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GptMovieSuggestions;
