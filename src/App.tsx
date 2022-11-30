import Header from "@/components/Header"
import Sidebar from "./components/Sidebar"

function App() {
   return (
      <div className="bg-slate-900 h-full w-full flex flex-col">
         <Header />
         <div className="content flex-1 flex bg-red-50">
            <Sidebar />
            <div className="canvas bg-slate-700 flex-1 grid place-items-center text-white">
               Canvas
            </div>
            <div className="property-panel w-full max-w-xs grid place-items-center">
               Property Panel
            </div>
         </div>
      </div>
   )
}

export default App
