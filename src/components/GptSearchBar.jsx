import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import MovieCard from './MovieCard';

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
    const query = searchText.current.value;
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
      {/* Responsive Search Bar */}
      <form 
        className='w-full sm:w-3/4 md:w-1/2 bg-black text-white flex flex-col sm:flex-row items-center rounded-lg shadow-lg p-2 gap-2'
        onSubmit={handleSubmit}
      >
        <input 
          ref={searchText}
          type='text'
          className='flex-1 p-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white focus:outline-none w-full'
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button 
          className='bg-red-700 hover:bg-red-800 transition-colors text-white px-5 py-3 rounded-lg font-semibold w-full sm:w-auto'
          onClick={handleMovieSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="text-red-400 mt-3 text-center">{error}</div>}

      {/* Movie Results */}
      <div className="w-11/12 mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default GptSearchBar;
