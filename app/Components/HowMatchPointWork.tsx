import React from 'react'
import { AiOutlineTrophy } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineElectricBolt } from 'react-icons/md'


const HowMatchPointWork = () => {
    const cardData = [
  {
    "id": 1,
    "number": "01",
    "icon": <FiSearch className='text-[#B7F34A] text-2xl' />,
    "title": "Discover & Check Availability",
    "description": "Search premier futsal courts across Kathmandu valley or Pokhara. See live real-time slot calendar without calling the venue."
  },
  {
    "id": 2,
    "number": "02",
    "icon": <MdOutlineElectricBolt className='text-[#B7F34A] text-2xl'/>,
    "title": "Instant Reserve & Fee Split",
    "description": "Lock in your slot instantly. Split the match fee easily among your team mates with automated per-player payment tracking."
  },
  {
    "id": 3,
    "number": "03",
    "icon": <AiOutlineTrophy className='text-[#B7F34A] text-2xl'/>,
    "title": "Show Up & Kick Off",
    "description": "Arrive at the pitch. The court is exclusively reserved for you with zero double booking surprises. Focus on winning."
  }
]

  return (
    <div id="howItWorks" className='w-full h-[80vh] max-md:h-fit pb-10 bg-[#111820] border border-gray-800 flex flex-col items-center pt-24'>
      <h2 className='text-sm font-bold text-[#B7F34A]'>Seamless 3-Step Process</h2>
      <h1 className='text-3xl font-extrabold text-zinc-100 max-md:text-xl'>How MatchPoint Works</h1>
      <p className='text-sm text-zinc-400 text-center'>From finding an empty slot to high-five post-match celebrations.</p>

      <div className="steps flex max-md:flex-col gap-10 mt-10">
        

        {cardData.map((detail)=>{
            return <div key={detail.id} className="card w-96 max-md:w-90 h-62 border border-gray-800 hover:border-[#53790b] rounded-2xl bg-[#161F29] p-7 transition-all flex flex-col gap-3">
            <h1 className='text-4xl font-extrabold text-gray-700'>{detail.number}</h1>
            <div className="icon w-12 h-12 border bg-[#1D2935] border-gray-700 rounded-xl flex items-center justify-center">
              {detail.icon}
            </div>
            <h1 className='font-bold text-zinc-100'>{detail.title}</h1>
            <p className='text-xs max-md:text-sm text-zinc-400 -mt-2'>{detail.description}</p>
        </div>
        })}
       
      </div>
    </div>
  )
}

export default HowMatchPointWork
