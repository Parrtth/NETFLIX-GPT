import React from 'react'

import {  useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({movieId}) => {

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  const embedUrl = trailerVideo?.key
    ? `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&rel=0`
    : null;

  return (
    <div className="w-full h-full bg-black">
      {embedUrl ? (
      <iframe
        className="w-full h-full aspect-video object-cover"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      ) : null}
    </div>
  );
}

export default VideoBackground      