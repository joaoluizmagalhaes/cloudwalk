'use client'

import { useState } from 'react'

import Filter from './components/Filter'
import Card from './components/Card'


export default function Home() {

  const options = [
    { value: 'all', label: 'All'},
    { value: 'tatooine', label: 'Tatooine'}
  ]

  const cardData = [
    {
      name: 'Luke Skywalker',
      planet: 'Tatooine',
      height: '172',
      mass: '77',
      gender: 'Male'
    },
    {
      name: 'C-3PO',
      planet: 'Tatooine',
      height: '167',
      mass: '75',
      gender: 'n/a'
    },
    {
      name: 'R2-D2',
      planet: 'Naboo',
      height: '96',
      mass: '32',
      gender: 'N/a'
    },
    {
      name: 'Darth Vader',
      planet: 'Tatooine',
      height: '202',
      mass: '136',
      gender: 'Male'
    }
  ]

  const [selectedFilter, setSelectedFilter] = useState(options[0].value)
  
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
     <section className="p-[25px] md:p-[50px]">
      <h1 className='capitalize font-sans text-darkGray font-light text-3.5xl md:text-3.75xl'>{selectedFilter} Characters</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-y-11 md:gap-8 md:gap-y-28 my-8'>
        {cardData.map( data => {
          return (
            <Card data={data} />
          )
        })}
      </div>
     </section>
    </main>
  )
}
