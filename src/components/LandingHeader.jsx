import React from 'react'
import { Link } from 'react-router-dom'
import { LOGO } from '../utils/constants'
import { Button } from '@/components/ui/button'

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4 bg-gradient-to-b from-black/80 to-transparent">
      <Link to="/" className="flex items-center">
        <img src={LOGO} alt="Netflix" className="h-6 md:h-8 w-auto" />
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button variant="netflix" size="default" className="font-semibold">
            Sign In
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default LandingHeader
