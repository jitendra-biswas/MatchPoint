"use client";

import FootsalArenaCard from "./FootsalArenaCard";
import ArenaBookingModal from "./ArenaBookingModal";
import VenueDetailsModal from "./VenueDetailsModal";
import Link from "next/link";
import { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useUser, useClerk } from "@clerk/nextjs";
import venuesData from "@/app/data/venues.json";

export interface FutsalArena {
  id: number;
  name: string;
  location: string;
  address: string;
  image: string;
  availableCourts: number;
  facilities: string[];
  startingPrice: number;
  city?: string;
  rating?: number;
  reviewsCount?: number;
  courtType?: string;
  timing?: string;
  contactPhone?: string;
}

const FeaturedFootsalArena = () => {
  const [selectedArena, setSelectedArena] = useState<FutsalArena | null>(null);
  const [detailsModalVenue, setDetailsModalVenue] = useState<FutsalArena | null>(null);
  const { isLoaded, isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();

  // Pick top 3 featured arenas directly from the shared venues JSON data
  const futsalArenas: FutsalArena[] = venuesData.slice(0, 3) as FutsalArena[];

  const handleBooking = (arena: FutsalArena) => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      redirectToSignIn({
        redirectUrl: window.location.href,
      });
      return;
    }

    setSelectedArena(arena);
  };

  return (
    <div id="exploreVenues" className="relative w-full min-h-screen bg-[#0B0F14] px-36 max-md:px-3 pb-10">
      <div className="flex max-md:flex-col max-md:items-start justify-between items-center">
        <div>
          <h2 className="font-semibold text-[#B7F34A] text-sm pt-20">
            Top Rated Grounds
          </h2>

          <h1 className="text-3xl font-extrabold text-zinc-100">
            Featured Futsal Arenas
          </h1>

          <p className="text-sm text-zinc-500">Verified futsal arenas</p>
        </div>

        <Link
          href="/allvenues"
          className="text-[#B7F34A] mt-10 max-md:mt-2 border border-[#B7F34A]/30 p-2 rounded-md text-xs flex items-center gap-1 hover:bg-[#B7F34A] hover:text-black transition"
        >
          View All Venues <LiaAngleRightSolid />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {futsalArenas.map((arena) => (
          <FootsalArenaCard
            key={arena.id}
            arena={arena}
            showBookingCard={() => handleBooking(arena)}
            onShowDetails={() => setDetailsModalVenue(arena)}
          />
        ))}
      </div>

      {detailsModalVenue && (
        <VenueDetailsModal
          venue={detailsModalVenue}
          onClose={() => setDetailsModalVenue(null)}
          onBookNow={handleBooking}
        />
      )}

      {selectedArena && (
        <ArenaBookingModal
          arena={selectedArena}
          onClose={() => setSelectedArena(null)}
        />
      )}
    </div>
  );
};

export default FeaturedFootsalArena;
