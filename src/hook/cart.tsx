import { createContext, ReactNode, useReducer, useState } from "react"
import { createServer } from "miragejs"
import { useRouter } from "next/router";
const axios = require('axios');

createServer({
    routes() {
      this.get("/api/produtos", () => [
        { id: "0", nationality:"americano", price: 30, name: "Bulleit Bourbon",   imageUrl: "./produtos/americanos/bulleit_bourbon.png"},
        { id: "1", nationality:"americano", price: 130, name: "Jack Daniels",      imageUrl: "./produtos/americanos/jack_daniels.png"},
        { id: "2", nationality:"americano", price: 230, name: "Jim Beam",          imageUrl: "./produtos/americanos/jim_beam.png"},
        { id: "3", nationality:"americano", price: 330, name: "Woodford Reserve",  imageUrl: "./produtos/americanos/woodford_reserve.png"},
        { id: "4", nationality:"americano", price: 430, name: "Wild Turkey",       imageUrl: "./produtos/americanos/wild_turkey.png"},
        
        { id: "5", nationality:"escoces", price: 50,  name: "Old Porr",         imageUrl: "./produtos/escoces/old_porr.png"},
        { id: "6", nationality:"escoces", price: 130, name: "Passport Scotch",  imageUrl: "./produtos/escoces/passport_scotch.png"},
        { id: "7", nationality:"escoces", price: 230, name: "Dalmore",          imageUrl: "./produtos/escoces/dalmore.png"},
        { id: "8", nationality:"escoces", price: 330, name: "White Horse",      imageUrl: "./produtos/escoces/white_horse.png"},
        { id: "9", nationality:"escoces", price: 430, name: "Ballantines",      imageUrl: "./produtos/escoces/ballantines.png"},

        { id: "10", nationality:"indiano", price: 50,  name: "Mansion House",    imageUrl: "./produtos/indiano/mansion_house.png"},
        { id: "11", nationality:"indiano", price: 130, name: "Imperial Blue",    imageUrl: "./produtos/indiano/imperial_blue.png"},
        { id: "12", nationality:"indiano", price: 230, name: "Amrut",          imageUrl: "./produtos/indiano/amrut.png"},
        { id: "13", nationality:"indiano", price: 330, name: "MC Donells",      imageUrl: "./produtos/indiano/mc_donells.png"},
        { id: "14", nationality:"indiano", price: 430, name: "Royal Tiger",      imageUrl: "./produtos/indiano/royal_tiger.png"},

        { id: "15", nationality:"irlandes", price: 50,  name: "Jameson",        imageUrl: "./produtos/irlandes/jameson.png"},
        { id: "16", nationality:"irlandes", price: 130, name: "Highland Queen", imageUrl: "./produtos/irlandes/highland_queen.png"},
        { id: "17", nationality:"irlandes", price: 230, name: "Bushmills",      imageUrl: "./produtos/irlandes/bushmills.png"},
        { id: "18", nationality:"irlandes", price: 330, name: "Bells",          imageUrl: "./produtos/irlandes/bells.png"},
        { id: "19", nationality:"irlandes", price: 430, name: "Paddy",          imageUrl: "./produtos/irlandes/paddy.png"},

        { id: "20", nationality:"japones", price: 50,  name: "Hibiki",        imageUrl: "./produtos/japones/hibiki.png"},
        { id: "21", nationality:"japones", price: 130, name: "Suntory",       imageUrl: "./produtos/japones/suntory.png"},
        { id: "22", nationality:"japones", price: 230, name: "The Hakushu",     imageUrl: "./produtos/japones/the_hakushu.png"},
        { id: "23", nationality:"japones", price: 330, name: "Akashi",         imageUrl: "./produtos/japones/akashi.png"},
        { id: "24", nationality:"japones", price: 430, name: "Nikka",         imageUrl: "./produtos/japones/nikka.png"},

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
    produtosExibidos: [ItemProps]; 
    setProdutosExibidos : SetStateAction<[] | [ItemProps]> ;
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
    const [produtosExibidos, setProdutosExibidos] = useState<[ItemProps] | []>(produtos)

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

    function addNewItemCart(receivedCart :[{id:number; amount: number}], receivedId: number){

        
        alert("Adicionou um novo item ao carrinho")
        return [...receivedCart, { id: receivedId , amount: 1} ]
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
                    cart : state.cart.find(itemCart=> itemCart.id === action.itemId  ) ? addCurrentItemInCart([...state.cart], action.itemId) : addNewItemCart([...state.cart], action.itemId ),
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
        <CartContext.Provider value={{produtos, cart, ClearCart, searchForProducts, addNewItem, removeNewItem,produtosExibidos, setProdutosExibidos}}>
            {children}
        </CartContext.Provider>
    )
}