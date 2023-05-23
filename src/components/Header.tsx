import Link from "next/link";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

export function Header(){
    return (
        <header className="flex w-full max-w-[1440px] items-center justify-between mx-auto p-10">
          <a href="/">
            <img src="https://cdn.pixabay.com/photo/2023/04/27/16/30/lines-7954992_1280.jpg" className='w-12 h-12 rounded-full'/>
          </a>
        <label className='bg-white h-10 max-w-[600px] w-full flex items-center rounded-md'>
          <input type="text" className="border-none h-full w-full min-w-[200px] bg-transparent"/>
          <AiOutlineSearch className='h-10 w-10 px-1 text-teal-700'/>
        </label>
        <Link href="/cart">
          <button className="">
            <AiOutlineShoppingCart className='w-10 h-10'/>
          </button>
        </Link>
      </header>
    )
}