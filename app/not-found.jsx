import React from 'react'



export default function NotFound() {
  return (
    <main className='bg-base_color poppins mt-10 mb-10 sm:mb-16 '>
      <div className="conatiner-error text-center ">
        <h1 className=' text-[100px] sm:text-[400px] text-white sm:font-[700] mb-0 '>404</h1>
        <p className='sm:text-2xl text-md font-normal text-white leading-loose'>Page not found, please use the Button below to return back to home page <br/> or call +2342018870085</p>
        <button href="/" className="text-white bg-base_color text-xl border-2  px-[30px] sm:px-[90px] py-5 sm:py-[15px] rounded-full cursor-pointer hover:bg-base_text ease-in-out duration-300 mb-20 mt-5" >Click to go Home</button>
      </div>
    </main>
  )
}
