import { signOut } from 'firebase/auth'
import React, { useEffect, useState, useRef } from 'react'
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
  const mobileMenuRef = useRef(null);

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

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    setMobileMenuOpen(false);
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <header className="fixed top-0 left-0 w-full px-4 py-2 bg-gradient-to-b from-black/90 to-transparent z-50 flex justify-between items-center">
      {/* Logo */}
      <img
        className="w-28 sm:w-32 md:w-44 p-2 cursor-pointer"
        src={LOGO}
        alt="logo"
      />

      {/* Mobile menu toggle */}
      {user?.uid && (
        <button
          className="md:hidden text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Desktop Menu */}
      {user?.uid && (
        <div className="hidden md:flex items-center space-x-3">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900/80 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400"
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
            className="rounded-lg bg-gray-900/80 text-white font-semibold uppercase px-4 py-2 shadow-lg hover:bg-gray-800/90 transition-all duration-200 hover:scale-105 border border-gray-600 hover:border-gray-400"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-600 hover:border-gray-400 transition-colors duration-200 cursor-pointer"
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
            className="rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold px-4 py-2 transition-colors duration-200 hover:scale-105 shadow-lg"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden">
          <div ref={mobileMenuRef} className="absolute top-16 left-0 w-full bg-black/95 backdrop-blur-sm mobile-menu-enter">
            <div className="p-6">
              {/* User Profile */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-800">
                <img
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                  alt="usericon"
                  src={user?.photoURL || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}
                />
                <div>
                  <p className="text-white font-semibold text-lg">{user?.displayName || 'User'}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
              </div>

              {/* Language Selector */}
              {showGptSearch && (
                <div className="py-4 border-b border-gray-800">
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Language</label>
                  <select
                    className="w-full p-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-gray-500"
                    onChange={handleLanguageChange}
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Menu Items */}
              <div className="py-4 space-y-3">
                <button
                  className="w-full p-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors border border-gray-700 hover:border-gray-600"
                  onClick={handleGptSearchClick}
                >
                  {showGptSearch ? "🏠 Homepage" : "🤖 GPT Search"}
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="w-full p-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  🚪 Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
