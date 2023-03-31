import { getAuth, onAuthStateChanged } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import { app } from "./Database/database";


type Props = {
    children:
      | JSX.Element
      | JSX.Element[]
      | string
      | string[];
  };

  export const Context  = createContext<any>({});

export const ContextProvider =({children}: Props)=>{
const auth=getAuth(app)
const [idioma, setIdioma]= useState<any>()
const expresiones = {
    fecha:/^(?:0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])\1\d{4}$/,
    nombre: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, 
    pswd: /^.{4,12}$/, 
    dni: /^[0-9\s]{8}$/, 
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }
      useEffect( () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
        setIdioma(user)
        } 
      });
}, [])
    return(

    <Context.Provider value={{idioma,setIdioma,expresiones,auth}}>
        {children}
    </Context.Provider>
    
)
}
