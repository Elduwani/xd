import { BsUiChecksGrid } from 'react-icons/bs'
import { CgPathBack, CgPathCrop, CgPathExclude, CgPathUnite } from 'react-icons/cg'

export default function RepeatGrid() {
   const styles = {
      main: 'flex-1 flex text-2xl justify-between p-4',
   }
   return (
      <div className='flex items-center p-2 px-4 space-x-2'>
         <button className='flex items-center space-x-2 ring-1 ring-slate-700 h-10 px-4 rounded-md'>
            <BsUiChecksGrid />
            <span>Repeat Grid</span>
         </button>
         <ul className={styles.main}>
            <li><CgPathUnite /></li>
            <li><CgPathBack /></li>
            <li><CgPathCrop /></li>
            <li><CgPathExclude /></li>
         </ul>
      </div>
   )
}
