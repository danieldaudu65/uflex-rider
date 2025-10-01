import React from 'react'
import { CiSearch } from 'react-icons/ci'

const Search:React.FC = () => {
    return (
        <div className='flex border w-fulla rounded-lg border-gray-300  items-center'>
            <CiSearch className='text-gray-500 text-2xl ml-2' />
            <input type="text" className=' w-full placeholder:text-gray-400 ml-1 py-1' placeholder='Search ' />
        </div>)
}

export default Search