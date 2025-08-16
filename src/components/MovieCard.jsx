import React from 'react';

const MovieCard = ({ movie, priority = false }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : null;

  return (
    <div className={`
      relative rounded-lg overflow-hidden shadow-lg bg-[#181818] 
      ${priority ? 'w-32 sm:w-36 md:w-40 lg:w-44' : 'w-28 sm:w-32 md:w-36 lg:w-40'} 
      ${priority ? 'h-48 sm:h-52 md:h-56 lg:h-60' : 'h-40 sm:h-44 md:h-48 lg:h-52'} 
      min-w-[112px] sm:min-w-[128px] md:min-w-[144px] lg:min-w-[160px] 
      flex flex-col group transition-all duration-300 
      hover:scale-110 hover:z-30 
      border border-transparent hover:border-red-500/50
      ${priority ? 'ring-2 ring-red-500/20' : ''}
    `}>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-400 text-xs p-4 text-center">
          No Image Available
        </div>
      )}
      
      {/* Hover overlay with movie info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm sm:text-base font-bold text-white mb-2 line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>{movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</span>
            {movie.vote_average && (
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Priority indicator for Now Playing section */}
      {priority && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
          NOW
        </div>
      )}
    </div>
  );
};

export default MovieCard;
  