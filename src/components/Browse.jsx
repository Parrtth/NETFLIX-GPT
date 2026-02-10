import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import React from 'react'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import GptSearch from './GptSearch'
import { useSelector } from 'react-redux'
  
  
const Browse = () => {
  const showGptSearch = useSelector(store=> store.gpt.showGptSearch)

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle animated background when not in GPT search */}
      {!showGptSearch && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(229, 9, 20, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(229, 9, 20, 0.2), transparent 50%)',
              animation: 'pulse 15s ease-in-out infinite',
            }}
          />
        </div>
      )}
      <Header />
      {showGptSearch ? (
      <GptSearch />
      ) : (
        <>
      <MainContainer />
      <SecondaryContainer />
      </>
)}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}

export default Browse
