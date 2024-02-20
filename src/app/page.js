'use client'

import { useState } from 'react'

import Filter from './components/Filter'


export default function Home() {

  const [selectedFilter, setSelectedFilter] = useState('')
  
  const options = [
    { value: 'all', label: 'All'},
    { value: '1', label: '1'}
  ]

  const handleFilterChange = (value) => {
    setSelectedFilter(value)
  }

  return (
    <main className="flex min-h-screen flex-col w-full py-20">
     <header className="flex flex-col w-full font-sans font-light mb-7 px-[25px] md:px-[50px]">
      <h1 className="text-3.5xl md:text-5.5xl leading-10 md:leading-[64px] mb-2.5 md:mb-6">Star Wars Characters</h1>
      <p className="text-base md:text-1.5xl leading-6 md:leading-[32px] tracking-[0.92px] max-w-[920px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
     </header>
     <div className="h-14 md:h-[90px] flex justify-between items-center border-t md:border-y border-borderGray w-full px-[25px] md:px-[50px]">
      <Filter options={options} onChange={handleFilterChange} />
      <button className='hidden md:flex items-center uppercase border border-filterGray text-filterGray tracking-[0.8px] font-arial text-sm h-9 px-10'>Clear all</button>
     </div>
     <section>
     </section>
    </main>
  )
}
