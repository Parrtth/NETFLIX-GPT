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
    <div>
      <Header />
      {showGptSearch ? (
      <GptSearch />
      ) : (
        <>
      <MainContainer />
      <SecondaryContainer />
      </>
)}
    </div>
  )
}

export default Browse
