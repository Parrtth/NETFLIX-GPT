import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux' 
import { addUser, removeUser } from '../utils/userSlice'


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
        }
    ]);

    useEffect (() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName,photoURL} = user; 
          dispatch(addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL:photoURL,
          }));
           // Redirect to browse page after login
          // console.log(user);
        }
        else {
          dispatch(removeUser());
           // Redirect to login page if not authenticated 

        } 
      });
    }, []);

     
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
