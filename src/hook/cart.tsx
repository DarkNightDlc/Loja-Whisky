import { createContext, ReactNode, useEffect, useReducer, useState } from "react"


type InputsProps = {
    projectName: string;
    timer: number
}

interface CycleProps {
    id: string,
    Name: string,
    Timer: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

// interface ActionProps{
    // type:string;
    // payload:{
        // activeCyclesId?: string;
        // newCycle?: {}
// 
    // }
// }

interface CycleContexTypes {
    activeCycles: CycleProps | undefined;
    activeCyclesId : string | null;
    amountSecondsPassed : number;
    cycles: CycleProps[];
    dispatch : React.Dispatch<any>;
    setActiveCyclesId : React.Dispatch<React.SetStateAction<string | null>>;
    setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
    handleCreateNewCycle: (data : InputsProps ) => void;
    StopCycle: ()=> void;
}    

interface CyclesState {
    cycles: CycleProps[];
    activeCyclesId: string | null
}

export const Cart = createContext({} as CycleContexTypes)

interface CycleContextProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }:CycleContextProviderProps){

    const [cart, setCart] = useState<[number]|[]>([])

    const [cartState, dispatch] = useReducer((state : CyclesState, action: any)=>{
        switch(action.type){
            case "ADD_NEW_PRODUCT":
                return {
                    ...state,       
                    cycles : [...state.cycles, action.payload.newCycle],
                    activeCyclesId: action.payload.newCycle.id
                }

            case "REMOVE_PRODUCT":
                return {
                    ...state,
                    cycles : state.cycles.map(cycle => cycle.id === action.payload.activeCyclesId ? {...cycle, interruptedDate :  new Date() } : cycle ),
                    activeCyclesId: null
                } 

            case "END_CURRENT_CYCLE":
                return {
                    ...state,
                    cycles : state.cycles.map(cycle => cycle.id === action.payload.activeCyclesId ? {...cycle, finishedDate :  new Date() } : cycle ),
                    activeCyclesId: null
                } 

            default:
                alert("Ação Desconhecida")
        }

    }, {
        cycles: [],
        activeCyclesId: null
    })

    return (
        <Cart.Provider value={{}}>
            {children}
        </Cart.Provider>
    )
}