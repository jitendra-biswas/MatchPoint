"use client";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { SlTrophy } from "react-icons/sl";
import { motion } from "motion/react";
import { Show, UserButton } from "@clerk/nextjs";
import RoleModal from "./RoleModal";

const navElem = [
  { name: "Explore Venues", link: "/allvenues" },
  { name: "Find Matches", link: "/#findMatches" },
  { name: "Teams", link: "/#teams" },
  { name: "How It Works", link: "/#howItWorks" },
];

const Navbar = () => {
  const [Active, setActive] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const openRoleModal = () => {
    setActive(false);
    setRoleOpen(true);
  };

  return (
    <div className="fixed flex flex-col w-full bg-[#0C1114]/70 max-md:bg-[#0C1114] backdrop-blur-xs text-white z-99">
      <nav className="w-full h-20 text-white flex items-center px-36 max-md:px-10 max-lg:px-10 justify-between border-b border-b-zinc-700">
        <Link href="/" className="logo flex items-center gap-2 hover:opacity-90 transition">
          <div className="left w-10 h-10 border border-zinc-800 bg-[#161F29] flex items-center justify-center rounded-xl">
            <SlTrophy className="text-[#B7F34A]" />
          </div>
          <div className="right">
            <h1 className="uppercase font-extrabold text-xl max-md:text-[18px]">
              Match <span className="text-[#B7F34A]">Point</span>
            </h1>
            <p className="uppercase text-xs font-bold text-zinc-500">
              Footsal System
            </p>
          </div>
        </Link>

        <div className="elems flex gap-5 max-md:hidden">
          {navElem.map((elem, idx) => (
            <Link
              key={idx}
              href={elem.link}
              className="text-sm font-semibold text-zinc-400 hover:scale-110 transition-all duration-300"
            >
              {elem.name}
            </Link>
          ))}
        </div>

        <Suspense>
          <div className="buttons flex gap-3 max-md:hidden">
            <Show when="signed-out">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={openRoleModal}
                className="px-4 py-1.5 text-xs font-bold rounded-md bg-[#B7F34A] text-zinc-800 cursor-pointer"
              >
                Get Started
              </motion.button>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold hover:scale-110 transition-all"
                >
                  Dashboard
                </Link>
                <UserButton />
              </div>
            </Show>
          </div>
        </Suspense>

        {Active ? (
          <RxCross2
            onClick={() => setActive(false)}
            className="md:hidden text-2xl transition-all"
          />
        ) : (
          <RxHamburgerMenu
            onClick={() => setActive(true)}
            className="md:hidden text-2xl transition-all"
          />
        )}
      </nav>

      {/* Small screens */}
      {Active && (
        <div className="w-full h-fit text-white px-10 flex flex-col gap-2 py-5 transition-all duration-500">
          {navElem.map((elem, idx) => (
            <Link
              key={idx}
              href={elem.link}
              onClick={() => setActive(false)}
              className="text-md font-semibold text-zinc-400"
            >
              {elem.name}
            </Link>
          ))}

          <div className="buttons flex gap-3 items-center mt-2">
            <Suspense>
              <Show when="signed-out">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={openRoleModal}
                  className="px-4 py-1.5 text-xs font-bold rounded-md bg-[#B7F34A] text-zinc-800 cursor-pointer"
                >
                  Get Started
                </motion.button>
              </Show>
              <Show when="signed-in">
                <Link href="/dashboard" className="text-sm font-semibold">
                  Dashboard
                </Link>
                <UserButton />
              </Show>
            </Suspense>
          </div>
        </div>
      )}

      <RoleModal open={roleOpen} onClose={() => setRoleOpen(false)} />
    </div>
  );
};

export default Navbar;