"use client";

import FootsalArenaCard from "./FootsalArenaCard";
import ArenaBookingModal from "./ArenaBookingModal";
import Link from "next/link";
import { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useUser, useClerk } from "@clerk/nextjs";


export interface FutsalArena {
  id: number;
  name: string;
  location: string;
  address: string;
  image: string;
  availableCourts: number;
  facilities: string[];
  startingPrice: number;
}

const FeaturedFootsalArena = () => {
  const [selectedArena, setSelectedArena] = useState<FutsalArena | null>(null);
  const { isLoaded, isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();


  const futsalArenas = [
    {
      id: 1,
      name: "Field Futsal Sanepa",
      location: "Lalitpur",
      address: "Sanepa Heights, Lalitpur",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800",
      availableCourts: 2,
      facilities: [
        "Covered Roofing (Rainproof)",
        "Air Ventilation System",
        "Changing Rooms & Hot Showers",
      ],
      startingPrice: 1600,
    },
    {
      id: 2,
      name: "Dhuku Futsal Hub",
      location: "Kathmandu",
      address: "Dhumbarahi, Kathmandu",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      availableCourts: 3,
      facilities: [
        "Premium Artificial Turf",
        "Floodlights",
        "Parking Available",
      ],
      startingPrice: 1800,
    },
    {
      id: 3,
      name: "Kick Off Futsal",
      location: "Bhaktapur",
      address: "Suryabinayak, Bhaktapur",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
      availableCourts: 1,
      facilities: ["Covered Roofing", "Changing Rooms", "Cafeteria Available"],
      startingPrice: 1400,
    },
  ];

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

      <div className="mt-10 flex max-md:flex-col max-md:gap-5 justify-between">
        {futsalArenas.map((arena) => (
          <FootsalArenaCard
            key={arena.id}
            arena={arena}
            showBookingCard={() => handleBooking(arena)}
          />
        ))}
      </div>

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
