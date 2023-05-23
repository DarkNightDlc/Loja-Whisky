import { createContext, ReactNode, useReducer, useState } from "react"
import { createServer } from "miragejs"
import { useRouter } from "next/router";
const axios = require('axios');

createServer({
    routes() {
      this.get("/api/produtos", () => [
        { id: "0", nationality:"americano", price: 30, name: "Bulleit Bourbon",   imageUrl: "./produtos/americanos/bulleit_bourbon.png"},
        { id: "1", nationality:"americano", price: 30, name: "Jack Daniels",      imageUrl: "./produtos/americanos/jack_daniels.png"},
        { id: "2", nationality:"americano", price: 30, name: "Jim Beam",          imageUrl: "./produtos/americanos/jim_beam.png"},
        { id: "3", nationality:"americano", price: 30, name: "Woodford_Reserve",  imageUrl: "./produtos/americanos/woodford_reserve.png"},
        { id: "4", nationality:"americano", price: 30, name: "Wild Turkey",       imageUrl: "./produtos/americanos/wild_turkey.png"},
        
        { id: "5", nationality:"escoces", price: 30, name: "Old Porr",       imageUrl: "./produtos/escoces/old_porr.png"},
  
      ])
    },
  })



export interface ItemProps{
    name : string;
    id: number;
    imageUrl: string;
    nationality: string;
    price: number;
  }

interface CycleContexTypes {
    produtos: [] | [ItemProps];
    cart: [{id:number; amount: number}];
    ClearCart: ()=> void;
    searchForProducts: ()=> void;
    addNewItem: ()=> void;
    removeNewItem:()=> void;
}    

interface CartState {
    cart: [];
    itemID: number;
}

export const CartContext = createContext({} as CycleContexTypes)

interface CycleContextProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }:CycleContextProviderProps){
    const [produtos, setProdutos] = useState<[ItemProps] | []>([])
    

    function searchForProducts(){
        axios.get('/api/produtos').then(
            function (response) {
                setProdutos(response.data)
            }
        )
    }

    function addCurrentItemInCart(receivedCart :[{id:number; amount: number}], receivedId: number){
        let newCart = receivedCart
        const index = newCart.findIndex(item => item.id === receivedId)
        newCart[index] = {id: receivedId, amount: newCart[index].amount+1}
        // alert("Mais Um item adionado ao carrinho")
        return newCart
    }

    function removeCurrentItemInCart(receivedCart :[{id:number; amount: number}], receivedId: number){
        let newCart = receivedCart
        const index = newCart.findIndex(item => item.id === receivedId)
        newCart[index] = {id: receivedId, amount: newCart[index].amount-1}
        return newCart
    }

    function clearItemCart(receivedCart :[{id:number; amount: number}], receivedId: number){
        let newCart = receivedCart
        const index = newCart.findIndex(item => item.id === receivedId)
        newCart.splice(index, 1)
        return newCart
    }

    const [cartState, dispatch] = useReducer((state : CartState, action: any)=>{
        switch(action.type){
            case "ADD_PRODUCT":
                return {
                    ...state,       
                    cart : state.cart.find(itemCart=> itemCart.id === action.itemId  ) ? addCurrentItemInCart([...state.cart], action.itemId) : [...state.cart, { id: action.itemId , amount: 1} ],
                }

            case "REMOVE_PRODUCT":
                return {
                    ...state,
                    cart : state.cart.find(itemCart=> itemCart.id === action.itemId).amount !== 1 ? removeCurrentItemInCart([...state.cart], action.itemId) : clearItemCart([...state.cart], action.itemId)
                    
                } 
            
            case "CLEAR_CART":
                return {
                    ...state,
                    cart : []
                }

            default:
                alert("Ação Desconhecida")
        }

    }, {
        cart: [],
    });

    const {cart} = cartState

    console.log(cart)

    const addNewItem = (itemId: number)=>{
        dispatch({
            type: "ADD_PRODUCT",
            itemId,
        })
    }

    const removeNewItem = (itemId: number)=>{
        dispatch({
            type: "REMOVE_PRODUCT",
            itemId,
        })
    }

    const ClearCart = (itemId: number) => {
        dispatch({
            type: "CLEAR_CART",
        })
    }

    return (
        <CartContext.Provider value={{produtos, cart, ClearCart, searchForProducts, addNewItem, removeNewItem}}>
            {children}
        </CartContext.Provider>
    )
}