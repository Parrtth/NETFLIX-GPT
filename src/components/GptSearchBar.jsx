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
    } catch (err) {
      setError("Error fetching movies. Please try again later.");
    }
  };

  return (
    <>
      <form 
        className='w-1/2 bg-black text-white grid grid-cols-12' 
        onSubmit={handleSubmit}
      >
        <input 
          ref={searchText}
          type='text'
          className='p-4 m-4 col-span-9 border-2'
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button 
          className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
          onClick={handleMovieSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
      {error && <div className="text-red-400 mt-2 ml-4">{error}</div>}
      <div className="w-11/12 mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default GptSearchBar;