
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { BsTrash,  BsXCircleFill } from "react-icons/bs";
import { db } from "../Database/database";
import "./form.css"
import { capitalize } from "../Funciones/Funciones";

export const TablaFormulario =({caracteres, info, id, setInfo, array ,setNombre, nombre})=>{
const [errores,setErorres]=useState({error:"",exito:""})

const handleInputChange = (e,opciones, questions)=>{

           const target = e.target;
     const si = questions.numeros.filter(el=>el.id=== opciones.id)
               if(si[0].moneda === "pesos"){
                if(si[0].dolar){
                    delete si[0]["dolar"];
                }
               }
               if(si[0].metodo === "fijo" || si[0].metodo === "porcentaje"){
                if(si[0].cantHora){
                    delete si[0]["cantHora"];
                }
               }
     si[0][target.name]= target.value

        setInfo([...info])
    }


const borrarTitulo = (e,questions)=>{
const si = info.filter(el=>el.id !== questions.id)
setInfo(si)

}
const handleInputChangeTitulo = (e, questions)=>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

        questions[e.target.name]=value

        setInfo([...info])
} 
const agregar = (e, questions)=>{
questions.numeros.push({id:questions.numeros.length  + 1, nombre:"", precio:""})
setInfo([...info])
} 

const EliminarRespuesta = (e, questions,respuesta)=>{
    const si = respuesta.numeros.filter(el=>el.id !== questions.id)
    for(let i in si){
    si[i].id=i
}
for (let i in info){
    if(info[i].id === respuesta.id){
    info[i].numeros=si
    }
}

setInfo([...info])

}
const agregarPregunta = (e)=>{
    info.push({id:info.length, nombre:"", numeros:[], moneda:"", elegir:"", valor:"No"})
    setInfo([...info])
} 
   const si = array.filter(el=>el.id === id)

