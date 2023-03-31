import {  useState } from "react"
import { InfoGeneral } from "./InfoGeneral";
import {  BsCheckLg, BsTrash } from "react-icons/bs"

export const FormularioNuevo =({caracteres,info, aceptar, setCambios, setInfo, errores , modelo,subida,setModelo,nombre,cambiarNombre})=>{
    const [input, setInput] = useState([])

 const handleInputChange = (e,opciones, questions)=>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
   if(questions.options[opciones.id].modo !== "preguntar"){
    if(target.type === 'checkbox' ){
        questions.options[opciones.id].isCorrect=value
    }else{
        questions.options[opciones.id].text=value
    }
   }else{
    questions.options[opciones.id].isCorrect=value
   }
    setInfo({...info})

}
const handleInputFija = (e,opciones)=>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    opciones.fija = value
    setInfo({...info})
}
const borrarTitulo = (e,questions)=>{
const si = info.questions.filter(el=>el.id !== questions.id)
info.questions= si
setInfo({...info})

}
const handleInputChangeTitulo = (e, questions)=>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
        questions.text=value
        setInfo({...info})
} 
const handleInputChangePonderacion = (e,questions)=>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
        questions.poderacion=value
        setInfo({...info})
} 
const agregar = (e, questions)=>{
    if(e.target.value !== "checkbox"){
        questions.options.push({id:questions.options.length , text:"", isCorrect:false, modo:"preguntar"})
        setInfo({...info})
    }else{
        questions.options.push({id:questions.options.length , text:"", isCorrect:false})
        setInfo({...info})
    }

} 
const EliminarRespuesta = (e, questions,respuesta)=>{
    const si = respuesta.options.filter(el=>el.id !== questions.id)
for (let i in info.questions){
    if(info.questions[i].id === respuesta.id){
        for (let j in info.questions[i].options){
        if(info.questions[i].options[j].id === questions.id){
            info.questions[i].options = si
        }}
    }
}
setInfo({...info})
} 
const agregarPregunta = (e)=>{
    info.questions.push({id:info.questions.length, text:"", options:[], fija:false})
    setInfo({...info})
} 
const confirmar = (e)=>{
    for (let i in info.questions){
        info.questions[i].id=parseInt(i)
            for (let j in info.questions[i].options){
                info.questions[i].options[j].id= parseInt(j)
            }
    }
    setInfo({...info}) 
    setCambios(false)
} 

    return(  

            <div >
            <InfoGeneral caracteres={caracteres} info={info} setInfo={setInfo} nombre={nombre} cambiarNombre={cambiarNombre} subida={subida} modelo={modelo} setModelo={setModelo}/>
            <div class="flex-column  container " >
              
          {info &&
            <>         
                     {info.questions.map((respuesta)=>
                     <>       
                        <div  className="div-plantilla-form mt-4 container"  key={respuesta.id} >
                               
                               <h5 className="titulo-parrafo-formulario"> {respuesta.id + 1 } .   <input 
                                          type="text" 
                                          placeholder={respuesta.text} 
                                          className="input-formulario" 
                                          onChange={e=>handleInputChangeTitulo(e,respuesta)} 
                                          name={respuesta.id}
                                          />
                                          {info.evaluar === "distinta" &&
                                            <input 
                                            className="input-puntaje"
                                            type="number" 
                                            onChange={e=>handleInputChangePonderacion(e,respuesta)} 
                                            placeholder="Puntaje"
                                                              />
                                          }
                                                 
                                           <button onClick={e=>borrarTitulo(e,respuesta)} className="btn"><BsTrash /></button>               <div className="d-flex flex-row">
                                           <input type="checkbox" 
                                                                    className="check"
                                                                    checked={respuesta.fija}
                                                                    value={input}
                                                                    onChange={e=>handleInputFija(e,respuesta)} 
                                                                    />
                                                                    <p>Pin questions</p>
                                           </div></h5>
                                          
                                    {respuesta.options.map((opciones)=>
                                       <>
                                      {opciones.modo !== "preguntar" ? 
                                       <div className="item ">
                                       <input 
                                          type="text" 
                                          placeholder={opciones.text} 
                                          className="form-control" 
                                          onChange={e=>handleInputChange(e,opciones,respuesta)} 
                                          name={opciones.id}
                                          />
                                        
                                           <div className=" columnas-editar-respuestas">
                                              
                                           <input type="checkbox" 
                                                                    className="check"
                                                                    checked={opciones.isCorrect}
                                                                    value={input}
                                                                    id={opciones.id}
                                                                    onChange={e=>handleInputChange(e,opciones,respuesta)} 
                                                                    />
                                                           
                                                          {opciones.isCorrect===true &&    
                                                           <div className="color-check" >
                                                        
                                                    <BsCheckLg /> 
                                                            </div>
                                                            }
                                          
                                                    
                                             </div>
                                           
                                             <button onClick={e=>EliminarRespuesta(e,opciones,respuesta)} className="btn"><BsTrash /></button>  
                                         </div>:
                                                               <div className="item ">
                                                               <input 
                                                                  type="text" 
                                                                  placeholder={opciones.text} 
                                                                  className="form-control" 
                                                                  onChange={e=>handleInputChange(e,opciones,respuesta)} 
                                                                  name={opciones.id}
                                                                  />
                                                                  <button onClick={e=>EliminarRespuesta(e,opciones,respuesta)} className="btn"><BsTrash /></button>  
                                                                 </div>
                                       }
                                             </>
                                      ) } 
                                              <div className="d-flex flex-row justify-content-evenly  mt-5 w-75">
          
                                              <button onClick={e=>agregar(e,respuesta)} value={"checkbox"} className="w-25 btn  boton-ml ">Add option</button>  
                                              <button onClick={e=>agregar(e,respuesta)} value={"valor"} className="w-25 btn  boton-ml ">Add answer</button>  
                                      </div>
          
                                     
                          </div>
                          
                                       </>
                                       
                         )} 
           
                       </>
                       }
                       <div className="d-flex flex-column justify-content-around mt-5 ">
                         <button onClick={e=>agregarPregunta(e)} className="w-25 btn  boton-ml botoncito">Add questions</button> 
                         <div className="d-flex flex-row justify-content-around mt-5 ">
          
                   <button onClick={e=>confirmar(e)} className="w-25 btn  boton-ml">Preview</button> 
                   <button onClick={e=>aceptar(e)} className="w-25 btn  boton-ml">Confirm</button> 
                   </div>
                   </div>
                   <div>
                  <h5 className={`${errores.erroneo !== "" ? 'texto-erroneo' : 'texto-exitoso'}`}>{errores.erroneo !== "" ? errores.erroneo: errores.exito}</h5>
                  </div>
                   </div>
                 
                   </div>
            
          )
          }