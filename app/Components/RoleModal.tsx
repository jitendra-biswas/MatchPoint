"use client";
import React, { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { LuUser, LuBuilding2 } from "react-icons/lu";

const roles = [
  {
    key: "player",
    title: "I'm a Player",
    desc: "Find venues, join matches and build your team.",
    Icon: LuUser,
  },
  {
    key: "owner",
    title: "I'm a Futsal Owner",
    desc: "List your court, manage bookings and grow revenue.",
    Icon: LuBuilding2,
  },
];

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

const RoleModal = ({ open, onClose }: RoleModalProps) => {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // lock scroll + close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const choose = (role: string) => {
    onClose();
    router.push(`/sign-up?role=${role}`);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ y: 24, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Choose how you want to continue"
            className="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-[#0C1114] p-6 text-white shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
            >
              <RxCross2 className="text-xl" />
            </button>

            <h2 className="text-xl font-extrabold">Welcome to Match Point</h2>
            <p className="mt-1 text-sm text-zinc-400">
              How do you want to use the platform?
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {roles.map(({ key, title, desc, Icon }) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => choose(key)}
                  className="group flex items-center gap-4 rounded-xl border border-zinc-700 bg-[#161F29] p-4 text-left transition-colors hover:border-[#B7F34A]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-[#0C1114]">
                    <Icon className="text-xl text-[#B7F34A]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{title}</p>
                    <p className="text-xs text-zinc-400">{desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <p className="mt-5 text-center text-xs text-zinc-500">
              Already have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  router.push("/sign-in");
                }}
                className="font-bold text-[#B7F34A] hover:underline"
              >
                Log in
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default RoleModal;
