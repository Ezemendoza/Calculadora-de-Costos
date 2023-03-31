import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence } from "firebase/auth";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap";
import fondo from "../Imagenes/mini-fondo.png"
import { Context } from "../Context";
import ReCAPTCHA from "react-google-recaptcha"
export const Registrar =()=>{
    const {expresiones,auth,setIdioma} = useContext(Context)

  const [show , setShow] = useState(false)
  const [data, setData]=useState({email:false, password:false})
const [recordar,setRecordar]=useState(false)
const [contra, setContra]=useState("")
const [confirmado, setConfirmado]=useState(false)
  	const validacion = (target) => {


       if(target.name === "pswd2"){
            setData({...data,
        pswd2:target.value, 
   })
          
            }
		else{
   
		if(expresiones[target.name].test(target.value)){
				setData({...data,
        [target.name]:target.value, 
   })
			}
            else{
                	setData({...data,
        [target.name]:undefined, 
            })
		}
	}}
      const entrar =(e,email, password)=>{
        if(confirmado){
          if(recordar){
                     setPersistence(auth, browserSessionPersistence)
                    .then((info) => {

                    setShow(true) 
                e.preventDefault()
                if(data.pswd !== undefined && data.email !== undefined){
                var form = document.querySelector('.needs-validation');
                form.classList.add('was-validated');
                    if(data.pswd2 === data.pswd){
                 createUserWithEmailAndPassword(auth, data.email, data.pswd) .then((credencial)=>{
                  const user= credencial.user
                  setIdioma(user)
                  }
                  ).catch(error => {
                    setShow(false)
               
                    if (error.code === 'auth/user-not-found') {
                      setContra("No se encuentra ninguna cuenta asociada a este email")         
                    }
                    else if (error.code === 'auth/invalid-email') {
                      setContra("Email invalido")             
                    }
                    else if (error.code === 'auth/wrong-password') {
                      setContra("El email o la contraseña es incorrecto")           
                    }
                    else if (error.code === 'auth/user-not-found"') {
                      setContra("No se encuentra ninguna cuenta asociada a este email")          
                    }
                    else if (error.code === 'auth/too-many-requests') {
                      setContra("Se ha bloqueado momentaneamente la cuenta por reiterados ingresos")         
                    }else{
                      setContra("Error intente con otro email y/o contraseña")
                    }
                  })}}

          })
          }else{
                    setShow(true) 
                e.preventDefault()
                if(data.pswd !== undefined && data.email !== undefined){
                var form = document.querySelector('.needs-validation');
                form.classList.add('was-validated');
                    if(data.pswd2 === data.pswd){
                 createUserWithEmailAndPassword(auth, data.email, data.pswd) .then((credencial)=>{
                  const user= credencial.user
                  setIdioma(user)
                  }
                  ).catch(error => {
                    setShow(false)
               
                    if (error.code === 'auth/user-not-found') {
                      setContra("No se encuentra ninguna cuenta asociada a este email")         
                    }
                    else if (error.code === 'auth/invalid-email') {
                      setContra("Email invalido")             
                    }
                    else if (error.code === 'auth/wrong-password') {
                      setContra("El email o la contraseña es incorrecto")           
                    }
                    else if (error.code === 'auth/user-not-found"') {
                      setContra("No se encuentra ninguna cuenta asociada a este email")          
                    }
                    else if (error.code === 'auth/too-many-requests') {
                      setContra("Se ha bloqueado momentaneamente la cuenta por reiterados ingresos")         
                    }else{
                      setContra("Error intente con otro email y/o contraseña")
                    }
                  });
            }else{
              setShow(false)
              setContra("Las contraseñas no coinciden")
            }
             
        }else{
              setShow(false)
              setContra("El email o la contraseña no cumple con los parametros requeridos")
        }
          }
        }else{
          setContra("Por favor, autentiquese para confirmar que no es un robot")
        }



      
              
         }
    return (
           <>
                  <Modal show={show}  className="modal-inicio">
                         <Modal.Body className="modal-mal"> <div className="d-flex justify-content-center mt-5 "> 
                                             <Spinner animation="border" role="status" className='spinning'>
                                             </Spinner>
                                     </div>
                                     <div className="d-flex align-items-center flex-column"> 
                                     <p className="visually mt-3">Cargando...</p>
                                     <p >Se te direccionara en breve...</p>
                                     </div>
                           
                         </Modal.Body>        
                     </Modal>
                     
     
    

                     <section className="vh-100">
  <div className="container-fluid">
    <div className="columna-row">
      <div className="col-sm-6 text-black shadow">

        <div className="px-5 ms-xl-4">
          <img src={fondo} className="logo-seidores mt-2 mb-2" alt='seidor'/>
        </div>

        <div className="  container my-5 py-5">

     
        <h3 className="fw-normal mb-3 pb-3 titulo-login" >Ingresá</h3>
             <form className="needs-validation">
              <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Escriba un mail valido" onChange={e=>validacion(e.target)} required/>
                  {data.email !== undefined ?
                    <div className="valid-feedback">Cumple con los parametros solicitados.</div>:
                     <div className="invalid-feedback">Por favor, escriba un mail valido</div>
                  }
                
  
  
              </div>
              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" id="pwd" placeholder="Escriba su contraseña" name="pswd" onChange={e=>validacion(e.target)} minLength="4" maxLength="12" required />
               {data.pswd !== undefined &&
                  <>
                   {data.pswd !== false ?
                    <div className="valid-feedback">Cumple con los parametros solicitados.</div>:
                     <div className="invalid-feedback">Por favor, escriba un mail valido</div>
                  }
                  </>
                 
                  }
              </div>
              <div className="mb-3">
                <label htmlFor="pwd2" className="form-label">Password:</label>
                <input type="password" className="form-control" id="pwd2" placeholder="Repita su contraseña" name="pswd2" onChange={e=>validacion(e.target)}  minLength="4" maxLength="12" required />
   
                   {contra !== "" &&
                     <div className="text-danger">{contra} </div>
                  }
                  
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="myCheck" name="remember" value={recordar} />
                <label className="form-check-label text-black" onChange={e=>setRecordar(!recordar)}>Recordarme</label>
                        <ReCAPTCHA
                                sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA}
                                onChange={e=>setConfirmado(!confirmado)}
                                className="mt-3"
                            />
                
              </div>
              <button type="submit" className="btn btn-primary " onClick={e=>entrar(e)}>Ingresar</button>
             <Link to={"/"}><p>Si tenes cuenta, ingrese aqui.</p></Link> 
            </form>



        {/* <Link to={"/inicio"}>  <button className=" btn boton-ml mt-1" onClick={e=>entrar(e,email.campo, password.campo)}>Iniciar Sesion </button></Link>
        <Link to={"/reestablecer"}> <p className=" mb-5 pb-lg-2 mt-4 text-muted">¿Te olvidaste la contraseña?</p></Link> */}
                  

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block div-img-grande">
      <img src="https://i.giphy.com/media/l5JbspfwZ0yjHjlJ0K/giphy.webp" autoPlay={true} muted={true} loop={true} className=" vh-100 img-grande" />
      
   

      </div>
    </div>
  </div>
</section>


    
   
      </>
    )
}