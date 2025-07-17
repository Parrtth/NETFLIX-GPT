import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { auth } from '../utils/firebase'; 
import { updateProfile } from 'firebase/auth'; // Import updateProfile to update user profile after sign up
import { USER_AVATAR } from '../utils/constants';
import { BG_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';




const Login = () => {

  const name = useRef(null);
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, setErrorMessage] = useState('');
   

  const email = useRef(null);
   const password = useRef(null); 
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
    if(message) return;

    if (!isSignInForm) { 
      // Sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR
          });
          await user.reload();
          // Get the updated user from auth.currentUser
          const updatedUser = auth.currentUser;
          dispatch(addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          }));
        })


        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            setErrorMessage("This email is already registered. Please sign in.");
            setIsSignInForm(true); // Switch to sign in form
          } else {
            setErrorMessage(errorCode + " - " + errorMessage);
          }
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // Redirect to browse page after sign in
          // You can also dispatch an action to store user data in Redux or context if needed

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
    const auth = getAuth();
    sendPasswordResetEmail(auth, resetEmail)
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
    <div className="relative h-screen w-screen flex items-center justify-center">
      {/* Background Image */}
      <img 
        className="absolute h-full w-full object-cover"
        src={BG_URL}
        alt="Background"
      />
      {/* Gradient Overlay */}
      <div className="absolute h-full w-full bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
      {/* Header */}
      <Header />
      {/* Responsive Forms */}
      <div className="w-full max-w-md mx-auto z-10">
        {showResetForm ? (
          <form onSubmit={handleResetPassword} className="mt-24 md:mt-32 bg-black/80 rounded-lg shadow-lg p-8 flex flex-col items-center border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center">Update password or email </h2>
            <p className="mb-4 text-white text-center text-sm md:text-base">We will send you an email with instructions on how to reset your password.</p>
            <input
              type="email"
              className="w-full p-3 mb-4 rounded bg-gray-700/80 text-white focus:outline-none"
              placeholder="Email"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded mb-2 transition"
            >
              Email Me
            </button>
            {resetMessage && <p className={`mb-2 text-center ${resetMessage.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{resetMessage}</p>}
            <button
              type="button"
              className="text-blue-400 underline text-sm mt-2"
              onClick={() => { setShowResetForm(false); setResetMessage(""); }}
            >
              Back to Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-12 bg-black/70 rounded-lg flex flex-col z-10 shadow-lg border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6" onClick={handleButtonClick}>
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </h2>
            {!isSignInForm && (
              <input ref={name} type="text" placeholder="Full Name" className="p-3 mb-4 rounded bg-gray-700/80 text-white focus:outline-none" />
            )}
            <input ref={email} type="text" placeholder="Email or mobile number" className="p-3 mb-4 rounded bg-gray-700/80 text-white focus:outline-none" />
            <input ref={password} type="password" placeholder="Password" className="p-3 mb-6 rounded bg-gray-700/80 text-white focus:outline-none" />
            <p className="text-red-600 text-lg mb-4 font-bold">
              {errormessage}
            </p>
            <a
              href="#"
              className="text-blue-400 text-sm mb-4 hover:underline"
              onClick={() => setShowResetForm(true)}
            >
              Forgot password?
            </a>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-300 text-sm">
                Remember me
              </label>
            </div>
            <button className='p-4 my-6 bg-red-700 text-white w-full rounded-lg' onClick={handleButtonClick}>
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </button>
            <div className="text-gray-400 text-sm text-center">
              {isSignInForm ? (
                <>
                  New to Netflix?{' '}
                  <span
                    className="text-white font-semibold hover:underline cursor-pointer"
                    onClick={toggleSignInForm}
                  >
                    Sign up now.
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span
                    className="text-white font-semibold hover:underline cursor-pointer"
                    onClick={toggleSignInForm}
                  >
                    Sign in.
                  </span>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;