'use client'

import Image from "next/image"
export default function ItemCard({data}) {
  
  return (
    
    <div className="w-full flex flex-row md:flex-col items-start md:items-center ">
      <Image width={433} height={230} src={data.imageURL} alt={data.name} className="w-28 h-32 md:h-full md:w-full"/>
      <div className="w-full flex flex-col justify-start px-3 md:px-0 md:py-5 text-black font-normal font-sans">
        <h1 className="text-xl mb-2">{data.name}</h1>
        <h3 className="text-[15px] md:text-base">{data.planet}</h3>
        <div className="hidden md:flex flex-col text-cardGray text-xs uppercase pt-5">
          <p>height - {data.height}</p>
          <p>mass - {data.mass}</p>
          <p>gender - {data.gender}</p>
        </div>
      </div>
    </div>
  )

}