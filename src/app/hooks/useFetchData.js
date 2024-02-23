
import { useState, useEffect } from 'react';

const useFetchData = () => {

  const [planetOptions, setPlanetOptions] = useState([{ label: 'All', value: 'All' }])
  const [isLoading, setIsLoading] = useState(false)
  const [people, setPeople] = useState([])
  const [totalPeopleCount, setTotalPeopleCount] = useState(0)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [planetsLoaded, setPlanetsLoaded] = useState(false)
  const [disabledLoadMore, setDisabledLoadMore] = useState(true)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [totalFilteredPeopleCount, setTotalFilteredPeopleCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
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
      console.error('Failed to fetch people:', error)
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
      console.error('Failed to fetch remaining people:', error)
    } finally {
      setIsFetchingMore(false)
    }
  }
  
  return { planetOptions, isLoading, people, disabledLoadMore, filteredPeople, setFilteredPeople, totalFilteredPeopleCount, setTotalFilteredPeopleCount  };
};

export default useFetchData;
