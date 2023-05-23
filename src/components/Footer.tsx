import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export function Footer(){
    return(
        <footer className='flex justify-center items-center gap-10 bg-slate-700 text-white px-5 py-12'>
            <img src="./icon.png" className='w-14 h-14 rounded-full'/> 
            <a href="tel:+5571999999999" className='flex items-center gap-2'>
              <AiOutlinePhone className='w-6 h-6'/> 
              (71) 99999-9999
            </a>
            <a href="mailto:emaildoano@gmail.com" className='flex items-center gap-2'>
              <AiOutlineMail className='w-6 h-6'/> 
              emaildoano@gmail.com
            </a>
        </footer>
    )
}