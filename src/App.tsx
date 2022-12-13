import Header from "@/components/Header"
import AttributesPanel from "./components/attributes"
import Sidebar from "./components/Sidebar"

function App() {
   return (
      <div className="bg-slate-900 h-full w-full flex flex-col text-sm">
         <Header />
         <div className="content flex-1 flex bg-red-50">
            <Sidebar />
            <div className="canvas bg-slate-700 flex-1 grid place-items-center text-white">
               Canvas
            </div>
            <AttributesPanel />
         </div>
      </div>
   )
}

export default App
