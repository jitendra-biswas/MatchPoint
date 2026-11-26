"use client";

import React from "react";
import { motion } from "motion/react";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { BsStarFill } from "react-icons/bs";
import { LuArrowRight } from "react-icons/lu";
import type { FutsalArena } from "./FeaturedFootsalArena";

export interface FootsalArenaCardProps {
  arena: FutsalArena;
  showBookingCard: (arena: FutsalArena) => void;
  onShowDetails?: (arena: FutsalArena) => void;
}

const FootsalArenaCard = ({
  arena,
  showBookingCard,
  onShowDetails,
}: FootsalArenaCardProps) => {
  return (
    <div className="group flex flex-col justify-between border border-zinc-800 rounded-2xl overflow-hidden bg-[#161F29] hover:border-[#B7F34A]/60 transition-all duration-300 shadow-lg hover:shadow-2xl">
      {/* Card Thumbnail */}
      <div className="relative w-full h-52 overflow-hidden bg-zinc-900">
        <img
          src={arena.image}
          alt={arena.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#161F29] via-black/20 to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-xs text-white font-semibold rounded-full px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1">
            <IoLocationOutline className="text-[#B7F34A]" />
            {arena.location}
          </span>

          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#B7F34A] text-zinc-950 shadow-md">
            {arena.availableCourts} Court{arena.availableCourts > 1 ? "s" : ""}
          </span>
        </div>

        {/* Rating Badge */}
        {arena.rating !== undefined && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C1114]/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
            <BsStarFill className="text-amber-400 text-xs" />
            <span>{arena.rating}</span>
            {arena.reviewsCount !== undefined && (
              <span className="text-zinc-400 font-normal text-[10px]">
                ({arena.reviewsCount})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-bold text-zinc-100 group-hover:text-[#B7F34A] transition">
              {arena.name}
            </h2>
          </div>

          <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1.5">
            <IoLocationOutline className="text-zinc-500 shrink-0" />
            <span className="truncate">{arena.address}</span>
          </p>

          {(arena.timing || arena.courtType) && (
            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
              {arena.timing && (
                <span className="flex items-center gap-1 text-[11px]">
                  <IoTimeOutline className="text-[#B7F34A]" /> {arena.timing}
                </span>
              )}
              {arena.timing && arena.courtType && <span>•</span>}
              {arena.courtType && (
                <span className="text-[11px] text-zinc-300 font-medium">
                  {arena.courtType}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Facility Tags */}
        <div className="flex flex-wrap gap-1.5">
          {arena.facilities.slice(0, 3).map((facility, idx) => (
            <span
              key={idx}
              className="border border-zinc-700/60 text-[11px] text-zinc-300 rounded-md px-2 py-0.5 bg-[#1D2935]/60"
            >
              {facility}
            </span>
          ))}
          {arena.facilities.length > 3 && (
            <span className="border border-zinc-800 text-[10px] text-zinc-400 rounded-md px-1.5 py-0.5 bg-[#111820]">
              +{arena.facilities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer / Price & Actions */}
        <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-between mt-1">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
              Hourly Rate
            </span>
            <div className="text-xl font-black text-white">
              NPR {arena.startingPrice.toLocaleString()}
              <span className="text-xs font-normal text-zinc-500"> / hr</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onShowDetails && (
              <button
                type="button"
                onClick={() => onShowDetails(arena)}
                className="px-3 py-2 border border-zinc-700 text-xs font-bold text-zinc-300 rounded-xl hover:border-zinc-500 hover:text-white transition cursor-pointer"
              >
                Details
              </button>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => showBookingCard(arena)}
              className="px-4 py-2 bg-[#B7F34A] text-zinc-950 font-bold text-xs rounded-xl hover:bg-[#c9ff65] transition shadow-md shadow-[#B7F34A]/20 cursor-pointer flex items-center gap-1"
            >
              Book Now
              <LuArrowRight />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootsalArenaCard;
export { FootsalArenaCard, FootsalArenaCard as FutsalArenaCard };
