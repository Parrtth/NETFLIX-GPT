import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondryContainer = () => {
  const movies = useSelector((store) => store.movies)

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        {/* Wrapper for all movie lists */}
        <div 
          className="
            relative z-20 
            px-2 sm:px-4 md:px-8 
            -mt-20 sm:-mt-28 md:-mt-52
            space-y-6 sm:space-y-8
          "
        >
          <MovieList
            title="Now Playing"
            movies={movies.nowPlayingMovies}
          />
          <MovieList
            title="Top Rated"
            movies={movies.TopRatedMovies}
          />
          <MovieList
            title="Popular"
            movies={movies.PopularMovies}
          />
          <MovieList
            title="Upcoming Movies"
            movies={movies.UpcomingMovies}
          />
        </div>
      </div>
    )
  )
}

export default SecondryContainer
