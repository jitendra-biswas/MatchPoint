import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

export const metadata: Metadata = {
  title: 'MatchPoint - Futsal Management System',
  description: 'MatchPoint is a smart futsal booking and matchmaking platform that makes organizing games easier. Users can find nearby futsal venues, check available time slots, book pitches, split payments with teammates, and join open matches. Venue owners can manage their grounds, schedules, bookings, and pricing through a dedicated dashboard. MatchPoint brings players, organizers, and futsal owners together in one platform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0B0F14] text-white">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}