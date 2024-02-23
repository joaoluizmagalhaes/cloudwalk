import { useState, Fragment, useEffect } from 'react'
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

export default function FilterSelect({ options, onChange, selectedFilter }) {
  
  const findInitialItem = () => {
    if (selectedFilter) {
      return options.find(option => option.label === selectedFilter) || options[0]
    }
    return options[0]
  }

  const [selectedItem, setSelectedItem] = useState(findInitialItem())
  const [query, setQuery] = useState('')

  useEffect(() => {
    setSelectedItem(findInitialItem())
  }, [selectedFilter, options])

  const handleChange = (selected) => {
    setSelectedItem(selected)
    onChange(selected)
  }

  const filteredOptions = query === '' ? options : options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (!filteredOptions.includes(selectedItem)) {
      setSelectedItem(filteredOptions[0] || null)
    }
  }, [filteredOptions, selectedItem])

  return (
    <div className="text-base font-sans font-normal leading-[19.09px] text-labelGray flex w-full md:w-72 items-center">
      <p className="flex min-w-[70px]">Filter By:</p>
      <Combobox value={selectedItem} onChange={handleChange}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden bg-white text-left border-0 border-b text-textBlue border-b-filterGray sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-textBlue focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option) => option ? option.label : ''}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-textBlue" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-textBlue">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.label}
                    value={option}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-textBlue text-white' : 'text-textBlue'
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {option.label}
                        </span>
                        {selected && (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-textBlue'}`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
