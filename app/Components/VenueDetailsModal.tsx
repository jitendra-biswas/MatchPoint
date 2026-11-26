"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoCloseOutline } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import type { FutsalArena } from "./FeaturedFootsalArena";

interface VenueDetailsModalProps {
  venue: FutsalArena | null;
  onClose: () => void;
  onBookNow: (venue: FutsalArena) => void;
}

const VenueDetailsModal = ({
  venue,
  onClose,
  onBookNow,
}: VenueDetailsModalProps) => {
  useEffect(() => {
    if (!venue) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [venue, onClose]);

  return (
    <AnimatePresence>
      {venue && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#111820] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header with image */}
            <div className="relative h-48 w-full">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#111820] via-black/30 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#B7F34A] hover:text-black transition cursor-pointer"
              >
                <IoCloseOutline size={22} />
              </button>
              <div className="absolute bottom-4 left-6">
                {venue.courtType && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#B7F34A] text-black">
                    {venue.courtType}
                  </span>
                )}
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {venue.name}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-400">Location &amp; Address</span>
                <span className="text-white font-medium text-right">
                  {venue.address}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-400">Available Courts</span>
                <span className="text-white font-bold">
                  {venue.availableCourts} Court(s)
                </span>
              </div>

              {venue.timing && (
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-400">Operating Hours</span>
                  <span className="text-white font-medium">{venue.timing}</span>
                </div>
              )}

              {venue.contactPhone && (
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-400">Contact Number</span>
                  <a
                    href={`tel:${venue.contactPhone}`}
                    className="text-[#B7F34A] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <FiPhone /> {venue.contactPhone}
                  </a>
                </div>
              )}

              <div>
                <h4 className="font-bold text-white mb-2 text-sm">Amenities &amp; Facilities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {venue.facilities.map((fac, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#161F29] border border-zinc-800 text-zinc-300"
                    >
                      <BsCheckCircleFill className="text-[#B7F34A] shrink-0" />
                      <span className="text-[11px] truncate">{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                    Starting Rate
                  </span>
                  <span className="text-xl font-black text-[#B7F34A]">
                    NPR {venue.startingPrice.toLocaleString()} / hr
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const v = venue;
                    onClose();
                    onBookNow(v);
                  }}
                  className="px-6 py-2.5 bg-[#B7F34A] text-zinc-950 font-black rounded-xl hover:bg-[#c9ff65] transition cursor-pointer"
                >
                  Proceed to Booking
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VenueDetailsModal;
