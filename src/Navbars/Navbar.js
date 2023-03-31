import { Link } from "react-router-dom"
import "./Navbar.css"
import fondo from "../Imagenes/mini-fondo.png"
import Dropdown from "react-bootstrap/Dropdown"
import { app } from "../Database/database"
import { getAuth } from "firebase/auth"
import fondos from "../Imagenes/fondo-icono.png"
 const Navbar =()=>{
    const auth = getAuth(app)
    const cerrar = ()=>{
        auth.signOut()
        .then(()=>{
            window.location.href="/"
        }
      )
    
    }
    return(
            <nav class="navbar navbar-expand-xl navbar-dark bg-dark pmd-navbar pmd-z-depth fixed-top">
      
    <button class="navbar-toggler pmd-navbar-toggle" type="button" data-toggle="collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <img  src={fondo}/>
    
    <div class="collapse navbar-collapse pmd-navbar-sidebar" id="navbarSupportedContent">
    
        <ul class="navbar-nav mr-5">
            <li class="nav-item active">
                <a class="nav-link pmd-ripple-effect" href="#">Home</a>
            </li>
           <Link to={"/configuracion"} className="nav-link pmd-ripple-effect"> <li class="nav-item">
             Configuración
            </li>
       </Link>
          
        </ul>
      
    </div>
     <div class="dropdown pmd-dropdown pmd-user-info">
           
        <Dropdown>
      <Dropdown.Toggle variant="btn btn-user" id="dropdown-basic" className="w-100">
        User      <img class="mr-2" src={fondos} width="40" height="40" alt="avatar"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item ><Link to={"/perfil"} className="text-decoration-none text-black">Mi perfil</Link></Dropdown.Item>
        <Dropdown.Item><Link to={"/configuracion"} className="text-decoration-none text-black">Configuración</Link></Dropdown.Item>
        <Dropdown.Item onClick={e=>cerrar()}>Cerrar Sesión</Dropdown.Item>
      </Dropdown.Menu>
      
    </Dropdown>
        </div>
</nav>
    )
}
export default Navbar