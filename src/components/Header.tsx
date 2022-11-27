import { chx, cx } from "../lib";
import { HiHome } from 'react-icons/hi'

export default function Header() {
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
         <div className="flex items-center px-4">Filename, progress</div>
         <div className="flex items-center justify-end px-4">icons, zoom level</div>
      </div>
   )
}

const liStyles = cx(
   "h-full flex justify-center items-center"
)