import { CartContext } from "@/hook/cart";
import { useContext, useEffect } from "react";
import ItemCart from "@/components/ItemCart";

export default function Cart(){
  const { cart, produtos, searchForProducts} = useContext(CartContext);

  useEffect(() => {
    searchForProducts()
  }, [])

    return(
        <section className="mx-auto max-w-[1440px] px-5 gap-5 flex">
            {
                produtos.map(() => <h1>opa</h1>)
            }
        </section>
    )
}