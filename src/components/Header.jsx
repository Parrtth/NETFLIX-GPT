import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleGptSearchView } from "../utils/gptSlice"
import { changeLanguage } from '../utils/configSlice'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate('/'))
      .catch(() => navigate('/error'));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <header className="fixed top-0 left-0 w-full px-4 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      {/* Logo */}
      <img
        className="w-32 sm:w-44 p-2 cursor-pointer"
        src={LOGO}
        alt="logo"
      />

      {/* Mobile menu toggle */}
      {user?.uid && (
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      )}

      {/* Desktop Menu */}
      {user?.uid && (
        <div className="hidden md:flex items-center space-x-2">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="rounded-2xl bg-gray-900 text-white font-bold uppercase px-5 py-2 shadow-md hover:scale-105 transition"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-10 h-10 rounded-full object-cover"
            alt="usericon"
            src={user?.photoURL || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
            }}
          />
          <button
            onClick={handleSignOut}
            className="rounded-2xl bg-red-600 text-white hover:bg-red-800 font-bold px-4 py-2"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Mobile Menu Items */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md p-5 flex flex-col items-center space-y-4 md:hidden animate-slideDown shadow-lg border-t border-gray-700">
          {showGptSearch && (
            <select
              className="p-2 w-full bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="rounded-lg w-full bg-gray-900 text-white font-bold uppercase px-5 py-2 shadow-md hover:scale-105 transition"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            alt="usericon"
            src={user?.photoURL || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}
          />
          <button
            onClick={handleSignOut}
            className="rounded-lg w-full bg-red-600 text-white hover:bg-red-800 font-bold px-4 py-2 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
