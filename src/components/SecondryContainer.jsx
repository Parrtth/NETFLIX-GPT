import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondryContainer = () => {
  const movies = useSelector((store) => store.movies)

  if (!movies?.nowPlayingMovies) return null;

  return (
    <div className="relative bg-black min-h-screen">
      {/* Content Wrapper */}
      <div className="relative z-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        {/* Now Playing Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <MovieList
            title="Now Playing"
            movies={movies.nowPlayingMovies}
            priority={true}
          />
        </div>

        {/* Top Rated Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <MovieList
            title="Top Rated"
            movies={movies.TopRatedMovies}
          />
        </div>

        {/* Popular Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <MovieList
            title="Popular"
            movies={movies.PopularMovies}
          />
        </div>

        {/* Upcoming Movies Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <MovieList
            title="Upcoming Movies"
            movies={movies.UpcomingMovies}
          />
        </div>
      </div>
    </div>
  )
}

export default SecondryContainer
