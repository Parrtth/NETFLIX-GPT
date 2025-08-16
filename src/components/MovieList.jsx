import MovieCard from "./MovieCard"
import React from "react"

const MovieList = ({title, movies, priority = false}) => {
    // Filter out invalid movies (null, undefined, or missing title)
    const validMovies = Array.isArray(movies)
      ? movies.filter(movie => movie && movie.title)
      : [];

    if (validMovies.length === 0) return null;

    return (
        <div className="w-full">
            {/* Section Title */}
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    {title}
                </h2>
                {priority && (
                    <div className="w-16 h-1 bg-red-600 mt-3 rounded-full"></div>
                )}
            </div>
            
            {/* Movie Carousel */}
            <div className="relative">
                <div className="flex overflow-x-auto movie-scrollbar pb-4">
                    <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 pl-0 pr-4">
                        {validMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} priority={priority} />
                        ))}
                    </div>
                </div>
                
                {/* Gradient fade effect on the right edge */}
                <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
            </div>
        </div>
    )
}

export default MovieList 