import { CartContext } from "@/hook/cart";
import { useContext } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";


export default function ItemCart({idCartItem, amount}: {idCartItem:number; amount: number}) {
  const {produtos, addNewItem, removeNewItem} = useContext(CartContext);

  const itemCurrent = produtos.find(item => item.id == idCartItem);

    return (<div>
                <p>Opa</p>
                <p className="flex">
                    <button><IoIosRemoveCircleOutline/></button>
                    <span></span>
                </p>
                <p>Valor Total</p>
            </div>
    )
    
}