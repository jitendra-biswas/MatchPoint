import React from 'react'
import Navbar from '@/app/Components/Navbar'
import Hero from './Components/Hero'
import FeaturedFootsalArena from '@/app/Components/FeaturedFootsalArena'
import HowMatchPointWork from './Components/HowMatchPointWork'
import FutsalBusinessOwnerLandingpageSection from './Components/FutsalBusinessOwnerLandingpageSection'
import ReviewSectionLandingPage from './Components/ReviewSectionLandingPage'
import Footer from './Components/Footer'

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedFootsalArena />
      <HowMatchPointWork />
      <FutsalBusinessOwnerLandingpageSection />
      <ReviewSectionLandingPage />
      <Footer />
    </div>
  )
}

export default page
