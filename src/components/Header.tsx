import { CartContext } from "@/hook/cart";
import { useContext } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import CartElement from "./CartElement";


export function Header(){

    return (
        <header className="flex w-full max-w-[1440px] items-center justify-between mx-auto p-10">
          
            <img src="./icon.png" className='w-12 h-12 rounded-full'/>
          
        <label className='bg-white h-10 max-w-[600px] w-full flex items-center rounded-md'>
          <input type="text" className="border-none h-full w-full min-w-[200px] bg-transparent"/>
          <AiOutlineSearch className='h-10 w-10 px-1 text-teal-700'/>
        </label>
        <CartElement/>
      </header>
    )
}