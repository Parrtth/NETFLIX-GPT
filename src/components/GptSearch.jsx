import React, { useEffect, useState } from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Clean Netflix-style Background */}
      <div className="fixed inset-0 z-0">
        {/* Subtle background image - very low opacity for texture only */}
        <img 
          className="h-full w-full object-cover opacity-[0.08]" 
          src={BG_URL} 
          alt="Background" 
        />
        
        {/* Smooth gradient overlay - Netflix style */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
        
        {/* Very subtle radial gradient that follows mouse - smooth and minimal */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle 1200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(229, 9, 20, 0.08), transparent 60%)`,
          }}
        />
        
        {/* Single smooth gradient accent - very subtle */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(180deg, rgba(229, 9, 20, 0.05) 0%, transparent 30%, transparent 70%, rgba(229, 9, 20, 0.05) 100%)',
          }}
        />
      </div>

      {/* Content above background */}
      <div className="relative z-10 pt-28 md:pt-36 pb-16 mx-auto w-full max-w-6xl px-4 md:px-6">
        {/* Hero section with animated text */}
        <div className="text-center mb-12 md:mb-16">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
            style={{
              animation: 'fadeInUp 1s ease-out',
            }}
          >
            Discover Your Next
            <span className="block text-red-600 mt-2">Favorite Movie</span>
          </h1>
          <p 
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}
          >
            Search through thousands of movies and get AI-powered recommendations
          </p>
        </div>

        <GptSearchBar />
        <GptMovieSuggestions />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default GptSearch
