import { sendPasswordResetEmail } from "firebase/auth";
import React, { memo, useContext, useState } from "react"
import { Link } from "react-router-dom";
import { Context } from "../Context";

export const Perfil = ()=>{
  
    const{auth} = useContext(Context)
    const [errores, setErrores]= useState({erroneo:"", exito:""})
    const [email, cambiarEmail] = useState();


    const aceptar=(e)=>{
     sendPasswordResetEmail(auth, email)
    .then(() => {
      setErrores({erroneo:"", exito:"Se ha enviado un mail a tu casilla de correo para reestablecer su contraseña" })
    })
    .catch((error) => {
        if(error.code === "auth/user-not-found"){
      setErrores({erroneo:"Por favor,escriba un usuario registrado", exito:"" })
        }else if(error.code ==="auth/invalid-email"){
                  setErrores({erroneo:"Por favor, escriba un mail valido", exito:"" })
        }

    })}
    return(
        <section className="py-5 my-5">
		<div className="container">
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
		
				<div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
					<div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
						<h3 className="mb-4">Restableza su contraseña</h3>
					 <form className="was-validated">
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" class="form-control" id="inputEmail" name="email" onChange={e=>cambiarEmail(e.target.value)} required/>
                            {email !== undefined &&
                            <>
                            {email.length > 0 &&
                            <>
                                <div className="invalid-feedback">Por favor, escriba un mail valido</div>
                            <div className="valid-feedback">Cumple con los parametros solicitados.</div>
                            </>
                            }
                            </>
                        }
                        </div> 
                        </form>
				
                        <h5 className={`${errores.erroneo !== "" ? 'texto-erroneo text-danger' : 'text-success'}`}>{errores.erroneo !== "" ? errores.erroneo: errores.exito}</h5>
						<div className="d-flex justify-content-around mt-3 w-100">
										<button onClick={e=>aceptar(e)} className="btn btn-primary"> Enviar</button>
                                        <Link to={"/inicio"}> <button  className="btn btn-primary"> Volver</button></Link>
									</div>
						
					
					</div>
		
				</div>
			</div>
		</div>
	</section>
    )
} 