import React from 'react'
import Link from 'next/link'
import { AiOutlineTrophy } from 'react-icons/ai'
import { FiShield, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  const exploreLinks = [
    { name: "Futsal Venues", href: "/allvenues" },
    { name: "Join Public Matches", href: "/matches" },
    { name: "Find Teams & Clubs", href: "/teams" },
    { name: "Organize a Tournament", href: "/tournaments" }
  ]

  const ownerLinks = [
    { name: "Owner Dashboard", href: "/owner/dashboard" },
    { name: "Slot Calendar", href: "/owner/calendar" },
    { name: "Revenue Analytics", href: "/owner/analytics" }
  ]

  const locations = ["Kathmandu (Baluwatar, Hadigaun)", "Lalitpur (Sanepa, Jhamsikhel)", "Bhaktapur (Sallaghari)", "Pokhara (Lakeside)"]
  const features = ["Instant Booking", "Double-Booking Protection", "Local Gateways"]

  return (
    <footer className='w-full bg-[#0B0F14] border-t border-gray-800 pt-20 pb-8 px-5'>
      <div className="max-w-6xl mx-auto">

        <div className="top flex max-md:flex-col gap-12 justify-between">

          {/* Brand */}
          <div className="brand max-w-md">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#161F29] border border-gray-700 flex items-center justify-center">
                <AiOutlineTrophy className='text-[#B7F34A] text-2xl' />
              </div>
              <h1 className='text-2xl font-extrabold text-zinc-100'>MATCH <span className='text-[#B7F34A]'>POINT</span></h1>
            </Link>

            <p className='text-zinc-400 mt-5'>
              Find Your Game. Book Your Ground. Play Together. Nepal premier digital platform connecting futsal players, organizers, and arena owners across Kathmandu, Lalitpur, and Pokhara.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-gray-500">
              {features.map((item, index) => {
                return <div key={index} className="flex items-center gap-2">
                  {index === 0 && <FiShield className='text-[#B7F34A]' />}
                  <span>{item}</span>
                  
                </div>
              })}
            </div>
          </div>

          {/* Explore */}
          <div className="explore">
            <h2 className='font-bold text-zinc-100 uppercase'>Explore</h2>
            <div className="flex flex-col gap-3 mt-5 text-sm">
              {exploreLinks.map((link) => {
                return <Link key={link.href} href={link.href} className='text-zinc-400 hover:text-[#B7F34A] transition-all'>{link.name}</Link>
              })}
            </div>
          </div>

          {/* Venue Owners */}
          <div className="owners">
            <h2 className='font-bold text-zinc-100 uppercase'>Venue Owners</h2>
            <div className="flex flex-col gap-3 mt-5 text-sm">
              {ownerLinks.map((link) => {
                return <Link key={link.href} href={link.href} className='text-zinc-400 hover:text-[#B7F34A] transition-all'>{link.name}</Link>
              })}
              <Link href="/owner/register" className='font-semibold text-[#B7F34A]'>Register Your Arena →</Link>
            </div>
          </div>

          {/* Locations */}
          <div className="locations">
            <h2 className='font-bold text-zinc-100 uppercase'>Locations</h2>
            <div className="flex flex-col gap-3 mt-5 text-sm">
              {locations.map((place, index) => {
                return <div key={index} className="flex items-center gap-3 text-zinc-400 max-w-56">
                  <FiMapPin className='text-[#B7F34A] shrink-0' />
                  <span>{place}</span>
                </div>
              })}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="bottom border-t border-gray-800 mt-16 pt-8 flex max-md:flex-col gap-3 justify-between text-sm text-gray-500">
          <p>© 2026 MatchPoint Futsal. All rights reserved.</p>
          <p>Kathmandu, Nepal <span className='mx-3'>•</span> <span className='text-zinc-300'>Built with Passion for Futsal</span></p>
        </div>

      </div>
    </footer>
  )
}

export default Footer