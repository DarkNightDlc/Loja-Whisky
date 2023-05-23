import { CartContext } from "@/hook/cart";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ItemProps{
  name: string;
  imageUrl: string;
}
export default function ItemMenu({item}:ItemProps){

  const {addNewItem} = useContext(CartContext);

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return(
    <>
      <button
        key={item.name}
        type="button"
        onClick={openModal}
        className="flex flex-col bg-white rounded-md overflow-hidden p-5 items-center gap-5"
      >
        <img src={item.imageUrl} className="w-72 h-72"/>
        <h1 className="font-extrabold text-3xl">{item.name}</h1>
      </button>
    

      <Transition appear show={isOpen} as={Fragment} key={`${item.name}Dialogo`}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white p-16  text-left items-center justify-center align-middle shadow-xl transition-all">
                    <button
                      type="button"
                      className="text-3xl text-red-600 absolute right-3 top-3"
                      onClick={closeModal}
                    >
                      <AiOutlineCloseCircle/>
                    </button>
                    <Tab.Group>
                      <Tab.List className="mx-auto flex justify-center w-full gap-6 text-xl font-bold mb-5">
                        <Tab>Whisky</Tab>
                        <Tab>Como Degustar</Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel>
                          <div className="flex items-center">
                            <img className="w-96 h-96" src={item.imageUrl}/>
                            <div className="flex flex-col gap-6 items-center justify-center h-full">
                              <Dialog.Title
                                as="h3"
                                className="text-5xl font-bold leading-6 text-gray-900"
                              >
                                {item.name}
                              </Dialog.Title>
                              <p className="text-xl font-bold"> R${item.price.toFixed(2)}</p>
                              <button
                                onClick={()=>addNewItem(item.id)}
                                className="rounded-full bg-slate-700 text-white font-extrabold text-xl; p-4"
                              >
                                Adicionar ao Carrinho
                              </button>
                            </div>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel><iframe width="560" height="315" src="https://www.youtube.com/embed/27iRSepPZvc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                    

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}