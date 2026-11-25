"use client";
import { GoArrowRight } from "react-icons/go";
import { motion } from "motion/react";
import { BsCheckCircle } from "react-icons/bs";

const FutsalBusinessOwnerLandingpageSection = () => {
  return (
    <div className="w-full min-h-fit bg-[#0B0F14] px-36 max-md:px-3 py-20 flex max-md:flex-col gap-5">
      <div className="left flex flex-col gap-5">
        <h2 className="text-sm font-bold text-[#B7F34A]">
          For Futsal Business Owners
        </h2>
        <h1 className="text-4xl max-md:text-3xl font-extrabold text-zinc-100">
          Stop Managing Bookings on Notebooks and WhatsApp.
        </h1>
        <p className="text-sm text-zinc-400">
          MatchPoint gives futsal arena owners a digital management platform.
          Track peak vs off-peak revenues, block maintenance hours, prevent
          double bookings, and accept direct advance payments.
        </p>
        <ul className="text-sm text-zinc-200 flex flex-col gap-3 font-semibold">
          <li className="flex items-center gap-1">
            <BsCheckCircle className="text-[#B7F34A]" />
            Automated slot calendar with zero scheduling clashes
          </li>
          <li className="flex items-center gap-1">
            <BsCheckCircle className="text-[#B7F34A]" />
            Real-time daily, weekly, and monthly revenue analytics
          </li>
          <li className="flex items-center gap-1">
            <BsCheckCircle className="text-[#B7F34A]" />
            Direct advance payment confirmation via eSewa & Khalti
          </li>
          <li className="flex items-center gap-1">
            <BsCheckCircle className="text-[#B7F34A]" />
            Multi-court management under a single business portal
          </li>
        </ul>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-fit bg-[#B7F34A] text-zinc-900 font-semibold px-7 py-3 max-md:px-3 max-md:py-1 max-md:rounded-md flex items-center gap-2 rounded-xl outline-2 outline-zinc-800"
        >
          Explore Owner Portal <GoArrowRight />
        </motion.div>
      </div>
      <motion.div
        className="right  w-[65vw] max-md:w-full border border-[#293744] rounded-[22px] bg-[#161F29] p-7 max-md:p-4 h-fit max-md:mt-10"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 border-b border-[#293744] pb-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">
              Business Revenue Snapshot
            </h2>

            <h1 className="font-bold text-2xl max-md:text-lg text-zinc-100 mt-2">
              Field Futsal Sanepa
            </h1>
          </div>

          <p className="text-sm max-md:text-xs font-bold text-emerald-400 border border-emerald-800 rounded-full px-3 py-2 bg-[#162E32] whitespace-nowrap">
            +18.4% This Month
          </p>
        </div>

        {/* REVENUE AND OCCUPANCY */}
        <div className="grid grid-cols-2  gap-5 mt-7">
          {/* TODAY REVENUE */}
          <motion.div
            whileHover={{ y: -4 }}
            className="border border-[#293744] rounded-2xl bg-[#111820] p-5 flex flex-col gap-1"
          >
            <p className="text-xs text-sky-200">Today Revenue</p>

            <h2 className="text-xl max-md:text-2xl font-extrabold text-[#B7F34A]">
              NPR 16,800
            </h2>

            <p className="text-xs font-medium text-emerald-400">
              8 Slots Confirmed
            </p>
          </motion.div>

          {/* SLOT OCCUPANCY */}
          <motion.div
            whileHover={{ y: -4 }}
            className="border border-[#293744] rounded-2xl bg-[#111820] p-5 flex flex-col gap-1"
          >
            <p className="text-xs text-sky-200">Slot Occupancy</p>

            <h2 className="text-xl max-md:text-2xl font-extrabold text-zinc-100">
              82.5%
            </h2>

            <p className="text-xs font-medium text-sky-300">
              Peak Hours 100% Full
            </p>
          </motion.div>
        </div>

        {/* SMART SLOT BLOCKER */}
        <div className="mt-7 border border-[#293744] hover:border-[#B7F34A] rounded-2xl bg-[#1A2632] p-5 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <BsCheckCircle className="text-[#B7F34A] text-base" />

            <h3 className="text-sm font-bold text-zinc-100">
              Smart Slot Blocker Active
            </h3>
          </div>

          <p className="text-xs text-sky-200 mt-2 leading-relaxed">
            4:00 PM - 5:00 PM marked as maintenance. Auto-reflected on player
            booking view.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FutsalBusinessOwnerLandingpageSection;
