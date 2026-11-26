"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import ArenaBookingModal from "@/app/Components/ArenaBookingModal";
import FootsalArenaCard from "@/app/Components/FootsalArenaCard";
import VenueDetailsModal from "@/app/Components/VenueDetailsModal";
import venuesData from "@/app/data/venues.json";
import { useUser, useClerk } from "@clerk/nextjs";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type { FutsalArena } from "@/app/Components/FeaturedFootsalArena";

export interface VenueItem {
  id: number;
  name: string;
  location: string;
  city: string;
  address: string;
  image: string;
  availableCourts: number;
  facilities: string[];
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  courtType: string;
  timing: string;
  contactPhone: string;
}

const typedVenues: VenueItem[] = venuesData as VenueItem[];

const CITIES = ["All Cities", "Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara"];
const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating_desc" },
];

export default function AllVenuesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [selectedFacility, setSelectedFacility] = useState("all");
  const [selectedArenaForBooking, setSelectedArenaForBooking] = useState<FutsalArena | null>(null);
  const [detailsModalVenue, setDetailsModalVenue] = useState<VenueItem | null>(null);

  const { isLoaded, isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();

  // Extract unique facilities
  const allFacilities = useMemo(() => {
    const set = new Set<string>();
    typedVenues.forEach((v) => {
      v.facilities.forEach((f) => {
        // extract shorter tag
        if (f.includes("Covered") || f.includes("Rainproof")) set.add("Covered");
        else if (f.includes("Turf")) set.add("Premium Turf");
        else if (f.includes("Parking")) set.add("Parking");
        else if (f.includes("Shower") || f.includes("Changing")) set.add("Showers/Lockers");
        else if (f.includes("Cafeteria") || f.includes("Beverages") || f.includes("Juice")) set.add("Cafeteria");
      });
    });
    return Array.from(set);
  }, []);

  // Filter and sort venues
  const filteredVenues = useMemo(() => {
    return typedVenues
      .filter((venue) => {
        // City match
        if (selectedCity !== "All Cities" && venue.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }

        // Search match (name, address, location)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = venue.name.toLowerCase().includes(q);
          const matchesLoc = venue.location.toLowerCase().includes(q);
          const matchesAddress = venue.address.toLowerCase().includes(q);
          const matchesFacility = venue.facilities.some((f) => f.toLowerCase().includes(q));
          if (!matchesName && !matchesLoc && !matchesAddress && !matchesFacility) {
            return false;
          }
        }

        // Facility match
        if (selectedFacility !== "all") {
          const hasFacility = venue.facilities.some((f) =>
            f.toLowerCase().includes(selectedFacility.toLowerCase())
          );
          if (!hasFacility) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === "price_asc") return a.startingPrice - b.startingPrice;
        if (selectedSort === "price_desc") return b.startingPrice - a.startingPrice;
        if (selectedSort === "rating_desc") return b.rating - a.rating;
        return a.id - b.id; // recommended
      });
  }, [searchQuery, selectedCity, selectedSort, selectedFacility]);

  const handleBooking = (arena: FutsalArena) => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      redirectToSignIn({
        redirectUrl: window.location.href,
      });
      return;
    }

    setSelectedArenaForBooking(arena);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCity("All Cities");
    setSelectedSort("recommended");
    setSelectedFacility("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCity !== "All Cities" ||
    selectedSort !== "recommended" ||
    selectedFacility !== "all";

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 pb-16 px-4 md:px-12 lg:px-24 xl:px-32">
        {/* Header Hero Section */}
        <div className="py-8 border-b border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161F27] border border-zinc-700 text-[#B7F34A] text-xs font-semibold mb-3">
                <LuSparkles /> Verified Futsal Arenas in Nepal
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-zinc-100 tracking-tight">
                Explore All <span className="text-[#B7F34A]">Futsal Venues</span>
              </h1>
              <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-2xl">
                Discover, compare prices, check live availability, and book premier futsal courts
                across Kathmandu Valley and Pokhara with instant confirmation.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#161F29] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-300">
              <span className="font-bold text-[#B7F34A] text-lg">{filteredVenues.length}</span>
              <span>Available Arenas Listed</span>
            </div>
          </div>

          {/* Search Bar & Primary Filters */}
          <div className="mt-8 flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by arena name, neighborhood, or facility..."
                className="w-full pl-12 pr-10 py-3.5 bg-[#161F29] border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#B7F34A] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#161F29] border border-zinc-800 rounded-xl px-3 py-2 text-xs">
                <FiSliders className="text-[#B7F34A]" />
                <span className="text-zinc-400 hidden sm:inline">Sort:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent text-white font-semibold focus:outline-hidden cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#161F29] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-3 py-3 border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <FiX /> Reset
                </button>
              )}
            </div>
          </div>

          {/* City Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {CITIES.map((city) => {
              const isSelected = selectedCity === city;
              const count =
                city === "All Cities"
                  ? typedVenues.length
                  : typedVenues.filter((v) => v.city.toLowerCase() === city.toLowerCase()).length;

              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-[#B7F34A] text-zinc-950 shadow-md shadow-[#B7F34A]/20"
                      : "bg-[#161F29] text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white"
                  }`}
                >
                  <span>{city}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-black/20 text-zinc-900" : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Facility Quick Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 mr-1 text-[11px] uppercase tracking-wider font-semibold">
              Facility:
            </span>
            <button
              onClick={() => setSelectedFacility("all")}
              className={`px-3 py-1 rounded-lg text-xs transition cursor-pointer ${
                selectedFacility === "all"
                  ? "bg-zinc-700 text-white font-bold"
                  : "bg-[#111820] text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              All Facilities
            </button>
            {allFacilities.map((fac) => (
              <button
                key={fac}
                onClick={() => setSelectedFacility(selectedFacility === fac ? "all" : fac)}
                className={`px-3 py-1 rounded-lg text-xs transition cursor-pointer ${
                  selectedFacility === fac
                    ? "bg-[#B7F34A]/20 text-[#B7F34A] border border-[#B7F34A]/50 font-bold"
                    : "bg-[#111820] text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {fac}
              </button>
            ))}
          </div>
        </div>

        {/* Venues Grid */}
        <div className="mt-10">
          {filteredVenues.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-3xl bg-[#111820]/50 p-8">
              <div className="w-16 h-16 rounded-2xl bg-[#161F29] border border-zinc-800 flex items-center justify-center text-zinc-500 text-2xl mb-4">
                <FiSearch />
              </div>
              <h3 className="text-xl font-bold text-white">No futsal arenas match your search</h3>
              <p className="text-zinc-400 text-sm mt-1 max-w-md">
                We couldn&apos;t find any venues matching &ldquo;{searchQuery || selectedCity}&rdquo;.
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 px-6 py-2.5 rounded-xl bg-[#B7F34A] text-zinc-950 font-bold text-xs hover:bg-[#c9ff65] transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((arena) => (
                <FootsalArenaCard
                  key={arena.id}
                  arena={arena}
                  showBookingCard={() => handleBooking(arena)}
                  onShowDetails={() => setDetailsModalVenue(arena)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      {detailsModalVenue && (
        <VenueDetailsModal
          venue={detailsModalVenue}
          onClose={() => setDetailsModalVenue(null)}
          onBookNow={handleBooking}
        />
      )}

      {/* Booking Modal */}
      {selectedArenaForBooking && (
        <ArenaBookingModal
          arena={selectedArenaForBooking}
          onClose={() => setSelectedArenaForBooking(null)}
        />
      )}

      <Footer />
    </div>
  );
}
