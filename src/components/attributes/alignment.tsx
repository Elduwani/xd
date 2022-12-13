import { CgAlignBottom, CgAlignCenter, CgAlignLeft, CgAlignMiddle, CgAlignRight, CgAlignTop } from 'react-icons/cg'
import { MdVerticalAlignCenter } from 'react-icons/md'

export default function Alignment() {
   const styles = {
      main: 'flex-1 flex text-2xl justify-evenly p-4',
      children: ''
   }
   return (
      <div className='flex w-full divide-x divide-slate-600'>
         <ul className={styles.main}>
            <li><CgAlignTop /></li>
            <li><CgAlignMiddle /></li>
            <li><CgAlignBottom /></li>
            <li><MdVerticalAlignCenter /></li>
         </ul>
         <ul className={styles.main}>
            <li><CgAlignLeft /></li>
            <li><CgAlignCenter /></li>
            <li><CgAlignRight /></li>
            <li><MdVerticalAlignCenter /></li>
         </ul>
      </div>
   )
}
