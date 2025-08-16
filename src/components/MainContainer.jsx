import React from 'react'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import { useSelector } from 'react-redux';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    
    if (!movies || movies.length === 0) return null;
    
    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie;

    return (
        <div className="relative w-full">
            {/* Hero Section with Video Background */}
            <div className="relative w-full aspect-video overflow-hidden">
                <VideoBackground movieId={id} />
                
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                
                {/* Content Overlay */}
                <VideoTitle title={original_title} overview={overview} />
            </div>
        </div>
    )
}

export default MainContainer    