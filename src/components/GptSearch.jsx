import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div className="relative  h-screen w-screen">
      {/* Background Image */}
      <img 
        className="fixed -z-10"
        src={BG_URL}
        alt="Background"
      />
      {/* Centered and slightly upper Search Bar */}
      <div className="absolute top-1/4 left-0 w-full flex flex-col items-center z-10">
        <GptSearchBar />
      </div>
      {/* Suggestions below */}
      <div className="relative z-20">
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearch