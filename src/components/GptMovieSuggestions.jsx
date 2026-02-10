import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieResults) return null;

  return (
    <Card className="mt-8 border-border/50 bg-card/90 backdrop-blur-sm shadow-xl">
      <CardContent className="pt-6">
        <div className="space-y-8">
          {movieNames.map((movieName, index) => (
            <section key={movieName}>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                {movieName}
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1">
                {movieResults[index]
                  ?.filter((movie) => movie.poster_path && movie.poster_path.trim() !== '')
                  .map((movie) => (
                    <div
                      key={movie.id}
                      className="w-40 sm:w-44 flex-shrink-0 group"
                    >
                      <div className="rounded-lg overflow-hidden shadow-lg ring-1 ring-border/50 transition-all duration-200 group-hover:scale-105 group-hover:ring-primary/50">
                        <img
                          className="w-full aspect-[2/3] object-cover"
                          alt={movie.title}
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-muted-foreground line-clamp-2">
                        {movie.title}
                      </h3>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GptMovieSuggestions;
