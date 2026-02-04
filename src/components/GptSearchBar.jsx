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
      <Card className="w-full max-w-2xl mx-auto border-border/50 bg-card/90 backdrop-blur-sm shadow-xl">
        <CardContent className="pt-6">
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
          >
            <Input
              ref={searchText}
              type="text"
              placeholder={lang[langkey].gptSearchPlaceholder}
              className="flex-1 h-10 bg-muted/50 border-input placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            <Button
              type="button"
              variant="destructive"
              size="default"
              className="shrink-0 font-semibold"
              onClick={handleMovieSearchClick}
            >
              {lang[langkey].search}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <p className="text-destructive mt-3 text-center text-sm font-medium">
          {error}
        </p>
      )}

      {movies.length > 0 && (
        <Card className="mt-8 border-border/50 bg-card/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground">Results</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default GptSearchBar;
