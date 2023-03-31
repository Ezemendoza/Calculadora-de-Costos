import {useContext, useEffect,  useRef, useState} from "react"
import axios from "axios"
import {  getDocs, where ,query, collection} from "firebase/firestore"
import { db } from "../Database/database"
import { Context } from "../Context"
import pdfLogo from "../Imagenes/svg.png"
import "./Inicio.css"
import { billeton,billete ,confirmacion,currency,pdf,si } from "../Funciones/Funciones"

export const Inicio =() =>{
      const [info, setInfo]=useState([])
      const [sueldo, setSueldo]=useState(1)
      const [final, setFinal]=useState()
      const [dolar,setDolar]=useState()
      const [nombre,setNombre]=useState()
      const [area, setArea]=useState()
      const [array,setArray]=useState()
      const [data, setData]=useState()
      const {idioma}=useContext(Context)
          const pdfRef = useRef(null)
      
      useEffect(()=>{
               const evaluaciones= collection(db, "calculadora")
               const q = query(evaluaciones, where("creado", "==", idioma.email))
            getDocs(q)
            .then((resp)=>{
              const newItem= resp.docs.map((el)=>{
                return{
                  id:el.id,
                  ...el.data()
                }})
                setArray(newItem)
                setData(newItem[0].form)
                setTimeout(() => {
                     const si = document.getElementsByClassName("nav-link")
                for(let i in si){
                  if(si[i].value !== newItem[0].id){
                  if(si[i].classList[1] === "active"){
                    si[i].classList.remove("active")
                  } }
                }
                }, 100);
             
            })
                           
      },[])
      
const subida=(e,dato)=>{
  const si = data.filter(el=>dato.id===el.id)
    si[0].valor=e.target.value
 setData([...data])
}




 useEffect(()=>{
let numero =0
for(let i in data){
    if(data[i].valor ==="Si" || data[i].elegir==="si"){
    for(let k in data[i].numeros){
        if(data[i].elegir === "no"){
              numero += parseInt(billete(data[i].numeros[k].dolar, data[i].numeros[k].precio, data[i].numeros[k],dolar,sueldo))
        }else{
              if(data[i].numeros[k].id == data[i].valor){
                if(data[i].numeros[k].metodo === "porcentaje"){
                  numero += (sueldo * data[i].numeros[k].precio) / 100
                }else{
                numero += parseInt(data[i].numeros[k].precio)
                }
              }
        }
      } 
    }
}
  setFinal(numero)
 },[info,sueldo,final,dolar, nombre,array,subida , data ])






useEffect(()=>{
const si = async()=>{
    const dataDolar = await axios.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    const ok =[]
    for(let i in dataDolar.data){
    ok.push({compra:dataDolar.data[i].casa.compra, venta:dataDolar.data[i].casa.venta, nombre:dataDolar.data[i].casa.nombre})  
    }
setDolar(ok)
}
si()
},[])




const cambio =(e,el)=>{
  const si = document.getElementsByClassName("nav-link")
  const ok = document.querySelectorAll("select")
 for(let k in ok){
      if(ok[k].value !== undefined){
      ok[k].value = ""
      }
 }
  for(let i in si){
        if(si[i].classList[1] !== undefined){
        if(si[i].classList[1] === "active"){
          si[i].classList.remove("active")}
        }
      for(let i in si){
        if(si[i].className=== "nav-link"){
          if(si[i].value === el.id){
            si[i].classList.add("active")
            setData(el.form)}
        }
        }
  } 
}

  return (

      <section >
		{array !== undefined  && data !== undefined ?
		<div className="container my-5 py-5">
			<div className="shadow rounded-lg d-block d-sm-flex">
				<div className="profile-tab-nav border-right">
					<div className="p-4 perfil-img">
						<h4 className="text-center"></h4>
					</div>
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                 { array.map((el)=>
                    <button className="nav-link active" id="account-tab" data-toggle="pill"  role="tab" aria-controls="account" aria-selected="true" onClick={e=>cambio(e,el)} value={el.id} >
                    <i className="fa fa-home text-center mr-1"></i> 
                    {el.nombre}
                      </button>
                  ) }
                </div>
      </div>
            <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
              <div>
            {array &&
              <div className=" ancho altura">

        
                          <div className="container   " ref={pdfRef}> 
                                    <div className='d-flex justify-content-between my-5' >
                                        <div className='w-25'>
                                              <label>Nombre completo</label>
                                              <input className='form-control ' onChange={e=>setNombre(e.target.value)} placeholder="Escriba el nombre de la persona"/>
                                        </div>
                                          <div className='w-25'>
                                                     <label>Costo</label>
                                                    <input className='form-control ' type={"number"} onChange={e=>setSueldo(e.target.value)} placeholder="Escriba el costo"/>
                                        </div>
                                        <div className='w-25'>
                                              <label>Área</label>
                                              <input className='form-control ' onChange={e=>setArea(e.target.value)} placeholder="Escriba el área de ingreso"/>
                                        </div>
                                  </div>

                                  <table className="tabla table-bordered">
                                      <thead>
                                          <tr >
                                            <th className="text-center py-3"  colspan="1">Factores</th>
                                            <th className="text-center py-3"  colspan="1">Detalle</th>
                                            <th className="text-center py-3"  colspan="1">Total</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                             {data.map((respuesta)=>
                                                    <>
                                                      <tr className="fila-principal" key={respuesta.id}>
                                                          <td>{respuesta.nombre}</td>
                                                                  {respuesta.elegir === "no" ?
                                                            <td className="text-center">
                                                                    <select name={respuesta.id} onChange={e=>subida(e,respuesta)}  className="text-center"  colspan="1">
                                                                          <option value=""></option>
                                                                          <option value="Si">Si</option>
                                                                          <option value="No">No</option>
                                                                      </select>
                                                            </td>:
                                                            <td className="text-center"  colspan="1">
                                                                    <select name={respuesta.id} onChange={e=>subida(e,respuesta)}  className="text-center">
                                                                        <option value=""></option>
                                                                          {respuesta.numeros.map((info)=>
                                                                          <option value={info.id}>{info.nombre}</option>
                                                                          )}
                                                                    </select>
                                                            </td>
                                                          }
                                                      
                                                            {currency(confirmacion(respuesta,data,dolar,sueldo)) === "$NaN" ?
                                                            <td className='totales text-center  col-2'>$0.00 </td>:
                                                            <td className='totales text-center  col-2'>{currency(confirmacion(respuesta,data,dolar,sueldo))} </td> }
                                                            <td className="w-25" colSpan={1}><button onClick={e=>si(e)} className="btn w-100">Ver mas</button></td>
                                                      </tr>
                                                        <tr className="subtabla">
                                                            <td colspan="6">
                                                                <table className="tabla mini-tabla">
                                                                    <thead>
                                                                      
                                                                        <tr>
                                                                            <th className="text-center col-3">Descripción</th>
                                                                            <th className="text-center col-2">Precio</th>
                                                                            <th className="text-center col-2">Moneda</th>
                                                                            <th className="text-center col-2">Tipo de cambio</th>
                                                                            <th className="text-center col-2">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                      {respuesta.numeros.map((info)=>
                                                                        <tr>
                                                                          { info.cantHora !== undefined ?
                                                                            <td className="col-3">{info.nombre} ({info.cantHora} horas) </td>:
                                                                            <td className="col-3">{info.nombre}</td>}
                                                                          
                                                                            {info.metodo !== "porcentaje" ?
                                                                              <td className='text-center col-2'> {currency(info.precio)} </td>:
                                                                              <td className='text-center col-2'> {info.precio} %</td>
                                                                              }
                                                                            <td className='text-capitalize text-center col-2'>{ info.moneda} </td>
                                                                                    <td className='text-capitalize text-center col-2'>{billeton(info.dolar)} </td>
                                                                            <td className='text-capitalize text-center col-2'>{currency(billete(info.dolar , info.precio,info,dolar,sueldo))} </td>
                                                                        </tr>
                                                                      )}
                                                                        
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                      </>
                                              )}

                                                          <tr >
                                                              <td className='text-capitalize text-center' colspan="2">Extras:<strong>  { currency(final)}</strong> </td>
                                                              <td className='text-capitalize text-center' colspan="2">Total: <strong>  {currency(parseInt(final) + parseInt(sueldo))}</strong> </td>  
                                                          </tr>
                                      </tbody>
                                  </table>
                              </div>  

                  </div>
              }
           </div>
              
          <div className="w-100 d-flex justify-content-center">
              <button onClick={e=>pdf(pdfRef.current,nombre)} className="btn btn-danger w-25 d-flex justify-content-around"> Exportar en PDF <div className="w-25"><img src={pdfLogo} className="w-50" /></div> </button>
          </div>
        
        
        
          
              </div>
            </div>
          </div>:
          <div className="my-5 py-5 container shadow mt-5 text-center">
            Por el momento usted no ha creado ninguna calculadora, dirijase hacia el menu <strong>Configuración {">"} Luego presione el boton + de color verde, y configuralo a su gusto </strong>
          </div>
          }
     
	</section>
  );
}


