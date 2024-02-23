'use client'

import React, { useEffect, useState } from 'react'
import useFetchData from './hooks/useFetchData'
import Filter from './components/Filter'
import Card from './components/Card'
import Loading from './components/Loading'

export default function Home() {

  const [selectedFilter, setSelectedFilter] = useState('All')
  const [displayCount, setDisplayCount] = useState(8)
  const [disabledClearBtn, setDisabledClearBtn] = useState(true)

  const { 
    planetOptions, 
    isLoading, 
    people, 
    disabledLoadMore, 
    filteredPeople, 
    setFilteredPeople, 
    totalFilteredPeopleCount, 
    setTotalFilteredPeopleCount
  } = useFetchData()

  const handleLoadMore = () => {

    let newDisplayCount = displayCount + 8

    if (newDisplayCount > filteredPeople.length) {
      newDisplayCount = filteredPeople.length
    }

    setDisplayCount(newDisplayCount)
  }

const clearFilter = () => {
  setSelectedFilter('All')
  setFilteredPeople(people)
  setDisabledClearBtn(true)
  setDisplayCount(8)
  setTotalFilteredPeopleCount(people.length)
}

  const handleFilterChange = (selected) => {
    setSelectedFilter(selected.label)

    const filtered = selected.label === 'All' 
      ? people
      : people.filter(person => selected.value.includes(person.url))

    selected.label === 'All' ? setDisabledClearBtn(true) : setDisabledClearBtn(false)
    setFilteredPeople(filtered) 
    setDisplayCount(Math.min(filtered.length, 8))
    setTotalFilteredPeopleCount(filtered.length)
  }

  return (
    <main className='flex min-h-screen flex-col w-full py-20 relative'>
      {isLoading && <Loading />}
      <header className='flex flex-col w-full font-sans font-light '>
        <div className='px-[25px] md:px-[50px] mb-7'>
          <h1 className='text-3.5xl md:text-5.5xl leading-10 md:leading-[64px] mb-2.5 md:mb-6'>Star Wars Characters</h1>
          <p className='text-base md:text-1.5xl leading-6 md:leading-[32px] tracking-[0.92px] max-w-[920px]'>
            Explore the universe of Star Wars characters.
          </p>
        </div>
        <div className='h-14 md:h-[90px] flex justify-between items-center border-t md:border-y border-borderGray w-full px-[25px] md:px-[50px]'>
          <Filter 
            options={planetOptions} 
            onChange={handleFilterChange} 
            selectedFilter={selectedFilter}
          />
          <button disabled={disabledClearBtn} className='hidden hover:text-white hover:bg-textBlue transition-all duration-300 ease-in-out md:flex items-center uppercase border border-textBlue text-textBlue disabled:border-filterGray disabled:text-filterGray tracking-[0.8px] font-arial text-sm h-9 px-10 disabled:pointer-events-none disabled:cursor-default' onClick={clearFilter}>Clear all</button>
        </div>
      </header>
     
      <section className='p-[25px] md:p-[50px]'>
        <h1 className={`${filteredPeople.length > 0 ? 'capitalize' : ''} font-sans text-darkGray font-light text-3.5xl md:text-3.75xl`}>
          {filteredPeople.length > 0 ? (
            `${selectedFilter} Characters`
          ) : (
            `There is no characters for ${selectedFilter}.`
          )}
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-4 w-full gap-y-11 md:gap-8 md:gap-y-28 my-8 mb-11 md:mb-28'>
          {filteredPeople.slice(0, displayCount).map((person, index) => (
            <Card key={index} data={person} />
          ))}
        </div>
        {displayCount < totalFilteredPeopleCount && (
          <div className='flex justify-center'>
            <button 
              onClick={handleLoadMore} 
              disabled={disabledLoadMore} 
              className={`disabled:opacity-50 w-48 md:w-[486px] font-arial border hover:text-white hover:bg-textBlue border-textBlue text-textBlue text-sm uppercase h-11 transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:cursor-default ${disabledLoadMore ? 'additional-disabled-class' : ''}`}
            >
              {disabledLoadMore ? (
                <span className='btn-loader'></span>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
