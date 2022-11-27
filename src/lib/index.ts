
export const cx = (...classes: string[]) => classes.join(' ')

//all descendants styles
export const chx = (classes: string) => {
   return classes.split(' ').reduce((acc, curr) => acc += `[&>*]:${curr} `, '')
}

export function sanitizeNumberInput(str: string) {
   str = str.trim()
   let hasDot = false, newString = ''
   for (let i = 0; i < str.length; i++) {
      if (str[i] === '.') {
         if (hasDot || i === 0) continue
         else hasDot = true
      }
      newString += str[i]
   }
   return newString.replace(/[^\d.]+/g, "") //remove non-numeric & non dot chars
}