import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom  
import { updateProfile } from 'firebase/auth'; // Import updateProfile to update user profile after sign up

// const name = useRef(null);

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Import useNavigate from react-router-dom
  // Create refs for email and password inputs

  const email = useRef(null);
   const password = useRef(null); 

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
      createUserWithEmailAndPassword(
        auth, 
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/v2/D4D35AQF2PvlXx5ubiA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1725304299224?e=1752580800&v=beta&t=2-7DZUy1QPfw3r-AXVZEg18EOxMKlO1Zdm95315E96Q"
          }).then(() => {
            navigate('/browse'); 
            // Profile updated!
            // ...
          })
          // .catch((error) => {
          //   setErrorMessage(error.message);
          //   // An error occurred
          //   // ...
          // });

//           console.log(user);
//           // Redirect to browse page after sign up

//         })
//         .catch((error) => {
//           const errorCode = error.code;
//   // An error occurred
//   // ...
// });

          console.log(user);
          navigate('/browse'); // Redirect to browse page after sign up

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
          console.log(user);
          navigate('/browse'); // Redirect to browse page after sign in
          // You can also dispatch an action to store user data in Redux or context if needed

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
}
  

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <img 
        className="absolute h-full w-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg"
        alt="Background"
      />
      {/* Gradient Overlay */}
      <div className="absolute h-full w-full bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
      {/* Header */}
      <Header />
      {/* Login Form */}
      <form onSubmit={(e) => e.preventDefault()} className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-12 bg-black/70 rounded-lg flex flex-col z-10 shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6" onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h2>
        {!isSignInForm && (
        <input type="text" placeholder="Full Name" className="p-3 mb-4 rounded bg-gray-700/80 text-white focus:outline-none" /> )}
        <input  ref={email} type="text" placeholder="Email or mobile number" className="p-3 mb-4 rounded bg-gray-700/80 text-white focus:outline-none" />
        <input ref={password} type="password" placeholder="Password" className="p-3 mb-6 rounded bg-gray-700/80 text-white focus:outline-none" />
        <p className="text-red-600 text-lg mb-4 font-bold">
          {errormessage}
        </p>
        {/* <button className="bg-red-600 hover:bg-red-700 p-3 mb-4 rounded font-semibold text-white text-lg transition">Sign In</button> */}
        <a href="#" className="text-blue-400 text-sm mb-4 hover:underline">Forgot password?</a>
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
    </div>
  )
};

export default Login