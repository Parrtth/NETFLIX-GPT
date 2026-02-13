import { signOut } from 'firebase/auth'
import React, { useEffect, useState, useRef } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleGptSearchView } from "../utils/gptSlice"
import { changeLanguage } from '../utils/configSlice'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const lang = useSelector(store => store.config?.lang ?? 'en');
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
        navigate('/', { replace: true });
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleLanguageChange = (value) => {
    dispatch(changeLanguage(value));
  }

  return (
    <header className="fixed top-0 left-0 w-full px-4 py-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm z-50 flex justify-between items-center">
      <Link to="/browse" className="block">
        <img
          className="w-28 sm:w-32 md:w-44 p-2 cursor-pointer"
          src={LOGO}
          alt="Netflix"
        />
      </Link>

      {user?.uid && (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-white hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      {user?.uid && (
        <div className="hidden md:flex items-center gap-2">
          {showGptSearch && (
            <Select value={lang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[7.5rem] h-9 bg-zinc-900/95 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 focus:ring-zinc-500">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                {SUPPORTED_LANGUAGES.map((item) => (
                  <SelectItem key={item.identifier} value={item.identifier} className="text-white focus:bg-zinc-800 focus:text-white">
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="outline"
            size="default"
            className="bg-zinc-900/95 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 hover:text-white font-semibold uppercase"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? 'Homepage' : 'GPT Search'}
          </Button>
          <img
            className="size-10 rounded-full object-cover border-2 border-zinc-600 cursor-pointer transition hover:border-zinc-500"
            alt="user"
            src={user?.photoURL || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
            }}
          />
          <Button
            variant="netflix"
            size="default"
            className="font-semibold"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden">
          <div ref={mobileMenuRef} className="absolute top-16 left-0 w-full bg-zinc-950/98 backdrop-blur-sm mobile-menu-enter border-b border-zinc-800">
            <div className="p-6">
              <div className="flex items-center gap-4 pb-6 border-b border-zinc-800">
                <img
                  className="size-16 rounded-full object-cover border-2 border-zinc-700"
                  alt="user"
                  src={user?.photoURL || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}
                />
                <div>
                  <p className="text-white font-semibold text-lg">{user?.displayName || 'User'}</p>
                  <p className="text-zinc-400 text-sm">{user?.email}</p>
                </div>
              </div>

              {showGptSearch && (
                <div className="py-4 border-b border-zinc-800">
                  <label className="text-zinc-400 text-sm font-medium mb-2 block">Language</label>
                  <Select value={lang} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full h-10 bg-zinc-900 border-zinc-700 text-white">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      {SUPPORTED_LANGUAGES.map((item) => (
                        <SelectItem key={item.identifier} value={item.identifier} className="text-white focus:bg-zinc-800 focus:text-white">
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="py-4 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full justify-center h-12 font-medium bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 hover:text-white"
                  onClick={handleGptSearchClick}
                >
                  {showGptSearch ? 'Homepage' : 'GPT Search'}
                </Button>
                <Button
                  variant="netflix"
                  className="w-full justify-center h-12 font-medium"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
