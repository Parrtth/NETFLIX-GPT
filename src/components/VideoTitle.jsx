import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='absolute inset-0 z-20 flex flex-col justify-end px-4 sm:px-8 md:px-16 lg:px-24 pb-6 sm:pb-8 md:pb-12 lg:pb-16'>
            {/* Title */}
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl'>
                {title}
            </h1>

            {/* Overview */}
            <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl leading-relaxed drop-shadow-lg line-clamp-3 md:line-clamp-none'>
                {overview}
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4'>
                <button className='bg-white text-black px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-md hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'>
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl">▸</span>
                    Play
                </button>

                <button className='bg-gray-600/80 text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-md hover:bg-gray-500/80 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm border border-gray-500/50'>
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl">ℹ</span>
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle   