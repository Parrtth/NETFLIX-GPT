import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from './MovieCard';

const GptMovieSuggestion = () => {
  const gpt = useSelector(store => store.gpt)
  const { movieResults, movieNames } = gpt
  if (!movieNames || !movieResults) return null

  return (
    <div className='w-full bg-[#181818] py-4 sm:py-6 md:py-8 px-0'>
      <div className='px-2 sm:px-4 md:px-6'>
        {movieNames.map((groupTitle, idx) => (
          <div key={groupTitle + idx} className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl text-white py-2 font-bold">{groupTitle}</h1>
            <div className="flex overflow-x-auto custom-scrollbar pb-2">
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                {movieResults[idx]
                  .filter(movie => movie && movie.title && movie.poster_path && movie.poster_path.trim() !== '')
                  .map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GptMovieSuggestion