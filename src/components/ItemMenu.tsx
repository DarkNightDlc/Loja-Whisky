import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function ItemMenu(item){

    let [isOpen, setIsOpen] = useState(false)

    console.log(item)
    return(
      <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>{item.name}</Dialog.Title>
          <Dialog.Description>
            <img className=' w-48 h-48 ' src={item.imageUrl}/>
          </Dialog.Description>
          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
         <div 
           className='flex flex-col-reverse bg-white rounded-md overflow-hidden p-5 items-center'
           onClick={()=>{setIsOpen(false)}}
         >
           <p className="font-bold text-red-500">{item.name}</p>
           <img className=' w-48 h-48 ' src={item.imageUrl}/>

         </div>
      </>
    )
}