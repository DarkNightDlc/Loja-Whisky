import { CartContext } from "@/hook/cart";
import { useContext } from "react";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";


export default function ItemCart({idCartItem, amount}: {idCartItem:number; amount: number}) {
  const {produtos, addNewItem, removeNewItem} = useContext(CartContext);

  const itemCurrent = produtos.find(item => item.id == idCartItem);

    return (
          <tr className="flex gap-8 text-xl items-center justify-between" key={itemCurrent?.id}>
                <td className="flex items-center w-48 justify-center">
                  <img src={itemCurrent?.imageUrl} className="w-24 h-24"/>
                  <span>{itemCurrent?.name}</span>
                </td>
                <td className="flex gap-3 justify-center text-4xl w-48">
                    <button className="" onClick={()=>removeNewItem(idCartItem)} ><IoIosRemoveCircleOutline/></button>
                    <span>{amount}</span>
                    <button className="" onClick={()=>addNewItem(idCartItem)} ><IoIosAddCircleOutline/></button>
                </td>
                <td className="w-48 flex justify-center">R${(itemCurrent?.price*amount).toFixed(2)}</td>
            </tr>
    )
    
}