
"use client";

import { CiLocationOn } from "react-icons/ci";
import { motion } from "motion/react";
import type { FutsalArena } from "./FeaturedFootsalArena";

interface FootsalArenaCardProps {
  arena: FutsalArena;
  showBookingCard: (arena: FutsalArena) => void;
}

const FootsalArenaCard = ({ arena, showBookingCard }: FootsalArenaCardProps) => {
  return (
    <div className=" group max-w-96 min-h-[60vh] border border-zinc-800 rounded-2xl overflow-hidden bg-[#161F29] cursor-pointer hover:border-green-700 transition-all duration-300">

      <div className="relative thumbnail w-full h-46 overflow-hidden">
        <img
          className="w-full h-full object-center object-cover group-hover:scale-105 transition-all duration-300"
          src={arena.image}
          alt={arena.name}
        />

        <div className="absolute w-full h-full top-0 left-0 bg-transparent p-3 flex flex-col justify-between">
          <p className="text-xs text-zinc-200 w-fit h-fit font-semibold rounded-full px-2 py-1 bg-[#21292F] flex items-center">
            <CiLocationOn className="text-[14px] text-[#B7F34A]" />
            {arena.location}
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-fit text-black text-xs px-2 py-1 font-bold rounded-md bg-[#B7F34A] cursor-pointer"
          >
            {arena.availableCourts} Courts Available
          </motion.button>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div>
          <h1 className="text-zinc-100 font-bold text-xl">
            {arena.name}
          </h1>

          <p className="text-zinc-400 text-xs flex items-center gap-1">
            <CiLocationOn className="text-[14px]" />
            {arena.address}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {arena.facilities.map((facility: string, index: number) => (
            <p
              key={index}
              className="border border-gray-700 text-xs text-zinc-200 w-fit h-fit rounded-full px-2 py-0.5 bg-[#1D2935]"
            >
              {facility}
            </p>
          ))}
        </div>

        <div className="card-footer flex justify-between items-center border-t border-t-gray-800 pt-5">
          <div>
            <h2 className="uppercase text-zinc-500 text-xs font-semibold">
              starting from
            </h2>

            <h1 className="text-2xl text-zinc-100 font-bold">
              NPR {arena.startingPrice.toLocaleString()}
              <span className="text-xs font-medium text-zinc-500">
                {" "}/ hr
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border border-zinc-700 text-zinc-100 text-xs px-2 py-1 rounded-md cursor-pointer"
            >
              Details
            </motion.button>

            <motion.button
             onClick={() => showBookingCard(arena)}
              whileHover={{ scale: 1.1 }}
              className="border border-zinc-700 text-black text-xs px-2 py-1 rounded-md bg-[#B7F34A] cursor-pointer"
            >
              Book Now
            </motion.button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default FootsalArenaCard;
