declare module 'react-csv';
declare module 'uuid';
declare module 'qs';

type _Obj<T = any> = Record<string, T>

interface _Tab {
   name: string
   route?: string
   onClick?(): any
   element: JSX.Element
}

interface DataRefProps<T> {
   dataRef: React.MutableRefObject<T | undefined>
}
