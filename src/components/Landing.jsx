import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { API_OPTIONS, IMG_CDN_URL } from '../utils/constants'
import LandingHeader from './LandingHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ChevronRight, Tv, Download, Smartphone, Users } from 'lucide-react'

const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/week'

const FAQ_ITEMS = [
  {
    q: 'What is Netflix?',
    a: 'Netflix is a streaming service that offers a wide variety of TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want – all for one low monthly price.',
  },
  {
    q: 'How much does Netflix cost?',
    a: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.',
  },
  {
    q: 'Where can I watch?',
    a: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app.',
  },
  {
    q: 'How do I cancel?',
    a: 'Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
  },
  {
    q: 'What can I watch on Netflix?',
    a: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
  },
  {
    q: 'Is Netflix good for kids?',
    a: 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls.',
  },
]

const REASONS = [
  {
    title: 'Enjoy on your TV',
    description: 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
    icon: Tv,
  },
  {
    title: 'Download your shows to watch offline',
    description: 'Save your favourites easily and always have something to watch.',
    icon: Download,
  },
  {
    title: 'Watch everywhere',
    description: 'Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.',
    icon: Smartphone,
  },
  {
    title: 'Create profiles for kids',
    description: 'Send kids on adventures with their favourite characters in a space made just for them.',
    icon: Users,
  },
]

const Landing = () => {
  const navigate = useNavigate()
  const [trending, setTrending] = useState([])
  const [email, setEmail] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/browse')
    })
    return () => unsub()
  }, [navigate])

  useEffect(() => {
    fetch(TRENDING_URL, API_OPTIONS)
      .then((res) => res.json())
      .then((data) => setTrending(data.results?.slice(0, 10) || []))
      .catch(() => setTrending([]))
  }, [])

  const handleGetStarted = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <LandingHeader />
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Unlimited movies, TV shows and more
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Starts at ₹149. Cancel at any time.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <form
            onSubmit={handleGetStarted}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white/10 border-white/30 text-white placeholder:text-gray-400 rounded"
            />
            <Button
              type="submit"
              variant="netflix"
              className="h-12 !rounded-md font-semibold text-lg shrink-0 flex items-center gap-2 px-6"
            >
              Get Started <ChevronRight className="size-5" />
            </Button>
          </form>
        </div>
      </section>

      {/* Trending Now */}
      {trending.length > 0 && (
        <section className="py-12 px-4 md:px-8 border-t border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {trending.map((movie, i) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-40 md:w-48 group cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="relative rounded-lg overflow-hidden ring-1 ring-white/20 group-hover:ring-[#E50914] transition-all">
                  <img
                    src={IMG_CDN_URL + (movie.poster_path || '')}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-black/80 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded">
                    {i + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-300 line-clamp-2">{movie.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More reasons to join */}
      <section className="py-16 px-4 md:px-8 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">More reasons to join</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {REASONS.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="bg-zinc-900/80 border-zinc-700 text-left"
            >
              <CardContent className="pt-6 pb-8">
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm flex-1">{description}</p>
                  <div className="mt-4 flex justify-end">
                    <Icon className="size-10 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 md:px-8 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ_ITEMS.map(({ q, a }) => (
              <AccordionItem
                key={q}
                value={q}
                className="border border-zinc-700 bg-zinc-900/80 rounded-lg px-4 data-[state=open]:rounded-b-none"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:no-underline hover:text-white py-6">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA again */}
      <section className="py-12 px-4 border-t border-white/10">
        <p className="text-center text-gray-400 mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          onSubmit={handleGetStarted}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-white/10 border-white/30 text-white placeholder:text-gray-400 rounded"
          />
          <Button
            type="submit"
            variant="netflix"
            className="h-12 !rounded-md font-semibold text-lg shrink-0 flex items-center gap-2 px-6"
          >
            Get Started <ChevronRight className="size-5" />
          </Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-white/10 text-gray-500">
        <p className="mb-6">Questions? Call 000-800-919-1743</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Help Centre</a>
          <a href="#" className="hover:underline">Account</a>
          <a href="#" className="hover:underline">Media Centre</a>
          <a href="#" className="hover:underline">Investor Relations</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Ways to Watch</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
          <a href="#" className="hover:underline">Corporate Information</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
        <p className="text-sm">Netflix India</p>
      </footer>
    </div>
  )
}

export default Landing
