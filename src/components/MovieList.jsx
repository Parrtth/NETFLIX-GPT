import MovieCard from "./MovieCard"
import React from "react"

const MovieList = ({title, movies, priority = false}) => {
    // Filter out invalid movies (null, undefined, or missing title)
    const validMovies = Array.isArray(movies)
      ? movies.filter(movie => movie && movie.title)
      : [];

    if (validMovies.length === 0) return null;

    return (
        <div className="w-full relative">
            {/* Section Title with enhanced styling */}
            <div className="mb-6 sm:mb-8 md:mb-10 relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight relative z-10">
                    {title}
                </h2>
                {priority && (
                    <div 
                        className="w-20 h-1 bg-red-600 mt-4 rounded-full"
                        style={{
                            boxShadow: '0 0 15px rgba(229, 9, 20, 0.6)',
                        }}
                    />
                )}
                {/* Subtle glow effect behind title */}
                <div 
                    className="absolute -left-4 top-0 w-1 h-full bg-red-600/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        boxShadow: '0 0 10px rgba(229, 9, 20, 0.4)',
                    }}
                />
            </div>
            
            {/* Movie Carousel */}
            <div className="relative">
                <div className="flex overflow-x-auto movie-scrollbar pb-4 scrollbar-hide">
                    <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 pl-0 pr-4">
                        {validMovies.map((movie, idx) => (
                            <div
                                key={movie.id}
                                style={{
                                    animation: `fadeInRight 0.5s ease-out ${idx * 0.05}s both`,
                                }}
                            >
                                <MovieCard movie={movie} priority={priority} />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Enhanced gradient fade effect on the right edge */}
                <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10"></div>
            </div>
            
            <style>{`
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default MovieList 