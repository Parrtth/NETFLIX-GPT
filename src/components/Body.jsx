import React from 'react'
import Login from './Login'
import Browse from './Browse'
import MovieDetails from './MovieDetails'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter, } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const Body = () => {
  const dispatch = useDispatch();


  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/movie/:movieId',
      element: <MovieDetails />
    }
  ]);




  return (
    <div className="min-h-screen bg-black">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
