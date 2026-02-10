import React from 'react'
import { Button } from '@/components/ui/button'
import { Play, Info } from 'lucide-react'

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
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 font-semibold rounded-md shadow-lg hover:shadow-xl px-6 md:px-8 lg:px-10 py-3 md:py-4 text-base md:text-lg"
                >
                    <Play className="size-5 md:size-6 fill-black" />
                    Play
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    className="bg-gray-600/80 text-white hover:bg-gray-500/80 border-gray-500/50 backdrop-blur-sm font-semibold rounded-md px-6 md:px-8 lg:px-10 py-3 md:py-4 text-base md:text-lg"
                >
                    <Info className="size-5 md:size-6" />
                    More Info
                </Button>
            </div>
        </div>
    )
}

export default VideoTitle   