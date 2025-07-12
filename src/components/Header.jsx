import { signOut } from 'firebase/auth'
import React, { useEffect }  from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import { useSelector, useDispatch } from 'react-redux' // Import useSelector from react-redux  
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants' 


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); // Redirect to login page after sign out
        // Redirect to login page or perform any other action after sign out
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        navigate('/error'); // Redirect to error page on error
      });
    // Sign out logic here, e.g., using Firebase auth
  } 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName,photoURL} = user; 
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL:photoURL,
        }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => 
      unsubscribe();
    


  }, []);

  
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      {/* Logo */}
      <img
        className="w-44 p-4"
        src={LOGO}
        alt="logo"
      />
      {/* User Icon and Sign Out - Only show if user is logged in (has uid) */}
      { user && user.uid && (
        <div className='flex items-center space-x-2'>
        <img
          className='w-10 h-10'
          alt="usericon"
          src={user?.photoURL || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
          }}
        />
        <button onClick={handleSignOut} className='rounded-2xl bg-red-600 text-white hover:bg-red-800 font-bold px-4 py-2' >Sign Out</button>
      </div>
)}
    </div>
  )
}

export default Header
