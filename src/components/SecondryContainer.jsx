import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondryContainer = () => {
  const movies = useSelector((store) => store.movies)

  if (!movies?.nowPlayingMovies) return null;

  return (
    <div className="relative bg-black min-h-screen">
      {/* Subtle animated background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
          style={{
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
          style={{
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
      </div>

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

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  )
}

export default SecondryContainer
