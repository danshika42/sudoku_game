import React from 'react'
import './Home.css'

export default function Home({setLevel,sendGetRequest}) {
  return (
    <div className='Home'>
        <div className='Home-container text-white flex flex-col items-center'>
            <form className=''>
                <label className='text-lg font-medium mr-5'>Choose level  </label>
                <select className='outline-none w-26 px-3 py-2 text-white black bg-gray-500 shadow-md rounded-sm' onChange={(e)=>setLevel(e.target.value)}>
                    <option value='1'>Easy</option>
                    <option value='2'>Medium</option>
                    <option value='3'>Hard</option>
                </select>
            </form>
            <div>
                <button className='bg-blue-600 px-5 py-2 rounded-md mt-5 hover:bg-opacity-60 font-semibold text-lg' onClick={()=>sendGetRequest()}>Play Game</button>
            </div>
        </div>
    </div>
  )
}
