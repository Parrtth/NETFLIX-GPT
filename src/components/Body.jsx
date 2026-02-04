import React from 'react'
import Landing from './Landing'
import Login from './Login'
import Browse from './Browse'
import MovieDetails from './MovieDetails'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const appRouter = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/browse', element: <Browse /> },
  { path: '/movie/:movieId', element: <MovieDetails /> },
])

const Body = () => {




  return (
    <div className="min-h-screen bg-black">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
