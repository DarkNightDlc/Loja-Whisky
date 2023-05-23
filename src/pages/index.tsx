import { Roboto } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import ItemMenu from '@/components/ItemMenu';
import { CartContext, ItemProps } from '@/hook/cart';
const axios = require('axios');

const roboto = Roboto({weight:['100','300','400','500','700','900'], subsets:['latin']})

// createServer({
//   routes() {
//     this.get("/api/produtos", () => [
//       { id: "0", nationality:"americano", price: 30, name: "Bulleit Bourbon",   imageUrl: "./produtos/americanos/bulleit_bourbon.png"},
//       { id: "1", nationality:"americano", price: 30, name: "Jack Daniels",      imageUrl: "./produtos/americanos/jack_daniels.png"},
//       { id: "2", nationality:"americano", price: 30, name: "Jim Beam",          imageUrl: "./produtos/americanos/jim_beam.png"},
//       { id: "3", nationality:"americano", price: 30, name: "Woodford_Reserve",  imageUrl: "./produtos/americanos/woodford_reserve.png"},
//       { id: "4", nationality:"americano", price: 30, name: "Wild Turkey",       imageUrl: "./produtos/americanos/wild_turkey.png"},
//       { id: "5", nationality:"escoces", price: 30, name: "Old Porr",       imageUrl: "./produtos/escoces/old_porr.png"},
//     ])
//   },
// })

interface ResponseProps{
  name : string;
  id: number;
  imageUrl: string;
}

export default function Home() {
  const {produtos, searchForProducts} = useContext(CartContext);

  const [produtosExibidos, setProdutosExibidos] = useState<[ItemProps] | []>(produtos)

  function handleResetProdutosExibidos(){
    setProdutosExibidos(produtos)
  }

  function handleNationalityFilter(nationality:string){
    let newProdutosArray = produtos
    setProdutosExibidos(newProdutosArray.filter(item=> item.nationality === nationality))
  }
  

  useEffect(() => {
    searchForProducts()
  }, [])

  useEffect(() => {
    setProdutosExibidos(produtos)
  }, [produtos])

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 gap-5 flex">
        <nav className=' h-full flex justify-center'>
          <ul className='px-5 py-4 font-bold text-2xl flex flex-col'>
            <li><button onClick={()=>handleResetProdutosExibidos()}>Todos</button></li>
            <li><button onClick={()=>handleNationalityFilter("escoces")}>Escoces</button></li>
            <li><button onClick={()=>handleNationalityFilter("americano")}>Americano</button></li>
            <li><button onClick={()=>handleNationalityFilter("indiano")}>Indiano</button></li>
            <li><button onClick={()=>handleNationalityFilter("irlandes")}>Irlandes</button></li>
            <li><button onClick={()=>handleNationalityFilter("japones")}>Japones</button></li>
          </ul>
        </nav>
        <main className='flex flex-wrap gap-5 p-5 items-center justify-center'>
            {
              produtosExibidos.map(i=> <ItemMenu item={i} />)
            }
        </main>
        <nav>

        </nav>
      </section>
    </>                                                                                                               
  )
}
