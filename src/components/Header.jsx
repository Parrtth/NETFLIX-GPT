import { signOut } from 'firebase/auth'
import React, { useEffect }  from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import { useSelector, useDispatch } from 'react-redux' // Import useSelector from react-redux  
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants' 
import { toggleGptSearchView} from "../utils/gptSlice"
import { changeLanguage } from '../utils/configSlice'


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
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

  const handleGptSearchClick = () => {
    // Toggle GPT Search Button 
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  
  return (
    <div className="fixed top-0 left-0 w-full px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      {/* Logo */}
      <img
        className="w-44 p-4"
        src={LOGO}
        alt="logo"
      />
      
      {/* User Icon and Sign Out - Only show if user is logged in (has uid) */}
      { user?.uid && (
        <div className='flex items-center space-x-2'>
          {user?.uid && showGptSearch &&(
          <select className=
          "p-2 m-2  bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer shadow-md"
          onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier} >{lang.name} </option>)}
          </select>
          )}
          <button
            className='rounded-2xl bg-gray-900 text-white font-bold uppercase px-5 py-2 shadow-md transition-all duration-200 transform hover:bg-gray-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            onClick={handleGptSearchClick} 
          >
           {showGptSearch? "Homepage" :  "GPT Search" }
          </button> 
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
