import React from 'react'
import { useSelector } from 'react-redux'

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieResults) return null;

  return (
    <div className="p-4 m-4 bg-black bg-opacity-90 text-white">
      <div>
        {movieNames.map((movieName, index) => (
          <div key={movieName} className="py-4">
            <h2 className="text-2xl font-bold py-4">{movieName}</h2>
            <div className="flex overflow-x-auto">
              {movieResults[index]?.map((movie) => (
                <div 
                  key={movie.id} 
                  className="w-48 mr-4 flex-shrink-0 hover:scale-105 transition-transform duration-200"
                >
                  <img
                    className="w-full rounded-lg"
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <h3 className="py-2 text-sm">{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;