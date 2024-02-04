import { creditCheckMachine } from "@/machines/machine"
import { useMachine } from "@xstate/react"

export default function CreditCheck() {
   const [state, send] = useMachine(creditCheckMachine)

   return (
      <div className="w-full max-w-lg ring-1">
         <p>
            <pre>{JSON.stringify(state.value, null, 2)}</pre>
         </p>
         <br />
         <button
            onClick={() => send({
               type: 'Submit',
               firstName: 'E',
               lastName: 'O',
               SSN: '123456789'
            })}
         >
            Start new workflow
         </button>
      </div>
   )
}