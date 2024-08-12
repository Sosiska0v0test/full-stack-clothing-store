import React from 'react'
import { IoMdPricetags } from "react-icons/io";
import { TbMapDiscount } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import { LuBaggageClaim } from "react-icons/lu";
import { FaTransgenderAlt } from "react-icons/fa";


function FlexProductItems({ product }) {
  return (
    <>
      <div className='flex items-center gap-2'>
        <BiSolidCategory className='text-red-500 w-5 h-5' />
        <span className='text-sm font-medium'>{ product.category }</span>
      </div>
      <div className='flex items-center gap-2'>
        <IoMdPricetags className='text-red-500 w-5 h-5' />
        <span className='text-sm font-medium'>{ product.prise }$</span>
      </div>
      <div className='flex items-center gap-2'>
        <LuBaggageClaim className='text-red-500 w-5 h-5' />
        <span className='text-sm font-medium'>{ product.stock } шт.</span>
      </div>
      <div className='flex items-center gap-2'>
        <TbMapDiscount className='text-red-500 w-5 h-5' />
        <span className='text-sm font-medium'>{ product.size }</span>
      </div>
      <div className='flex items-center gap-2'>
        <FaTransgenderAlt className='text-red-500 w-5 h-5' />
        <span className='text-sm font-medium'>{ product.gender }</span>
      </div>
    </>
  )
}

export default FlexProductItems