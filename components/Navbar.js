import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline } from "react-icons/io5";


const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-xl">
      <div className="logo mx-5">
        <Link href={'/'}><Image width={200} height={40} src="/logo.png" alt="" /></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/tshirt'}><li>Tshirt</li></Link>
          <Link href={'/hoodies'}><li>Hoodies</li></Link>
          <Link href={'/stickers'}><li>Stickers</li></Link>
          <Link href={'/mugs'}><li>Mugs</li></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5">
        <IoCartOutline className='text-xl md:test-2xl' />
      </div>
    </div>
  )
}

export default Navbar