import React from "react";
import { GoArrowRight } from "react-icons/go";

const ReviewSectionLandingPage = () => {
  const reviewData = [
    {
      id: 1,
      review:
        "MatchPoint made organizing our Friday night matches so simple. Splitting payment per player directly stopped me from chasing cash from 10 guys.",
      name: "Siddhartha Shakya",
      role: "Team Captain, Himalayan Strikers",
      location: "Patan, Lalitpur",
    },
    {
      id: 2,
      review:
        "Before MatchPoint, we had two double-booking arguments every weekend. Now our courts are locked online with real-time confirmation. Revenue is up 25%.",
      name: "Bikash Adhikari",
      role: "Futsal Arena Manager",
      location: "Field Futsal Sanepa",
    },
    {
      id: 3,
      review:
        "I just moved to Kathmandu and did not have a team. Used the public match pool and joined a 5v5 game at Dhuku Futsal within two hours. Fantastic experience!",
      name: "Prashant Joshi",
      role: "Casual Futsal Player",
      location: "Kathmandu",
    },
  ];

  return (
    <div className="w-full h-fit bg-[#111820] flex flex-col items-center pt-24 border-t border-t-gray-700">
      <h2 className="text-sm font-bold text-[#B7F34A] uppercase">
        Trusted by the community
      </h2>
      <h1 className="text-3xl font-extrabold text-zinc-100 max-md:text-xl">
        Loved by Players & Venue Managers
      </h1>

      <div className="reviews flex max-md:flex-col gap-6 mt-14 px-5 pb-20">
        {reviewData.map((item) => {
          return (
            <div
              key={item.id}
              className="card w-96 max-md:w-full border border-gray-800 rounded-2xl bg-[#161F29] p-7 flex flex-col justify-between gap-6"
            >
              <p className="text-zinc-200 italic text-sm">&ldquo;{item.review}&rdquo;</p>

              <div className="border-t border-gray-800 pt-5">
                <h1 className="font-bold text-zinc-100">{item.name}</h1>
                <p className="text-sm text-[#B7F34A]">{item.role}</p>
                <p className="text-xs text-gray-500 mt-3">{item.location}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full h-fit border-t border-t-gray-700 flex flex-col items-center gap-5 py-20 border-b border-b-gray-700">
        <h1 className="text-4xl max-md:text-3xl text-center font-extrabold text-zinc-100">
          Ready to Kick Off Your Next Match?
        </h1>
        <p className="text-zinc-400 text-center w-[40vw] max-md:w-[90vw]">
          Join thousands of futsal enthusiasts in Nepal. Discover available
          grounds, book in seconds, and play with your squad.
        </p>
        <div className="w-fit bg-[#B7F34A] text-zinc-900 font-semibold px-7 py-3 max-md:px-3 max-md:py-1 max-md:rounded-md flex items-center gap-2 rounded-xl cursor-pointer hover:scale-105 transition-all hover:shadow-2xl border-0  shadow-[#73a419]">
          Explore Futsal Grounds Now <GoArrowRight />
        </div>
      </div>
    </div>
  );
};

export default ReviewSectionLandingPage;
