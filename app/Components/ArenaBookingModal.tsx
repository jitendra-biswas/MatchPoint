"use client";

import { useState, useEffect } from "react";
import { IoCloseOutline, IoLocationOutline } from "react-icons/io5";
import { BsCalendar3, BsClock, BsCheckCircleFill } from "react-icons/bs";
import { LuArrowRight, LuMinus, LuPlus } from "react-icons/lu";
import type { FutsalArena } from "./FeaturedFootsalArena";

interface ArenaBookingModalProps {
  arena: FutsalArena;
  onClose: () => void;
}

const timeSlots = [
  { time: "06:00 AM", available: true },
  { time: "07:00 AM", available: true },
  { time: "08:00 AM", available: false },
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "04:00 PM", available: true },
  { time: "05:00 PM", available: true },
  { time: "06:00 PM", available: true },
  { time: "07:00 PM", available: true },
  { time: "08:00 PM", available: false },
  { time: "09:00 PM", available: true },
];

const ArenaBookingModal = ({ arena, onClose }: ArenaBookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState(1);
  const [duration, setDuration] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  });

  const price = arena.startingPrice * duration;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#111820] shadow-2xl"
      >
        {/* Header */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={arena.image}
            alt={arena.name}
            className="h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#111820] via-black/20 to-black/20" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-[#B7F34A] hover:text-black transition cursor-pointer"
          >
            <IoCloseOutline size={23} />
          </button>

          <div className="absolute bottom-5 left-6">
            <span className="mb-2 inline-block rounded-md bg-[#B7F34A] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[#111820]">
              Book your game
            </span>

            <h2 className="text-2xl font-extrabold text-white">{arena.name}</h2>

            <p className="mt-1 flex items-center gap-1 text-xs text-zinc-300">
              <IoLocationOutline size={15} />
              {arena.address}
            </p>
          </div>
        </div>

        {isBooked ? (
          <div className="p-10 text-center flex flex-col items-center gap-4">
            <BsCheckCircleFill className="text-5xl text-[#B7F34A]" />
            <h2 className="text-2xl font-extrabold text-white">Booking Confirmed!</h2>
            <p className="text-sm text-zinc-300 max-w-md">
              Your slot at <span className="text-white font-bold">{arena.name}</span> on{" "}
              <span className="text-[#B7F34A] font-bold">{dates[selectedDate].date} {dates[selectedDate].month}</span> at{" "}
              <span className="text-[#B7F34A] font-bold">{selectedTime}</span> (Court {selectedCourt}, {duration} hour{duration > 1 ? "s" : ""}) has been reserved.
            </p>
            <p className="text-xs text-zinc-500">
              Total Amount: NPR {price.toLocaleString("en-NP")} • Payment on arrival or eSewa/Khalti
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-2.5 rounded-lg bg-[#B7F34A] text-xs font-black text-[#111820] hover:bg-[#c9ff65] transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="grid gap-7 p-6 md:grid-cols-[1fr_230px]">
          {/* Booking selections */}
          <div className="space-y-7">
            {/* Date selection */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-white">
                  <BsCalendar3 className="text-[#B7F34A]" />
                  Select Date
                </h3>
                <span className="text-xs text-zinc-500">Next 7 days</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(index);
                      setSelectedTime(null);
                    }}
                    className={`flex flex-col items-center gap-2 rounded-xl border py-3 transition ${
                      selectedDate === index
                        ? "border-[#B7F34A] bg-[#B7F34A] text-[#111820]"
                        : "border-white/10 bg-[#18212B] text-zinc-400 hover:border-white/30"
                    }`}
                  >
                    <span className="text-[10px] font-semibold">
                      {date.day}
                    </span>
                    <span className="text-lg font-black">{date.date}</span>
                    <span className="text-[10px]">{date.month}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Court selection */}
            <section>
              <h3 className="mb-3 font-bold text-white">Select Court</h3>

              <div className="flex flex-wrap gap-2">
                {Array.from(
                  { length: arena.availableCourts },
                  (_, index) => index + 1,
                ).map((court) => (
                  <button
                    key={court}
                    onClick={() => setSelectedCourt(court)}
                    className={`rounded-lg border px-4 py-2 text-xs font-bold transition ${
                      selectedCourt === court
                        ? "border-[#B7F34A] bg-[#B7F34A]/10 text-[#B7F34A]"
                        : "border-white/10 bg-[#18212B] text-zinc-400 hover:border-white/30"
                    }`}
                  >
                    Court {court}
                    {selectedCourt === court && (
                      <BsCheckCircleFill className="ml-2 inline" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Time slots */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-white">
                  <BsClock className="text-[#B7F34A]" />
                  Available Time Slots
                </h3>
                <span className="text-[10px] text-zinc-500">
                  1 hour per slot
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {timeSlots.map((slot: { time: string; available: boolean }) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`rounded-lg border py-3 text-xs font-semibold transition ${
                      !slot.available
                        ? "cursor-not-allowed border-white/5 bg-white/2 text-zinc-700 line-through"
                        : selectedTime === slot.time
                          ? "border-[#B7F34A] bg-[#B7F34A] text-[#111820]"
                          : "border-white/10 bg-[#18212B] text-zinc-400 hover:border-[#B7F34A] hover:text-[#B7F34A]"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </section>

            {/* Duration */}
            <section>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">Playing Duration</h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    Select how long you want to play
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#18212B] p-2">
                  <button
                    disabled={duration <= 1}
                    onClick={() => setDuration((d) => Math.max(1, d - 1))}
                    className="text-zinc-400 disabled:opacity-30"
                  >
                    <LuMinus />
                  </button>

                  <span className="min-w-12 text-center text-sm font-bold text-white">
                    {duration} hr
                  </span>

                  <button
                    onClick={() => setDuration((d) => Math.min(4, d + 1))}
                    className="text-[#B7F34A]"
                  >
                    <LuPlus />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Booking summary */}
          <aside className="h-fit rounded-xl border border-white/10 bg-[#18212B] p-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Booking Summary
            </span>

            <h3 className="mt-3 text-lg font-extrabold text-white">
              {arena.name}
            </h3>

            <div className="my-5 space-y-4 border-y border-white/10 py-5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Date</span>
                <span className="text-white">
                  {dates[selectedDate].date} {dates[selectedDate].month}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Time</span>
                <span className="text-white">
                  {selectedTime || "Not selected"}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Court</span>
                <span className="text-white">Court {selectedCourt}</span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Duration</span>
                <span className="text-white">{duration} hour(s)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Total Amount</span>
              <span className="text-xl font-black text-[#B7F34A]">
                NPR {price.toLocaleString("en-NP")}
              </span>
            </div>

            <p className="mt-2 text-[10px] text-zinc-500">
              Based on the starting hourly rate.
            </p>

            <button
              disabled={!selectedTime}
              onClick={() => {
                setIsBooked(true);
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#B7F34A] py-3 text-xs font-black text-[#111820] transition hover:bg-[#c9ff65] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              Continue Booking
              <LuArrowRight size={16} />
            </button>

            <p className="mt-3 text-center text-[10px] text-zinc-500">
              No payment is made at this step
            </p>
          </aside>
        </div>
        )}
      </div>
    </div>
  );
};

export default ArenaBookingModal;
