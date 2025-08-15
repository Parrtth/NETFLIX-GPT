import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      {/* Background Image */}
      <img
        className="fixed -z-10 w-full h-full object-cover"
        src={BG_URL}
        alt="Background"
      />

      {/* Search Bar */}
      <div
        className="
          absolute 
          top-20 sm:top-1/4 
          left-0 
          w-full 
          flex flex-col items-center 
          px-4 sm:px-0 
          z-10
        "
      >
        <div className="w-full max-w-md sm:max-w-2xl">
          <GptSearchBar />
        </div>
      </div>

      {/* Suggestions */}
      <div className="relative z-20 mt-4 sm:mt-8 px-4 sm:px-8">
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearch
