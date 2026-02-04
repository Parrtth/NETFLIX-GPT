import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingHeader from './LandingHeader'
import { checkValidData } from '../utils/validate'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { USER_AVATAR } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Login = () => {
  const name = useRef(null)
  const password = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Netflix flow: 'email' → 'password' (sign in) or 'signup' (full form)
  const [step, setStep] = useState('email')
  const [emailValue, setEmailValue] = useState('')
  const [errormessage, setErrorMessage] = useState('')
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  const handleContinue = (e) => {
    e.preventDefault()
    const val = emailValue.trim()
    if (!val) {
      setErrorMessage('Please enter your email or mobile number.')
      return
    }
    setErrorMessage('')
    setStep('password')
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    const passwordValue = password.current?.value
    if (!emailValue.trim() || !passwordValue) {
      setErrorMessage('Please enter your password.')
      return
    }
    const message = checkValidData(emailValue, passwordValue)
    if (message) {
      setErrorMessage(message)
      return
    }
    setErrorMessage('')
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const u = userCredential.user
        dispatch(addUser({ uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }))
        navigate('/browse')
      })
      .catch((error) => {
        setErrorMessage(error.message || 'Invalid email or password.')
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    const passwordValue = password.current?.value
    const nameValue = name.current?.value
    if (!emailValue.trim() || !passwordValue) {
      setErrorMessage('Please fill in all fields.')
      return
    }
    if (!nameValue?.trim()) {
      setErrorMessage('Please enter your name.')
      return
    }
    const message = checkValidData(emailValue, passwordValue)
    if (message) {
      setErrorMessage(message)
      return
    }
    setErrorMessage('')
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(async (userCredential) => {
        const user = userCredential.user
        await updateProfile(user, { displayName: nameValue.trim(), photoURL: USER_AVATAR })
        await user.reload()
        const updatedUser = auth.currentUser
        dispatch(addUser({
          uid: updatedUser.uid,
          email: updatedUser.email,
          displayName: updatedUser.displayName,
          photoURL: updatedUser.photoURL,
        }))
        navigate('/browse')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered. Please sign in.')
          setStep('password')
        } else {
          setErrorMessage(error.message || 'Something went wrong.')
        }
      })
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    if (!resetEmail.trim()) {
      setResetMessage('Please enter your email.')
      return
    }
    sendPasswordResetEmail(getAuth(), resetEmail)
      .then(() => setResetMessage("We've sent you an email to reset your password."))
      .catch((error) => setResetMessage('Error: ' + error.message))
  }

  // Netflix-style red-to-black gradient: dark red at top → black at bottom
  const background = (
    <div
      className="fixed inset-0"
      style={{
        background: 'linear-gradient(to bottom, #3d0a0a 0%, #1a0505 25%, #0d0202 50%, #000000 100%)',
      }}
    />
  )

  if (showResetForm) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        {background}
        <LandingHeader />
        <div className="w-full max-w-[400px] px-4 py-28 z-10 relative">
          <form onSubmit={handleResetPassword} className="flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">Reset password</h2>
            <p className="text-gray-400 text-sm mb-6">Enter your email and we'll send you a link to reset your password.</p>
            <label className="text-gray-400 text-sm mb-2">Email</label>
            <Input
              type="email"
              className="w-full h-12 bg-zinc-800/90 border-gray-600 text-white placeholder:text-gray-500 rounded mb-4"
              placeholder="Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <Button type="submit" variant="netflix" className="w-full h-12 font-semibold rounded">
              Email Me
            </Button>
            {resetMessage && (
              <p className={`mt-4 text-sm ${resetMessage.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {resetMessage}
              </p>
            )}
            <button
              type="button"
              className="mt-6 text-gray-400 hover:text-white text-sm"
              onClick={() => { setShowResetForm(false); setResetMessage(''); }}
            >
              Back to Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Step 1: Email only – exact Netflix UI from reference
  if (step === 'email') {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        {background}
        <LandingHeader />
        <div className="w-full max-w-[400px] px-4 py-28 z-10 relative text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Enter your info to sign in
          </h1>
          <p className="text-white/90 text-base mb-8">
            Or get started with a{' '}
            <button
              type="button"
              className="text-white font-medium underline hover:no-underline"
              onClick={() => setStep('signup')}
            >
              new account
            </button>
            .
          </p>
          <form onSubmit={handleContinue} className="flex flex-col">
            <label htmlFor="email" className="text-gray-400 text-sm mb-2 text-left">
              Email or mobile number
            </label>
            <Input
              id="email"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="patelparth7719@gmail.com"
              value={emailValue}
              onChange={(e) => { setEmailValue(e.target.value); setErrorMessage(''); }}
              className="w-full h-12 bg-zinc-800/90 border-gray-600 text-white placeholder:text-gray-500 rounded mb-4"
            />
            <p className="text-red-400 text-sm mb-2 min-h-[20px] text-left">{errormessage}</p>
            <Button type="submit" variant="netflix" className="w-full h-12 text-base font-semibold rounded">
              Continue
            </Button>
          </form>
          <div className="mt-8 text-left">
            <p className="text-white text-sm font-medium mb-2">Get Help</p>
            <a
              href="#"
              className="text-blue-400 text-sm underline block mb-1 hover:text-blue-300"
              onClick={(e) => { e.preventDefault(); setShowResetForm(true); }}
            >
              Forgot email or mobile number?
            </a>
            <a href="#" className="text-blue-400 text-sm underline block hover:text-blue-300">
              Learn more about sign-in
            </a>
          </div>
          <p className="mt-8 text-gray-600 text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
              Learn more
            </a>
          </p>
        </div>
      </div>
    )
  }

  // Step 2: Password (sign in)
  if (step === 'password') {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        {background}
        <LandingHeader />
        <div className="w-full max-w-[400px] px-4 py-28 z-10 relative text-center md:text-left">
          <button
            type="button"
            className="text-gray-400 hover:text-white text-sm mb-6 block"
            onClick={() => { setStep('email'); setErrorMessage(''); }}
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-6">{emailValue}</p>
          <form onSubmit={handleSignIn} className="flex flex-col">
            <label htmlFor="password" className="text-gray-400 text-sm mb-2 text-left">
              Password
            </label>
            <Input
              ref={password}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full h-12 bg-zinc-800/90 border-gray-600 text-white placeholder:text-gray-500 rounded mb-4"
            />
            <p className="text-red-400 text-sm mb-2 min-h-[20px] text-left">{errormessage}</p>
            <Button type="submit" variant="netflix" className="w-full h-12 text-base font-semibold rounded">
              Sign In
            </Button>
          </form>
          <div className="mt-8 text-left">
            <p className="text-white text-sm font-medium mb-2">Get Help</p>
            <a
              href="#"
              className="text-blue-400 text-sm underline block mb-1 hover:text-blue-300"
              onClick={(e) => { e.preventDefault(); setShowResetForm(true); }}
            >
              Forgot email or mobile number?
            </a>
            <a href="#" className="text-blue-400 text-sm underline block hover:text-blue-300">
              Learn more about sign-in
            </a>
          </div>
          <p className="mt-8 text-gray-600 text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
              Learn more
            </a>
          </p>
        </div>
      </div>
    )
  }

  // Step: Sign up (new account)
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {background}
      <LandingHeader />
      <div className="w-full max-w-[400px] px-4 py-28 z-10 relative text-center md:text-left">
        <button
          type="button"
          className="text-gray-400 hover:text-white text-sm mb-6 block"
          onClick={() => { setStep('email'); setErrorMessage(''); }}
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <label className="text-gray-400 text-sm mb-2 text-left">Full Name</label>
          <Input
            ref={name}
            type="text"
            autoComplete="name"
            placeholder="Full Name"
            className="w-full h-12 bg-zinc-800/90 border-gray-600 text-white placeholder:text-gray-500 rounded mb-4"
          />
          <label className="text-gray-400 text-sm mb-2 text-left">Email or mobile number</label>
          <Input
            type="text"
            inputMode="email"
            placeholder="Email or mobile number"
            value={emailValue}
            onChange={(e) => { setEmailValue(e.target.value); setErrorMessage(''); }}
            className="w-full h-12 bg-zinc-800/90 border-gray-600 text-white placeholder:text-gray-500 rounded mb-4"
          />
          <label className="text-gray-400 text-sm mb-2 text-left">Password</label>
          <Input
            ref={password}
            type="password"
            autoComplete="new-password"
            placeholder="Password (min 6 characters)"
            className="w-full h-12 bg-zinc-800/90 border-gray-600 text-white placeholder:text-gray-500 rounded mb-4"
          />
          <p className="text-red-400 text-sm mb-2 min-h-[20px] text-left">{errormessage}</p>
          <Button type="submit" variant="netflix" className="w-full h-12 text-base font-semibold rounded">
            Sign Up
          </Button>
        </form>
        <p className="mt-6 text-gray-400 text-base">
          Already have an account?{' '}
          <button type="button" className="text-white font-semibold underline hover:no-underline" onClick={() => setStep('email')}>
            Sign in
          </button>
        </p>
        <p className="mt-8 text-gray-600 text-xs">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
            Learn more
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
