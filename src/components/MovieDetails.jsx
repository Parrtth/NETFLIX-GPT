import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { API_OPTIONS, IMG_CDN_URL, BG_URL } from '../utils/constants';
import Header from './Header'; // Import Header for consistency
import { ArrowLeft, Star, Calendar, Clock, Play } from 'lucide-react'; // Import icons

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerId, setTrailerId] = useState(null);

    useEffect(() => {
        fetchMovieDetails();
        fetchMovieVideos();
    }, [movieId]);

    const fetchMovieDetails = async () => {
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                API_OPTIONS
            );
            const json = await data.json();
            setMovie(json);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            setLoading(false);
        }
    };

    const fetchMovieVideos = async () => {
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
                API_OPTIONS
            );
            const json = await data.json();
            const trailer = json.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (trailer) {
                setTrailerId(trailer.key);
            }
        } catch (error) {
            console.error("Error fetching trailers:", error);
        }
    };

    if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    if (!movie) return <div className="h-screen bg-black flex items-center justify-center text-white">Movie not found</div>;

    const { original_title, overview, poster_path, backdrop_path, vote_average, release_date, runtime, genres } = movie;

    // Use backdrop if available, otherwise fallback or generic BG
    const bgImage = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : BG_URL;

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Header - Ensure it overlays correctly */}
            <div className="absolute top-0 w-full z-50">
                <Header />
            </div>

            {/* Back Button (Mobile/Desktop) - Positioned below header or clearly visible */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-24 left-4 z-50 bg-black/50 p-2 rounded-full hover:bg-black/80 transition cursor-pointer md:top-28 md:left-8"
            >
                <ArrowLeft size={24} />
            </button>


            {/* Hero Section */}
            <div className="relative h-[70vh] md:h-screen w-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={bgImage}
                        alt={original_title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 flex flex-col md:flex-row gap-8 items-end md:items-center">

                    {/* Poster (Hidden on mobile, visible on tablet+) */}
                    <div className="hidden md:block w-64 shrink-0 rounded-lg overflow-hidden shadow-2xl skew-x-1 outline outline-2 outline-white/20">
                        <img
                            src={poster_path ? IMG_CDN_URL + poster_path : ''}
                            alt={original_title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 space-y-4 max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg leading-tight">{original_title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
                            <span className="flex items-center gap-1 text-yellow-400 font-bold">
                                <Star fill="currentColor" size={16} /> {vote_average.toFixed(1)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={16} /> {release_date.split('-')[0]}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={16} /> {runtime}m
                            </span>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {genres.map(g => (
                                <span key={g.id} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm border border-white/10">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-200 text-sm md:text-lg leading-relaxed line-clamp-4 md:line-clamp-none">
                            {overview}
                        </p>

                        <div className="flex gap-4 pt-4">
                            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition cursor-pointer">
                                <Play fill="currentColor" size={20} /> Play
                            </button>
                            {trailerId && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailerId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-gray-600/80 hover:bg-gray-600 text-white px-6 py-3 rounded font-bold transition backdrop-blur-sm"
                                >
                                    Watch Trailer
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Content (Use generic recommendations or additional info if needed) */}
            <div className="p-6 md:p-12 lg:p-24 max-w-7xl mx-auto">
                {/* You could add a 'Similar Movies' section here later */}
            </div>

        </div>
    );
};

export default MovieDetails;
