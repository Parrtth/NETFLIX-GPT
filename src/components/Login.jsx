import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingHeader from './LandingHeader'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { USER_AVATAR, BG_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Login = () => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, setErrorMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!emailValue || !passwordValue) {
      setErrorMessage("Email and password are required.");
      return;
    }

    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR
          });
          await user.reload();
          const updatedUser = auth.currentUser;
          dispatch(addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          }));
          navigate('/browse');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            setErrorMessage("This email is already registered. Please sign in.");
            setIsSignInForm(true);
          } else {
            setErrorMessage(errorCode + " - " + errorMessage);
          }
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const u = userCredential.user;
          dispatch(addUser({
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
          }));
          navigate('/browse');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  }

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetMessage("Please enter your email to reset password.");
      return;
    }
    const authInstance = getAuth();
    sendPasswordResetEmail(authInstance, resetEmail)
      .then(() => {
        setResetMessage("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        setResetMessage("Error: " + error.message);
      });
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="fixed inset-0">
        <img className="h-full w-full object-cover" src={BG_URL} alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
      </div>

      <LandingHeader />

      <div className="w-full max-w-[450px] px-4 py-24 z-10 relative">
        {showResetForm ? (
          <Card className="w-full bg-black/90 border-zinc-700 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleResetPassword} className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
                  Update password
                </h2>
                <p className="mb-6 text-gray-300 text-center text-sm md:text-base">
                  We will send you an email with instructions to reset your password.
                </p>
                <Input
                  type="email"
                  className="w-full h-11 mb-4 bg-zinc-800/50 border-zinc-600 text-white placeholder:text-gray-400"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                />
            <Button
              type="submit"
              variant="netflix"
              className="w-full py-3 mb-4 font-bold"
            >
              Email Me
            </Button>
            {resetMessage && (
              <p className={`mb-4 text-center text-sm ${resetMessage.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {resetMessage}
              </p>
            )}
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
                  onClick={() => { setShowResetForm(false); setResetMessage(""); }}
                >
                  Back to Sign In
                </button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full bg-black/90 border-zinc-700 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
                <h2 className="text-3xl font-bold text-white mb-8">
                  {isSignInForm ? 'Sign In' : 'Sign Up'}
                </h2>
                {!isSignInForm && (
                  <Input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="mb-4 h-11 bg-zinc-800/50 border-zinc-600 text-white placeholder:text-gray-400"
                  />
                )}
                <Input
                  ref={email}
                  type="text"
                  placeholder="Email or mobile number"
                  className="mb-4 h-11 bg-zinc-800/50 border-zinc-600 text-white placeholder:text-gray-400"
                />
                <Input
                  ref={password}
                  type="password"
                  placeholder="Password"
                  className="mb-6 h-11 bg-zinc-800/50 border-zinc-600 text-white placeholder:text-gray-400"
                />
            <p className="text-red-500 text-sm mb-4 font-semibold min-h-[20px]">
              {errormessage}
            </p>
            <Button
              variant="netflix"
              className="w-full my-2 py-3.5 font-bold text-base"
              onClick={handleButtonClick}
            >
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </Button>

            <div className="flex items-center justify-between mt-4 mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2 h-4 w-4 accent-red-600 bg-gray-700 border-none rounded" />
                <label htmlFor="remember" className="text-gray-400 text-sm select-none cursor-pointer">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-gray-400 text-sm hover:text-white hover:underline transition-colors"
                onClick={(e) => { e.preventDefault(); setShowResetForm(true); }}
              >
                Forgot password?
              </a>
            </div>

            <div className="text-gray-400 text-base mt-4">
              {isSignInForm ? (
                <p>
                  New to Netflix?{' '}
                  <span
                    className="text-white font-semibold hover:underline cursor-pointer ml-1"
                    onClick={toggleSignInForm}
                  >
                    Sign up now.
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <span
                    className="text-white font-semibold hover:underline cursor-pointer ml-1"
                    onClick={toggleSignInForm}
                  >
                    Sign in.
                  </span>
                </p>
              )}
            </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;
