import { BiSearch } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'
import { TbArtboard } from 'react-icons/tb'

export default function LayersPanel() {
   return (
      <div className='bg-slate-800 h-full text-white p-2 capitalize'>
         <div className="p-2 pb-3 border-b border-slate-700 flex items-center justify-between space-x-2">
            <BiSearch className='text-xl' />
            <p className='flex-1'>All Items</p>
            <FiChevronDown className='text-xl' />
         </div>
         <div className="space-y-2 p-4 px-2">
            <p className='uppercase text-xs tracking-widest pt-4 pb-2'>Artboards</p>
            {
               Array.from({ length: 12 }, (_, i) => (
                  <div
                     key={i}
                     className="flex items-center space-x-2 p-2 hover:bg-slate-700"
                  >
                     <TbArtboard />
                     <span>Artboard {i + 1}</span>
                  </div>
               ))
            }
         </div>
      </div>
   )
}
