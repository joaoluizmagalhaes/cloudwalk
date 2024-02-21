'use client'

import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import Card from './components/Card'


export default function Home() {

  const options = [
    { value: 'all', label: 'All'},
    { value: 'tatooine', label: 'Tatooine'}
  ]

  const [cardData, setCardData] = useState([]) 

  useEffect(() => {
    fetch('http://localhost:3000/api?endpoint=people')
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Falha na rede');
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then(data => {
        const enrichedData = data.results.map(element => {
          // Gera um número aleatório para cada elemento apenas uma vez
          const random = Math.floor(Math.random() * 100);
          return {
            ...element,
            imageURL: `https://picsum.photos/435/230?random=${random}`
          };
        });
        
        setCardData(enrichedData)
        console.log('Dados recebidos:', data); // Logs the fetched data
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, [])
  

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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-y-11 md:gap-8 md:gap-y-28 my-8 mb-11 md:mb-28'>
        {cardData.map( data => {
          return (
            <Card data={data} key={data.name}/>
          )
        })}
      </div>
      <div className='flex justify-center'>
        <button className='w-48 md:w-[486px] font-arial border border-textBlue text-textBlue text-sm uppercase h-11'>Load More</button>
      </div>
     </section>
    </main>
  )
}
