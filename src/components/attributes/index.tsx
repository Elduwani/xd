import Alignment from "./alignment";
import RepeatGrid from "./repeat-paths";
import Transform from "./transform";

export default function AttributesPanel() {
   return (
      <div className="w-full max-w-xs bg-slate-800 border-l border-slate-700 text-white">
         <div className="divide-y divide-slate-700">
            <Alignment />
            <RepeatGrid />
            <Transform />
         </div>
      </div>
   )
}
