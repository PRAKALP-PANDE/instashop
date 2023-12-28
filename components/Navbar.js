import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline } from "react-icons/io5";


const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2">
      <div className="logo mx-5">
        <Image width={200} height={40} src="/logo.png" alt="" />
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-2 font-bold md:text-xl'>
          <Link href={'/'}><li>Tshirt</li></Link>
          <Link href={'/'}><li>Tshirt</li></Link>
          <Link href={'/'}><li>Stickers</li></Link>
          <Link href={'/'}><li>Mugs</li></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5">
        <IoCartOutline className='text-xl md:text-3xl'/>
      </div>
    </div>
  )
}

export default Navbar