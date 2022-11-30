import { FiCircle, FiNavigation2 } from "react-icons/fi";
import { GrCheckbox } from 'react-icons/gr';
import { chx, cx } from "@/lib";

export default function Sidebar() {
   return (
      <div className={cx(
         'bg-slate-800 border-b border-slate-700 text-white',
         'flex flex-col justify-between',
         chx('flex-1')
      )}>
         <ul className={cx("flex space-x-4 px-4")}>

         </ul>
         <ul className={cx("flex space-x-4 px-4")}>

         </ul>
      </div>
   )
}

const useTools = () => {
   return [
      {
         icon: FiNavigation2,
         style: ``,
      },
      { icon: GrCheckbox },
      { icon: FiCircle },
      { icon: FiCircle },
      { icon: FiCircle },
      { icon: FiCircle },
      { icon: FiCircle },
      { icon: FiCircle },
      { icon: FiCircle },
   ]
}