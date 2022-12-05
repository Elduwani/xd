import { FiCircle, FiNavigation2 } from "react-icons/fi";
import { BsSquare, BsTriangle, BsFillBookmarkCheckFill, BsLayersHalf } from 'react-icons/bs';
import { MdOutlineMaximize, MdExtension } from 'react-icons/md';
import { RiText, RiArtboard2Fill } from 'react-icons/ri';
import { BiPen, BiSearch } from 'react-icons/bi';
import { chx, cx } from "@/lib";
import React from "react";

interface PanelState {
   isOpen: boolean
   type: 'layers' | 'library' | 'extensions'
}

export default function Sidebar() {
   const tools = useTools()
   const [state, setState] = React.useState<PanelState>({
      isOpen: true,
      type: 'layers'
   })

   return (
      <div className={cx(
         'bg-slate-800 border-b border-slate-700 text-white',
         'flex flex-col justify-between',
         chx('flex-1')
      )}>
         <ul className="p-3 py-4 text-2xl space-y-5">
            {
               tools.tools[0].map((t, i) => (
                  <li
                     key={i}
                     onClick={() => tools.tools[1](i)}
                     className={tools.styles}
                  >{t}</li>
               ))
            }
         </ul>
         <ul className={cx("p-3 py-4 space-y-5")}>
            {
               tools.subTools[0].map((t, i) => (
                  <li
                     key={i}
                     onClick={() => tools.subTools[1](i)}
                     className={`${tools.styles} text-xl`}
                  >{t}</li>
               ))
            }
         </ul>
      </div>
   )
}

const useTools = () => {
   const [active, setActive] = React.useState<number>(0)
   const [subActive, setSubActive] = React.useState<number>(1)

   const tools = [
      {
         icon: FiNavigation2,
         style: 'transform -rotate-[30deg] -translate-x-1'
      },
      { icon: BsSquare },
      { icon: FiCircle },
      { icon: BsTriangle },
      {
         icon: MdOutlineMaximize,
         style: 'transform -rotate-45 translate-x-1.5 translate-y-2 text-3xl'
      },
      { icon: BiPen },
      { icon: RiText },
      { icon: RiArtboard2Fill },
      { icon: BiSearch },
   ].map((tool, i) => {
      return (
         <tool.icon
            className={cx(
               active === i ? 'text-blue-600' : 'text-slate-400',
               tool.style as string
            )}
         />
      )
   })

   const subTools = [
      { icon: BsFillBookmarkCheckFill },
      { icon: BsLayersHalf },
      { icon: MdExtension },
   ].map((tool, i) => {
      return (
         <tool.icon
            className={cx(
               subActive === i ? 'text-blue-600' : 'text-slate-400',
            )}
         />
      )
   })

   return {
      tools: [tools, setActive] as [JSX.Element[], React.Dispatch<React.SetStateAction<number>>],
      subTools: [subTools, setSubActive] as [JSX.Element[], React.Dispatch<React.SetStateAction<number>>],
      styles: 'w-8 h-8 grid place-items-center'
   }
}