import React from "react";
import Heart from '../assets/images/heart.svg';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

export default function Wishlist() {     
const count = useSelector((state)  => state.auth.user?.wishList?.length || 0)

    return (
        <Link
            to="/my-wishlists"
            aria-label="My Wishlist"
        >
        <div className="relative w-[33px] h-[33px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200">
            <img src={Heart} alt="" className="w-[23.98px] h-[16.97px]"/>
           { count >=1 && ( <div
                className="absolute top-[2px] left-[15px] bg-[#FFF7ED] text-[#F65F18]  rounded-full w-[16px] h-[16px] pt-[1px] flex items-center justify-center font-roboto font-medium text-[10px]">
                    {count}
            </div>
             )}
        </div>
        </Link>

    )
}