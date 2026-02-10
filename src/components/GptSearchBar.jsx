import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import MovieCard from './MovieCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDgyNWU0Mjk5ZjVmMWNiMjY0ZjA4OWY4YWM4MWNkZiIsIm5iZiI6MTc1MjA1NjAyNi40MTY5OTk4LCJzdWIiOiI2ODZlNDBkYTVhYmJiNjllM2Q5YTRiZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P4NhZCvnvJGhukj96iJLiQogPc1bUTmrBh55dtnc91M";

const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleMovieSearchClick = async (e) => {
    e.preventDefault();
    setError("");
    setMovies([]);
    const query = searchText.current?.value?.trim();
    if (!query) {
      setError("Please enter a search term.");
      return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
          accept: "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setMovies(data.results || []);
      if ((data.results || []).length === 0) setError("No movies found.");
    } catch {
      setError("Error fetching movies. Please try again later.");
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <form
          className="flex flex-col sm:flex-row gap-3 relative"
          onSubmit={handleSubmit}
        >
          {/* Glow effect behind search bar */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-red-600/10 to-transparent rounded-lg blur-xl opacity-50" />
          
          <Input
            ref={searchText}
            type="text"
            placeholder={lang[langkey].gptSearchPlaceholder}
            className="flex-1 h-14 bg-black/90 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-gray-400 focus-visible:ring-red-600 focus-visible:border-red-600 text-lg shadow-2xl relative z-10 transition-all duration-300 hover:border-red-600/50"
          />
          <Button
            type="button"
            variant="netflix"
            size="default"
            className="shrink-0 font-semibold h-14 px-8 text-lg shadow-2xl relative z-10 transition-all duration-300 hover:scale-105 hover:shadow-red-600/50"
            onClick={handleMovieSearchClick}
          >
            {lang[langkey].search}
          </Button>
        </form>
      </div>

      {error && (
        <p className="text-red-500 mt-4 text-center text-sm font-medium">
          {error}
        </p>
      )}

      {movies.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies
              .filter((movie) => movie.poster_path && movie.poster_path.trim() !== '')
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GptSearchBar;
