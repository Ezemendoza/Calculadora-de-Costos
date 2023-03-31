import { Routes, Route, Navigate} from 'react-router-dom'
import LoginPredeterminado from '../Login/LoginPredeterminado'
import { Perfil } from '../Perfil/Perfil'
import { Registrar } from '../Registrar/Registrar'




const RoutePublico = () => {

    return (
        <>
       
  
          
                            <Routes>
                            <Route path='/' element={ <LoginPredeterminado/>}/>          
                            <Route path='/registrar' element={ <Registrar/>}/>    
                            <Route path='/recuperar' element={<Perfil/>}/>
                            <Route path='*' element={ <Navigate to="/"/>}/>      
                            </Routes>
 
        </>
    )
}

export default RoutePublico