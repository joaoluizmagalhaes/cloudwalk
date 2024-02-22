'use client'

import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Card from './components/Card'
import Loading from './components/Loading'

export default function Home() {

  const [planetOptions, setPlanetOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [allPeople, setAllPeople] = useState([])
  const [displayCount, setDisplayCount] = useState(8)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [planetsLoaded, setPlanetsLoaded] = useState(false)
  const [totalPeopleCount, setTotalPeopleCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setPlanetOptions(prevData => [...prevData, { label: 'All', value: 'All' }])

    async function fetchPlanets(pageURL) {
      
      const cachedPlanets = localStorage.getItem('planetOptions')
      const cachedPlanetCount = localStorage.getItem('planetCount')

      if (cachedPlanets && cachedPlanetCount && JSON.parse(cachedPlanets).length >= cachedPlanetCount) {
        setPlanetOptions(JSON.parse(cachedPlanets))
        setPlanetsLoaded(true)
        setIsLoading(false)
        return
      }
      
      try {
        const response = await fetch(pageURL)

        if (!response.ok) {
          throw new Error('Falha na rede')
        }

        const data = await response.json()
        localStorage.setItem('planetCount', JSON.stringify(data.count))
        
        const enrichedData = data.results.map(element => ({
          value: element.name,
          label: element.name,
          url: element.url
        }))

        setPlanetOptions(prevData => {
          const updatedData = [...prevData, ...enrichedData]
          localStorage.setItem('planetOptions', JSON.stringify(updatedData))
          return updatedData
        })

        if (data.next) {
          await fetchPlanets(data.next)
        } else {
          setPlanetsLoaded(true)
          setIsLoading(false)
        }

      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setIsLoading(false)
      }
    }

    fetchPlanets(`${window.location.origin}/api?endpoint=planets`)
  }, [])

  useEffect(() => {
    if (planetsLoaded) {
      fetchPeople()
    }
  }, [planetOptions, planetsLoaded, currentPage])

  async function fetchPeople() {
    if (allPeople.length <= totalPeopleCount || currentPage === 1) {

      setIsLoading(true)

      try {
        const response = await fetch(`${window.location.origin}/api/?endpoint=people&page=${currentPage}`)

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response)
        }

        const data = await response.json()
        if (currentPage === 1) {
          setTotalPeopleCount(data.count)
        }

        const planetMap = planetOptions.reduce((acc, planet) => {
          acc[planet.url] = planet.label
          return acc
        }, {})

        const newPeople = data.results.map(person => {
          const random = Math.floor(Math.random() * 100)
          return {
            ...person,
            homeworld: planetMap[person.homeworld] || 'Unknown Planet',
            imageURL: `https://picsum.photos/435/230?random=${random}`
          }
        })

        setAllPeople(prev => [...prev, ...newPeople])

      } catch (error) {
        console.error("Failed to fetch people:", error)
      } finally {
        setIsLoading(false)
      }

    }
  }

  const handleLoadMore = () => {

    const newDisplayCount = displayCount + 8 <= totalPeopleCount ? displayCount + 8 : totalPeopleCount

    if (newDisplayCount <= totalPeopleCount) {
      setDisplayCount(newDisplayCount)
      if (newDisplayCount >= allPeople.length) {
        setCurrentPage(prev => prev + 1)
      }
    }

  }

  const handleFilterChange = (value) => {
    setSelectedFilter(value)
  }

  return (
    <main className="flex min-h-screen flex-col w-full py-20 relative">
      {isLoading && <Loading />}
      <header className="flex flex-col w-full font-sans font-light mb-7 px-[25px] md:px-[50px]">
        <h1 className="text-3.5xl md:text-5.5xl leading-10 md:leading-[64px] mb-2.5 md:mb-6">Star Wars Characters</h1>
        <p className="text-base md:text-1.5xl leading-6 md:leading-[32px] tracking-[0.92px] max-w-[920px]">
          Explore the universe of Star Wars characters.
        </p>
      </header>
      <div className="h-14 md:h-[90px] flex justify-between items-center border-t md:border-y border-borderGray w-full px-[25px] md:px-[50px]">
        <Filter options={planetOptions} onChange={handleFilterChange} />
        <button className='hidden md:flex items-center uppercase border border-filterGray text-filterGray tracking-[0.8px] font-arial text-sm h-9 px-10'>Clear all</button>
      </div>
      <section className="p-[25px] md:p-[50px]">
        <h1 className='capitalize font-sans text-darkGray font-light text-3.5xl md:text-3.75xl'>{selectedFilter} Characters</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 w-full gap-y-11 md:gap-8 md:gap-y-28 my-8 mb-11 md:mb-28'>
          {allPeople.slice(0, displayCount).map((person, index) => (
            <Card key={index} data={person} />
          ))}
        </div>
        {displayCount < totalPeopleCount && (
          <div className='flex justify-center'>
            <button onClick={handleLoadMore} className='w-48 md:w-[486px] font-arial border border-textBlue text-textBlue text-sm uppercase h-11'>
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
