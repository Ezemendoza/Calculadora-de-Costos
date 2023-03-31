import {  Routes, Route, Navigate} from "react-router-dom"
import { Configuracion } from "../Configuración/Configuracion";
import { Inicio } from "../Inicio/Inicio";

import Navbar from "../Navbars/Navbar";
import { Perfil } from "../Perfil/Perfil";


const RoutePrivado = () => {
  
  return ( 
                  <>
                    <Navbar/>
                            <Routes>
                            <Route path='/' element={ <Inicio/>}/>          
                            <Route path='/configuracion' element={ <Configuracion/>}/>      
                            <Route path='/perfil' element={ <Perfil/>}/>  
                            <Route path='*' element={ <Navigate to="/"/>}/>      
                            </Routes>
                </>
                   

  );
}

export default RoutePrivado

