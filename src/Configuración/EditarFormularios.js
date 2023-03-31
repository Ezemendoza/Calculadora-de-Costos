
import { useContext,useState } from "react"
import { Modal } from "react-bootstrap";
import { addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import { TablaFormulario } from "./TablaFormulario";
import { db } from "../Database/database";
import { Context } from "../Context";
import { BsTrash } from "react-icons/bs";


export const EditarFormulario =({info, setInfo, array, setNombre, nombre, setArray , id, setId})=>{
    const {idioma}=useContext(Context)
  const [show, setShow]=useState(false)
  const [data,setData]=useState()
      const nuevo=async ()=>{
           const docRef = await addDoc(collection(db, "calculadora"), {
  nombre:"Nueva calculadora",
    form:[{id:array.length + 1, nombre:"", numeros:[], moneda:"", elegir:"", valor:"No"}],
    creado:idioma.email
                }).then((resp)=>{
                  array.push({ nombre:"Nueva calculadora",
                                         form:[{id:array.length, nombre:"", numeros:[], moneda:"", elegir:"", valor:"No"}], id:resp.id,creado:idioma.email})
                    setArray([...array])
						})
						}
   
const cambio =(e,el)=>{
  const si = document.getElementsByClassName("nav-link")
  for(let i in si){
   
    if(si[i].classList[1] !== undefined){
    if(si[i].classList[1] === "active"){
      si[i].classList.remove("active")
    }
    }
for(let i in si){
  if(si[i].className=== "nav-link"){
    if(si[i].value === el.id){
      si[i].classList.add("active")
      setInfo(el.form)
      setNombre(el.nombre)
      setId(el.id)
    }
  }

}
  } 
}

const eliminarOpcion = async(e)=>{
setData(e.target.value)

}
const eliminar =async()=>{
    const si = array.filter(el=>el.id !== data)
await deleteDoc(doc(db, "calculadora", data));
setArray([...si])
setShow(false)
}
    return( 
        <div>
        
  <div className="py-5">

    <Modal show={show}  className="d-flex flex-column justify-content-center" >
       <Modal.Header>
           <Modal.Title>Seleccione una opción para eliminar  </Modal.Title>
         </Modal.Header>
                              <Modal.Body className="modal-mal"> 
                                          <select className="form-select py-3"    onChange={e=>eliminarOpcion(e)}  >
                                                                <option value={""}></option>
                                                           { array.map((el)=>
                                                            <option value={el.id} name={el.nombre} > {el.nombre} </option>
                                                              )
                                                              }
                                                            </select>
                                
                              </Modal.Body>        
                                  <Modal.Footer>
                                      <button className="btn btn-primary" onClick={e=>setShow(!show)}>
                                      Cerrar
                                      </button>
                                       <button className="btn btn-danger" onClick={e=>eliminar(e)}>
                                     Confirmar
                                      </button>
                                    </Modal.Footer>
                          </Modal>

  <div className="flex-column my-5 py-5 container caja-sombreado" >
    
   <section >
		{array !== undefined  &&
		<div className="container">
			<div className="shadow rounded-lg d-block d-sm-flex">
				<div className="profile-tab-nav border-right">
					<div className="p-4 perfil-img">
						
						<h4 className="text-center"></h4>
					</div>
					<div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
 
            { array.map((el)=>
              <button className="nav-link active " id="account-tab" data-toggle="pill"  role="tab" aria-controls="account" aria-selected="true" onClick={e=>cambio(e,el)} value={el.id} key={el.id} >
							<i className="fa fa-home text-center mr-1"></i> 
							{el.nombre}
                </button>
            )
            }
            <div className="d-flex justify-content-around ">     
              <button className="mt-5 btn btn-success w-25 " title="Agregar calculadora" onClick={e=>nuevo()}> 
             +
            </button>
            <button className="mt-5 btn btn-danger w-25 " title="Borrar calculadora" onClick={e=>setShow(!show)}> 
             <BsTrash/>
            </button>
            </div>
       

		

					</div>
				</div>
				<div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
          
                    <TablaFormulario info={info} setInfo={setInfo}    id={id} array={array} setNombre={setNombre} nombre={nombre}  /> 
	
	
		
				</div>
			</div>
		</div>
    }
	</section>




             
         </div>
         </div>
             
        </div>
)
}