import { CartContext } from "@/hook/cart";
import { useContext } from "react";

export default function MenuPrice({produtoExibidos}){

  const {produtos} = useContext(CartContext);
    

    function handlePriceFilter(priceOne: number, priceTwo: number){
        let newProdutosArray = produtos
        produtoExibidos(newProdutosArray.filter(item=> item.price >= priceOne && item.price <= priceTwo))
      }

    return (
        <ul className="w-28 px-3 py-4 font-bold text-lg flex flex-col gap-4">
            <li className="border-b-2 border-slate-600 text-center"><button onClick={()=>produtoExibidos(produtos)  }>Todos</button></li>
            <li className="border-b-2 border-slate-600 text-center"><button onClick={()=>handlePriceFilter(0,100)  }>R$30,00  a R$100,00</button></li>
            <li className="border-b-2 border-slate-600 text-center"><button onClick={()=>handlePriceFilter(100,200)}>R$100,00 a R$200,00</button></li>
            <li className="border-b-2 border-slate-600 text-center"><button onClick={()=>handlePriceFilter(200,300)}>R$200,00 a R$300,00</button></li>
            <li className="border-b-2 border-slate-600 text-center"><button onClick={()=>handlePriceFilter(300,400)}>R$300,00 a R$400,00</button></li>
            <li className="border-b-2 border-slate-600 text-center"><button onClick={()=>handlePriceFilter(400,500)}>R$400,00 a R$500,00</button></li>
        </ul>
    )
}