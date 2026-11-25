"use client"
import Link from 'next/link'
import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { LuSparkles } from 'react-icons/lu'
import { motion } from "motion/react"

const Hero = () => {
  return (
    <div className='w-full h-screen border-b border-b-gray-800  bg-linear-to-b from-[#141C14] to-[#0F1416] text-white pt-40 pb-10 flex flex-col items-center gap-5 '>
        <p className='text-xs font-semibold text-[#B7F34A] bg-[#161F27] w-fit h-fit rounded-full flex items-center gap-1 py-1 px-3 border border-zinc-700'><LuSparkles /> Nepal Premier Futsal Booking & Matchmaking Platform</p>
     <div className='text-center text-7xl max-md:text-4xl'>
         <h1 className='font-extrabold '>Your Next Game</h1>
      <h1 className='font-extrabold  text-[#B7F34A]'>Starts Here.</h1>
     </div>
     <p className='text-center text-xl max-md:text-sm text-zinc-400 max-md:hidden'>
        Discover futsal grounds, book your next match, and bring your team <br /> together with MatchPoint. Say goodbye to messy WhatsApp groups and <br /> double bookings.
     </p>
     {/* Paragraph for small screen */}
     <p className='text-center text-xl max-md:text-sm text-zinc-400 md:hidden px-5'>
        Discover futsal grounds, book your next match, and bring your team together with MatchPoint. Say goodbye to messy WhatsApp groups and double bookings.
     </p>
     <div className="buttons flex gap-5 max-md:mt-10">
        <Link href="#">
        <motion.div whileHover={{scale:1.1}}  className='bg-[#B7F34A] text-zinc-900 font-semibold px-7 py-3 max-md:px-3 max-md:py-1 max-md:rounded-md flex items-center gap-2 rounded-xl outline-2 outline-zinc-800'>
            Find a Futsal <GoArrowRight />
        </motion.div>
        </Link>
        <Link href="#">
        <motion.div whileHover={{scale:1.1}} className='bg-[#161E27]  font-semibold px-7 py-3 max-md:px-3 max-md:py-1 max-md:rounded-md  rounded-xl outline-2 outline-zinc-500'>
            Organize a Match
        </motion.div>
        </Link>
     </div>
     <div className="hero-footer flex gap-20 max-md:gap-5 pt-5 mt-5 border-t border-t-zinc-800">
      <div className="div text-center">
         <h1 className='text-2xl max-md:text-xl font-bold'>35+</h1>
         <p className='text-xs text-zinc-400'>Verified Futsal Arenas</p>
      </div>
      <div className="div text-center">
         <h1 className='text-2xl max-md:text-xl font-bold text-[#B7F34A]'>1,000+</h1>
         <p className='text-xs text-zinc-400'>Hours Booked</p>
      </div>
     
      <div className="div text-center">
         <h1 className='text-2xl max-md:text-xl font-bold'>eSewa/Khalti</h1>
         <p className='text-xs text-zinc-400'>Instant Payments</p>
      </div>
     </div>
    </div>
  )
}

export default Hero
