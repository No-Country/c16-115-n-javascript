import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <div className='flex justify-between items-center w-[100%] h-[5rem] bg-white rounded-full pl-[3rem] px-[1rem] '>
        <input className='w-[100%] focus:border-none'>
        </input>
        <button className='w-[3rem] h-[3rem] flex items-center justify-center text-white rounded-full bg-[#18A0FB] '>
        <FaSearch />
        </button>
    </div>
  )
}

export default SearchInput