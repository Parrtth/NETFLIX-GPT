import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstants'

const GptSearchBar = () => {

  const langkey = useSelector((store) => store.config.lang)
  return (
    <form className=' w-1/2 bg-black text-white grid grid-cols-12'>
        <input 
        type='text'
        className='p-4 m-4 col-span-9 border-2'
        placeholder= {lang[langkey].gptSearchPlaceholder}
        />
        <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'>
        {lang[langkey].search}
        </button>
    </form>
  )
}

export default GptSearchBar