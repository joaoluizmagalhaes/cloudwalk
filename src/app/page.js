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
    console.log("Filtro selecionado:", value)
  }

  return (
    <main className="flex min-h-screen flex-col w-full py-20">
     <header className="flex flex-col w-full font-sans font-light mb-7 px-[25px] md:px-[50px]">
      <h1 className="text-3.5xl md:text-5.5xl leading-10 md:leading-[64px] mb-2.5 md:mb-6">Star Wars Characters</h1>
      <p className="text-base md:text-1.5xl leading-6 md:leading-[32px] tracking-[0.92px] max-w-[920px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
     </header>
     <div className="h-[90px] border-t md:border-y border-customGray w-full px-[25px] md:px-[50px]">
      <Filter options={options} onChange={handleFilterChange} />
     </div>
     <section>
     </section>
    </main>
  )
}
