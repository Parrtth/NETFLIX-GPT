import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Same background as Login: full-bleed image + gradient overlay */}
      <div className="fixed inset-0 z-0">
        <img className="h-full w-full object-cover" src={BG_URL} alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>
      {/* Content above background */}
      <div className="relative z-10 pt-28 md:pt-36 pb-16 mx-auto w-full max-w-6xl px-4 md:px-6">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  )
}

export default GptSearch
