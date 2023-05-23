import { Roboto } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'

const axios = require('axios');
// import { instance } from "./api/api"

interface ResponseProps{
  name : string;
  id: number;
  imageUrl: string;
}

import { createServer } from "miragejs"
import ItemMenu from '@/components/ItemMenu';

createServer({
  routes() {
    this.get("/api/produtos", () => [
      { id: "0", name: "12 Anos", price: 30, imageUrl: "./produtos/12_anos.png"},
      { id: "1", name: "Apple", price: 30, imageUrl: "./produtos/apple.png"},
      { id: "2", name: "Buchanas", price: 30, imageUrl: "./produtos/buchanas.png"},
      { id: "3", name: "Chivas", price: 30, imageUrl: "./produtos/chivas.png"},
      { id: "4", name: "Grenn", price: 30, imageUrl: "./produtos/green.png"},
      { id: "5", name: "Jack", price: 30 , imageUrl: "./produtos/jack.png"},
      { id: "6", name: "Old Par", price: 30 , imageUrl: "./produtos/old_par.png"},
      { id: "7", name: "Royal", price: 30, imageUrl: "./produtos/royal.png" }
    ])
  },
})

const roboto = Roboto({weight:['100','300','400','500','700','900'], subsets:['latin']})

export default function Home() {
  const [produtos, setProdutos] = useState<[ResponseProps] | []>([])
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    axios.get('/api/produtos').then(
      function (response) {
        setProdutos(response.data)
      }
    )
  }, [])

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 gap-5 flex">
        <nav>
          <ul className='px-5 py-4 font-bold text-2xl'>
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
          </ul>
        </nav>
        <main className='flex flex-wrap gap-5 p-5 items-center justify-center'>
            {
              produtos.map(i=> <ItemMenu item={i} />)
            }
        </main>
        <nav>

        </nav>
      </section>
    </>                                                                                                               
  )
}
