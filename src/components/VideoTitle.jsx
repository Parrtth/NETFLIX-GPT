import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/2'>{overview}</p>
        <div>
            <button className='bg-white text-black p-4 px-10 text-xl font-bold hover:bg-gray-400 rounded-lg'>
             ▸ Play
            </button>
            <button className=' mx-2 bg-gray-500 text-white p-4 px-6 text-xl font-bold bg-opacity-50 rounded-lg'>
            🛈 More Info
            </button>
        </div>

    </div>
  )
}
  
export default VideoTitle   