import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img className="h-full w-full object-cover" src={BG_URL} alt="background" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
      </div>
      <div className="pt-32 md:pt-[10%] mx-auto w-full max-w-6xl px-4 md:px-6">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  )
}

export default GptSearch
