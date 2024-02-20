'use client'

import { useEffect, useState, useRef } from 'react'

export default function FilterSelect({ options, onChange }) {

  const [selectedValue, setSelectedValue] = useState(options[0]?.value)
  const selectRef = useRef()

  useEffect(() => {
    const handleChange = () => {
      const value = selectRef.current.value;
      setSelectedValue(value);
      console.log("Valor selecionado:", value);
    };

    const selectElement = selectRef.current;
    selectElement.addEventListener('change', handleChange);

    return () => {
      selectElement.removeEventListener('change', handleChange);
    };
  }, [])


  return (
    <div className="relative">
      <select ref={selectRef} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
