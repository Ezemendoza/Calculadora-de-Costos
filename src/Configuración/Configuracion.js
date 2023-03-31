
import { collection, where,query, getDocs, addDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import { db } from "../Database/database"
import { EditarFormulario } from "./EditarFormularios"
import { BsTrash } from "react-icons/bs"

export const Configuracion =()=>{

    const [loading, setLoading]=useState(true)
      const [info, setInfo]=useState()
      const [array, setArray] =useState()
      const [nombre, setNombre]=useState()
      const [id,setId]=useState()
      const {idioma}=useContext(Context)
         useEffect(()=>{
               const evaluaciones= collection(db, "calculadora")
               const q = query(evaluaciones, where("creado", "==", idioma.email))
            getDocs(q)
            .then((resp)=>{
              const newItem= resp.docs.map((el)=>{
                return{
                  id:el.id,
                  ...el.data()
                }
              })
                setArray(newItem)
                setInfo(newItem[0].form)
                setNombre(newItem[0].nombre)
                setId(newItem[0].id)
                setTimeout(() => {
                          const si = document.getElementsByClassName("nav-link")
                for(let i in si){
                  if(si[i].value !== newItem[0].id){
                  if(si[i].classList[1] === "active"){
                    si[i].classList.remove("active")
                  }
                  }
                }
                }, 100);
  
            }).finally((
              setLoading(false)
            ))
                           
      },[])

      const nuevo=async ()=>{
           const docRef = await addDoc(collection(db, "calculadora"), {
  nombre:"Nueva calculadora",
    form:[{id:array.length + 1, nombre:"", numeros:[], moneda:"", elegir:"", valor:"No"}],
    creado:idioma.email
                }).then((resp)=>{
                  array.push({ nombre:"Nueva calculadora",
                                         form:[{id:array.length, nombre:"", numeros:[], moneda:"", elegir:"", valor:"No"}], id:resp.id,creado:idioma.email})
                    setArray([...array])
                    setInfo({info})
						})
						}

return (
        <>
            {loading === false &&
            <>
            {array !== undefined ?
        <EditarFormulario info={info} setInfo={setInfo} array={array} setNombre={setNombre} nombre={nombre} setArray={setArray} id={id} setId={setId} />:
        <div className="container">
          <div className="shadow rounded-lg d-block d-sm-flex">
            <div className="profile-tab-nav border-right">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <div className="d-flex justify-content-around ">     
                  <button className="mt-5 btn btn-success w-100 " title="Agregar calculadora" onClick={e=>nuevo()}>   + </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        }

            </>
            
            }
        </>
)


}