import { chx, cx } from "@/lib";
import { HiChevronDown, HiCloud, HiHome, HiUserCircle } from 'react-icons/hi'
import { FiPlay, FiSmartphone } from 'react-icons/fi'

export default function Header() {
   const date = new Date()

   return (
      <div className={cx(
         'h-12 bg-slate-800 border-b border-slate-700 text-white',
         'flex justify-between',
         chx('flex-1')
      )}>
         <ul className={cx("flex space-x-4 px-4")}>
            <li className={liStyles + " text-2xl"}><HiHome /></li>
            <li className={liStyles}>Design</li>
            <li className={liStyles}>Prototype</li>
            <li className={liStyles}>Share</li>
         </ul>
         <div className="flex items-center px-4 capitalize space-x-2">
            <HiCloud className="text-2xl" />
            <p>Untitled -- {date.getDate()} {months[date.getMonth()]}</p>
            <HiChevronDown className="text-xl" />
         </div>
         <div className="flex items-center justify-end px-4 space-x-4 text-xl">
            <HiUserCircle />
            <FiSmartphone />
            <FiPlay />
            <p className="text-base">70.5%</p>
            <HiChevronDown className="text-xl" />
         </div>
      </div>
   )
}

const liStyles = cx(
   "h-full flex justify-center items-center"
)

const months = [
   'january', 'february', 'march',
   'april', 'may', 'june', 'july',
   'august', 'september', 'october',
   'november', 'december'
]