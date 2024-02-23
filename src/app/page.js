'use client'

import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Card from './components/Card'
import Loading from './components/Loading'

export default function Home() {

  const [selectedFilter, setSelectedFilter] = useState('All')
  const [planetOptions, setPlanetOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [people, setPeople] = useState([])
  const [displayCount, setDisplayCount] = useState(8)
  const [totalPeopleCount, setTotalPeopleCount] = useState(0)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [planetsLoaded, setPlanetsLoaded] = useState(false)
  const [disabledLoadMore, setDisabledLoadMore] = useState(true)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [disabledClearBtn, setDisabledClearBtn] = useState(true)
  const [totalFilteredPeopleCount, setTotalFilteredPeopleCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setPlanetOptions(prevData => {
      if(!prevData.includes({ label: 'All', value: 'All' })){
        return [...prevData, { label: 'All', value: 'All' }]
      }}) 
    fetchPlanets(`${window.location.origin}/api?endpoint=planets`)
    
  }, [])

  useEffect(() => {
    if (planetsLoaded) {
      fetchPeople(`${window.location.origin}/api?endpoint=people&page=1`)
    }
  }, [planetOptions, planetsLoaded])

  useEffect(() => {
    if (people.length > 0 && people.length < totalPeopleCount && !isFetchingMore) {
      fetchRemainingPeople()
    }
  }, [people, totalPeopleCount])

  async function fetchPlanets(url) {
    
    const cachedPlanets = localStorage.getItem('planetOptions')
    const cachedPlanetCount = localStorage.getItem('planetCount')

    if (cachedPlanets && cachedPlanetCount && JSON.parse(cachedPlanets).length >= cachedPlanetCount) {
      setPlanetOptions(JSON.parse(cachedPlanets))
      setPlanetsLoaded(true)
      return
    }
    
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Falha na rede')
      }

      const data = await response.json()
      localStorage.setItem('planetCount', JSON.stringify(data.count))
      
      const enrichedData = data.results.map(element => ({
        value: element.residents,
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
      }

    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      setIsLoading(false)
    }
  }

  async function fetchPeople(url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      
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


      setTotalPeopleCount(data.count)
      setPeople(prev => [...prev, ...newPeople])
      setFilteredPeople(people)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch people:", error)
      setIsLoading(false)
    }
  }

  async function fetchRemainingPeople(page = 2) {
    setIsFetchingMore(true)
    try {
      while (people.length < totalPeopleCount) {
        const response = await fetch(`${window.location.origin}/api?endpoint=people&page=${page}`)
        const data = await response.json()
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

        setPeople(prev => [...prev, ...newPeople])
        setTotalFilteredPeopleCount(people.length)
        setFilteredPeople(people)
        if (!data.next) {
          setDisabledLoadMore(false)
          break
        }
        page += 1
      }
    } catch (error) {
      console.error("Failed to fetch remaining people:", error)
    } finally {
      setIsFetchingMore(false)
    }
  }

  const handleLoadMore = () => {

    let newDisplayCount = displayCount + 8

    if (newDisplayCount > people.length) {
      newDisplayCount = people.length
    }

    setDisplayCount(newDisplayCount)
  }

  const clearFilter = () => {
    setFilteredPeople(people)
    setSelectedFilter('All')
    setDisabledClearBtn(true)
    setDisplayCount(8)
    setTotalFilteredPeopleCount(filteredPeople.length)
  }

  const handleFilterChange = (selected) => {
    setSelectedFilter(selected.label)

    const filtered = selected.label === 'All' 
      ? people
      : people.filter(person => selected.value.includes(person.url))

    setDisabledClearBtn(false)
    setFilteredPeople(filtered) 
    setDisplayCount(Math.min(filtered.length, 8))
    setTotalFilteredPeopleCount(filtered.length)
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
        <button disabled={disabledClearBtn} className='hidden md:flex items-center uppercase border border-textBlue text-textBlue disabled:border-filterGray disabled:text-filterGray tracking-[0.8px] font-arial text-sm h-9 px-10' onClick={clearFilter}>Clear all</button>
      </div>
      <section className="p-[25px] md:p-[50px]">
        <h1 className='capitalize font-sans text-darkGray font-light text-3.5xl md:text-3.75xl'>{selectedFilter} Characters</h1>
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
              className={`disabled:opacity-50 w-48 md:w-[486px] font-arial border border-textBlue text-textBlue text-sm uppercase h-11 ${disabledLoadMore ? 'additional-disabled-class' : ''}`}
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
