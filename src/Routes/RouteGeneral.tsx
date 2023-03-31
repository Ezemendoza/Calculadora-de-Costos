import { HashRouter } from 'react-router-dom'
import RoutePublico from './RoutePublico';
import RoutePrivado from './RoutePrivado';
import { useContext } from 'react';
import { Context } from '../Context';



const RouteGeneral = () => {
const {idioma} =useContext(Context)

    return (
        <HashRouter>

        {idioma !== undefined ?
        <RoutePrivado/>:
            <RoutePublico/>
        }


             
</HashRouter>
    
    )
}

export default RouteGeneral