import MovieCard from "./MovieCard"
import React from "react"

const MovieList = ({title, movies}) => {
    // Filter out invalid movies (null, undefined, or missing title)
    const validMovies = Array.isArray(movies)
      ? movies.filter(movie => movie && movie.title)
      : [];

    return (
    <div className="px-6 "> 
        <h1 className="text-3xl text-white py-4">{title}</h1>
        <div className="flex overflow-x-scroll custom-scrollbar ">
            <div className="flex">
                {validMovies.length > 0 ? (
                    validMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p className="text-white">No movies available</p>
                )}
            </div>
        </div>
    </div>
    )
}

export default MovieList 