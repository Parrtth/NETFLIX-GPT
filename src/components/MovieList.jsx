import MovieCard from "./MovieCard"
import React from "react"


const MovieList = ({title, movies}) => {

    return (
    <div className="px-6 "> 
        <h1 className="text-3xl text-white py-4">{title}</h1>
        <div className="flex overflow-x-scroll custom-scrollbar ">
            <div className="flex">
                {Array.isArray(movies) && movies.length > 0 ? (
                    movies?.map((movie) => (
                        <MovieCard key={movie.id} posterPath={movie.poster_path} />
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </div>
        </div>

    </div>
    )

}

export default MovieList 