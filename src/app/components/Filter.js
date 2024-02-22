'use client'

import { useEffect, useRef } from 'react'

export default function FilterSelect({ options, onChange }) {

  const selectRef = useRef(null)

  useEffect(() => {
    const handleChange = () => {
      if (selectRef.current) {
        const selectedValue = selectRef.current.value
        const selectedOption = options.find(el => el.label === selectedValue)
        onChange(selectedOption)
      }
    }

    const selectEl = selectRef.current
    selectEl.addEventListener('change', handleChange)

    return () => {
      selectEl.removeEventListener('change', handleChange)
    }
  }, [onChange])

  return (
    <div className="text-base font-sans font-normal leading-[19.09px] text-labelGray flex w-full md:w-72 items-center">
      <p className="flex min-w-[70px]">Filter By:</p>
      <select name="filterPlanet" ref={selectRef} className="flex border-0 border-b text-textBlue border-b-filterGray w-full md:w-48 ml-3 py-2 md:py-3 ">
        {options.map(option => (
          <option key={option.label} value={option.label}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
