import React from 'react'
import { GrBasket } from "react-icons/gr";
import { NavLink } from 'react-router-dom'
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { AiFillHome } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";

function MobileFooter() {
  const { likedProducts } = useSelector((state) => state.userGetFavoriteProducts);
  const active = 'bg-main text-mainText'
  const inActive = 'transitions text-2xl flex-colo hover:bg-subMain hover:text-white rounded-md px-4 py-3'
  const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive
  return (
    <>
      <footer className='lg:hidden text-white fixed z-50 bottom-0 w-full px-1'>
        <div className='bg-subMain rounded-md flex-btn w-full p-1'>
          <NavLink to='/products' className={ Hover }>
            <FaListAlt />
          </NavLink>
          <NavLink to='/favorites' className={ Hover }>
            <div className='relative'>
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-green-500 text-main font-bold absolute -top-5 -right-1">
                { likedProducts?.length > 0 ? likedProducts?.length : 0 }
              </div>
              <GrBasket />
            </div>
          </NavLink>
          <NavLink to='/login' className={ Hover }>
            <AiFillHome />
          </NavLink>
          <NavLink to='/about-us' className={ Hover }>
            <HiOutlineUserGroup />
          </NavLink>
          <NavLink to='/contact-us' className={ Hover }>
            <BiPhoneCall />
          </NavLink>
        </div>
      </footer>
    </>
  )
}

export default MobileFooter
