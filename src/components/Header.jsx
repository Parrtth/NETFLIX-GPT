import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import { useSelector } from 'react-redux' // Import useSelector from react-redux  


const Header = () => {
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
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      {/* Logo */}
      <img
        className="w-44 p-4"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {/* User Icon and Sign Out - Only show if user is logged in (has uid) */}
      { user && user.uid && (
        <div className='flex items-center space-x-2'>
        <img
          className='w-10 h-10'
          alt="usericon"
          src={user?.photoURL || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}
          referrerpolicy="no-referrer"
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
