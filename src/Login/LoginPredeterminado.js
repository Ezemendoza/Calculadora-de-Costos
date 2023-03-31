import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import {  useContext, useState } from "react";
import "./Login.css"
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap";
import fondo from "../Imagenes/mini-fondo.png"
import { Context } from "../Context";
import ReCAPTCHA from "react-google-recaptcha"

const LoginPredeterminado = () => {
    const {expresiones,auth,setIdioma} = useContext(Context)

    const [errores, setErrores] = useState({erroneo:"",exito:""})
  const [show , setShow] = useState(false)
  const [data, setData]=useState({email:false, password:false})
const [recordar,setRecordar]=useState(false)
const [confirmado, setConfirmado]=useState(false)
  	const validacion = (target) => {
		if(expresiones){
			if(expresiones[target.name].test(target.value)){
				setData({...data,
        [target.name]:target.value})
			} else {
								setData({...data,
        [target.name]:target.value})
              
			}
		}


	}

      const entrar =(e,email, password)=>{
        e.preventDefault()
 const ok =()=>{
    signInWithEmailAndPassword(auth, data.email, data.pswd) .then((credencial)=>{
                  const user= credencial.user
                  setIdioma(user)
                  }
                  ).catch(error => {
                    setShow(false)
                    console.log(error.code)
                    if (error.code === 'auth/user-not-found') {
                      setErrores({erroneo:"No se encuentra ninguna cuenta asociada a este email", exito:""})         
                    }
                    if (error.code === 'auth/invalid-email') {
                      setErrores({erroneo:"Email invalido", exito:""})             
                    }
                    if (error.code === 'auth/wrong-password') {
                      setErrores({erroneo:"El email o la contraseña es incorrecto", exito:""})           
                    }
                    if (error.code === 'auth/user-not-found"') {
                      setErrores({erroneo:"No se encuentra ninguna cuenta asociada a este email", exito:""})          
                    }
                    if (error.code === 'auth/too-many-requests') {
                      setErrores({erroneo:"Se ha bloqueado momentaneamente la cuenta por reiterados ingresos", exito:""})         
                    }
                  });
 }
if(confirmado){
setShow(true) 
              if(recordar){
                  setPersistence(auth, browserSessionPersistence)
                    .then((info) => {
                        ok()

                    })
              }else{
                 ok()
              }
}else{
  setErrores({erroneo: "Por favor, autentiquese para confirmar que no es un robot", exito:""})
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
             <form className="need-validated">
              <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" class="form-control" id="inputEmail" name="email" onChange={e=>validacion(e.target)} required/>
                <div className="invalid-feedback">Por favor, escriba un mail valido</div>
                <div className="valid-feedback">Cumple con los parametros solicitados.</div>
  
  
              </div>
              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" id="pwd" placeholder="Escriba su contraseña" name="pswd" onChange={e=>validacion(e.target)} minLength="4" maxLength="12" required />
                <div className="invalid-feedback">La contraseña debe tener entre 4 - 12 caracteres.</div>
                <div className="valid-feedback">Cumple con los parametros solicitados.</div>
              </div>
              
              <div className="form-check mb-3 ">
                <input className="form-check-input" type="checkbox" id="myCheck" name="remember" value={recordar} onChange={e=>setRecordar(!recordar)} />
                <label className="form-check-label text-black" >Recordarme</label>
                   <ReCAPTCHA
                                sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA}
                                onChange={e=>setConfirmado(!confirmado)}
                                className="mt-3"
                            />
              </div>
              <div className="d-flex justify-content-center w-50">
                    <button type="submit" className="btn btn-primary" onClick={e=>entrar(e)}>Iniciar sesion</button>
                

                </div>
                  {errores && <p className="text-danger  mt-2 mb-2 text-center w-50 ">{errores.erroneo}</p> }
               <div className="d-flex justify-content-around w-50 mt-3">
                  <Link to={"/registrar"} className="text-decoration-none "><p>¿No te has registrado?</p></Link> 
                  <Link to={"/recuperar"} className="text-decoration-none "><p>¿Has olvidado tu contraseña?</p></Link> 
              </div>
   
            </form>



                  

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
      <img src="https://i.giphy.com/media/l5JbspfwZ0yjHjlJ0K/giphy.webp" autoPlay={true} muted={true} loop={true} className=" vh-100" />
      
   

      </div>
    </div>
  </div>
</section>


    
   
      </>
    )
}

export default LoginPredeterminado
