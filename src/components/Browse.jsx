import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import React from 'react'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondryContainer'
  
  
const Browse = () => {

  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse
