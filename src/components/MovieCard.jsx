import React from 'react';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : null;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-[#181818] w-36 min-w-[144px] mx-1 flex flex-col group transition-transform duration-200 hover:scale-105 hover:z-20 border border-transparent hover:border-red-600">
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
          No Image Available
        </div>
      )}
      {/* Hover overlay for title/year */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2">
        <h3 className="text-base font-bold text-white mb-1 truncate">{movie.title}</h3>
        <p className="text-gray-300 text-xs">{movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
  