import { CartContext } from "@/hook/cart";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import ItemCart from "./ItemCart";

export default function CartElement(){

  const {cart, produtos} = useContext(CartContext);

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

    return(
        <>
            {
                cart.length > 0 ? (
                    <button onClick={()=>openModal()}><BsCartCheck className='w-10 h-10'/> </button>
                ) : ( 
                    <button><AiOutlineShoppingCart className='w-10 h-10'/></button>
                )
            }
       
          <Transition appear show={isOpen} as={Fragment} >
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white p-16 text-left align-middle shadow-xl transition-all flex flex-col gap-9 justify-between">
                      <button
                        type="button"
                        className="text-3xl text-red-600 absolute right-3 top-3"
                        onClick={closeModal}
                      >
                        <AiOutlineCloseCircle/>
                      </button>
                      <table className="flex flex-col gap-2 items-center max-h-[400px] overflow-y-scroll">
                        <tr className="flex gap-8 font-bold text-2xl ">
                            <th className="w-48 justify-center">Produto</th>
                            <th className="w-48 justify-center">Quantidate</th>
                            <th className="w-48 justify-center">Valor Total</th>
                        </tr>
                        {cart.map(itemCart=><ItemCart amount={itemCart.amount} idCartItem={itemCart.id}/>)}
                      </table>
                        <div className="flex justify-center mx-auto w-full font-semibold text-2xl gap-10 items-center">
                            <p>
                                Valor Total: R$
                                {
                                    (cart.reduce((acumulador, valorAtual)=> {
                                        return acumulador + ((produtos.find((itemProduto)=> itemProduto.id === valorAtual.id).price)*valorAtual.amount);
                                    }, 0)).toFixed(2)
                                }
                            </p>
                            <button className=" p-4 bg-slate-600 rounded-full text-white">
                                Finalizar Compra
                            </button>
                        </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
}