const confirmar = (info)=>{
for(let i in info){
    if(info[i].id !== undefined){
   info[i].id= parseInt(i)
    for(let k in info[i].numeros){
        if(info[i].numeros[k].id ){
            info[i].numeros[k].id=parseInt(k)
        }
       
    }
    }
}
    info.nombre = nombre 
	const washingtonRef =   doc(db, "calculadora",id);
					updateDoc(washingtonRef, {
				form:info,
                nombre:nombre
							})
            setErorres({erroneo:"", exito:"Actualizado correctamente"})
            setTimeout(()=>{
                setErorres({erroneo:"", exito:""})
              }, 3000)
} 



    return(  
        <div>
    {info &&
  <div className="ancho">

       
  <label>Nombre de la calculadora</label>
  <input className="form-control py-3" value={nombre} onChange={e=>setNombre(e.target.value)}/>
           {info.map((respuesta)=>
           <>       
              <div  className=" mt-4 container "  key={respuesta.id} >
                     
                   
                          <div className="col-md-12 d-flex">
						
                                     <input 
                                type="text" 
                                value={respuesta.nombre} 
                                className="form-control w-75 py-3" 
                                onChange={e=>handleInputChangeTitulo(e,respuesta)} 
                                name={"nombre"}
                                />
                                      <div className="form-group w-auto">
                                        {respuesta.elegir !== undefined ?
                                                <select className="form-select py-3" name="elegir"    onChange={e=>handleInputChangeTitulo(e,respuesta)}  >
                                                                <option value={respuesta.elegir}>{ capitalize(respuesta.elegir, "elegir")} </option>
                                                                <option value={"si"}>Elegir opción</option>
                                                                <option value={"no"}>No elegir</option>
                                         </select>:
                                                                    <select className="form-select py-3" name="elegir"    onChange={e=>handleInputChangeTitulo(e,respuesta)}  >
                                                                <option value={""}></option>
                                                                <option value={"si"}>Elegir opción</option>
                                                                <option value={"no"}>No elegir</option>
                                                            </select>
                                    }
                                                          
                                                     </div>
                                                     
									   <button onClick={e=>borrarTitulo(e,respuesta)} className="btn"><BsXCircleFill/></button>    
							</div>
                              
                                
                                                     
                                
                          {respuesta.numeros.map((opciones)=>
                             <>
                       
                                                     <div className="d-flex mt-2" key={respuesta.id}>
                                                     <input 
                                                        type="text" 
                                                        value={opciones.nombre} 
                                                        className="form-control w-auto" 
                                                        onChange={e=>handleInputChange(e,opciones,respuesta)} 
                                                        name={"nombre"}
                                                        />
                                                         <input 
                                                        type="number" 
                                                        value={opciones.precio} 
                                                        className="form-control w-auto" 
                                                        onChange={e=>handleInputChange(e,opciones,respuesta)} 
                                                        name={"precio"}
                                                        />
                                                        <div className="form-group w-auto">
                                                  
                                                         {opciones.moneda !== undefined ?
                                                           <select className="form-select" name="moneda"  onChange={e=>handleInputChange(e,opciones,respuesta)} placeholder="Coloque cantidad de horas"  >
                                                                <option  value={opciones.moneda} >{capitalize(opciones.moneda)} </option>
                                                                <option value={"dolar"}>Dolar</option>
                                                                <option value={"pesos"}>Pesos</option>
                                    
                                                            </select>: 
                                                              <select className="form-select" name="moneda"  onChange={e=>handleInputChange(e,opciones,respuesta)} placeholder="Coloque cantidad de horas"  >
                                                                <option value={""}></option>
                                                                <option value={"dolar"}>Dolar</option>
                                                                <option value={"pesos"}>Pesos</option>
                                         
                                                            </select>
                                                        }
                                                          
                                                     </div>
                                                 
                                                    {opciones.moneda == "dolar" &&
                                                    <div className="form-group w-auto">
                                                        {opciones.dolar !== undefined ?
                                                            <select className="form-select" name="dolar" onChange={e=>handleInputChange(e,opciones,respuesta)} >
                                                                <option value={opciones.dolar}>{capitalize(opciones.dolar, opciones.moneda)} </option>
                                                                <option value={"dolarOficial"}>Dolar Oficial</option>
                                                                <option value={"dolarBlue"}>Dolar Blue</option>
                                                                <option value={"dolarBolsa"}>Dolar Bolsa</option>
                                                                <option value={"dolarMep"}>Dolar MEP</option>
                                                            </select>:

                                                            <select className="form-select" name="dolar" onChange={e=>handleInputChange(e,opciones,respuesta)} >
                                                                <option value={""}></option>
                                                                <option value={"dolarOficial"}>Dolar Oficial</option>
                                                                <option value={"dolarBlue"}>Dolar Blue</option>
                                                                <option value={"dolarBolsa"}>Dolar Bolsa</option>
                                                                <option value={"dolarMep"}>Dolar MEP</option>
                                                            </select>}
                                                    </div>
                                                    }
                                                             <div className="form-group w-auto">
                                                                {opciones.metodo !== undefined ?
                                                                  <select className="form-select" name="metodo"  onChange={e=>handleInputChange(e,opciones,respuesta)} >
                                                                <option value={opciones.metodo}>{capitalize(opciones.metodo)} </option>
                                                                <option value={"porcentaje"}>Porcentaje</option>
                                                                <option value={"fijo"}>Monto fijo</option>
                                                                <option value={"hora"}>Por hora</option>
                                                            </select>:
                                                              <select className="form-select" name="metodo"  onChange={e=>handleInputChange(e,opciones,respuesta)} >
                                                                <option value={""}></option>
                                                                <option value={"porcentaje"}>Porcentaje</option>
                                                                <option value={"fijo"}>Monto fijo</option>
                                                                <option value={"hora"}>Por hora</option>
                                                            </select>
                                                            
                                                            }
                                                      
                                                     </div>
                                                      {opciones.metodo == "hora" &&
                                                    <div className="form-group w-auto">
                                                            <input 
                                                        type="number" 
                                                        value={opciones.cantHora} 
                                                        className="form-control w-auto" 
                                                        onChange={e=>handleInputChange(e,opciones,respuesta)} 
                                                        name={"cantHora"}
                                                        />
                                                    </div>
                                          
                                                    }


                                                        <button onClick={e=>EliminarRespuesta(e,opciones,respuesta)} className="btn"><BsTrash /></button>  
                                                       </div>
                             
                                
                                      </>
                               ) } 
                                 <div className="d-flex flex-row justify-content-evenly  mt-5 w-75">

                    <button onClick={e=>agregar(e,respuesta)} value={"checkbox"} className="w-25 btn btn-primary ">Agregar item</button>  
                    </div>  
                           
                </div>
                
                             </>
                             
               )}
        
         <div className="d-flex flex-row justify-content-evenly py-5 w-75 ">
         <button onClick={e=>agregarPregunta(e)} className="w-25 btn  btn-primary">Agregar opción</button> 
         <button onClick={e=>confirmar(info)} className="w-25 btn  btn-primary">Confirmar</button> 
         
             {errores.exito !== "" && <p className="text-white copiar"> {errores.exito}</p>}

         </div> 
   


  
         </div>
       }

         </div>

)
}