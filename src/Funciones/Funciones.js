import jsPDF from "jspdf"
import fondo from "../Imagenes/mini-fondo.png"

export const capitalize=(valor, dolar)=>{
if(dolar === "dolar"){
    return(valor.charAt(0).toUpperCase() +valor.slice(1,5)+ " "+  valor.slice(5) )
}else if(dolar === "elegir"){
    if(valor === "si"){
        return "Elegir opción"
    }else{
        return "No elegir"
    }
}else{
return (valor.charAt(0).toUpperCase() +valor.slice(1) )
}

}

export const billeton =(dolares)=>{
if(dolares === "dolarOficial"){
   return "Dolar Oficial"
  }else if(dolares === "dolarMep"){
   return "Dolar MEP"
  }else if(dolares=== "dolarBlue"){
    return "Dolar Blue"
  }else if(dolares=== "dolarBolsa"){
    return "Dolar CCL"
  }
}

export const billete=(dolares, valor,info,dolar,sueldo)=>{
  if(dolares === "dolarOficial"){
    for(let i in dolar){
      if(dolar[i].nombre === "Dolar Oficial"){
        return parseInt(dolar[i].venta) * valor
      }
    }
  }else if(dolares === "dolarMep"){
  for(let i in dolar){
      if(dolar[i].nombre === "Dolar Bolsa"){
        return parseInt(dolar[i].venta) * valor
      }
    }
  }else if(dolares=== "dolarBlue"){
 for(let i in dolar){
      if(dolar[i].nombre === "Dolar Blue"){
        return parseInt(dolar[i].venta) * valor
      }
    }

  }else if(dolares=== "dolarBolsa"){
 for(let i in dolar){
      if(dolar[i].nombre === "Dolar Contado con Liqui"){
        return parseInt(dolar[i].venta) * valor
      }
    }

  } 
  else if (info.cantHora !== undefined) {
   return (parseInt(info.cantHora) * parseInt(info.precio)) 
   

  }else{
    if(info.metodo === "fijo"){
      return parseInt(valor)
    }else{
      return (parseInt(sueldo) * info.precio) /100
    }
  }
}

export const confirmacion =(respuesta, data,dolar,sueldo)=>{
  
    const si = data.filter((el)=>el.id === respuesta.id) 

    if(si.length > 0){
      if(si[0].elegir==="si" || si[0].valor === "Si"  ){
        return datos(respuesta,data,dolar,sueldo)
      }else if(si[0].valor === "No"){
       return 0
      } 
    }
     
}


const datos=(respuestas,data,dolar,sueldo)=>{
  let numero = 0
  if(respuestas.elegir === "no"){
    if(respuestas.funcion === "Sumar"){
            for(let i in respuestas.numeros){
              numero += billete(respuestas.numeros[i].dolar, respuestas.numeros[i].precio, respuestas.numeros[i],dolar,sueldo)
            }
            return numero
    }else{
            for(let i in respuestas.numeros){
              if(respuestas.numeros[i].metodo=== "hora"){
                       numero += respuestas.numeros[i].precio * respuestas.numeros[i].cantHora
              }else if( respuestas.numeros[i].metodo === "fijo"){
                        numero += billete(respuestas.numeros[i].dolar, respuestas.numeros[i].precio, respuestas.numeros[i],dolar,sueldo)
              }else{
                        numero += (sueldo * respuestas.numeros[i].precio) / 100
              }
          
              }
              return numero
    }
  }else{
    if(data.length >0){
       const si =data.filter(el=>el.id === respuestas.id)
       if(si.length>0){
          for(let i in respuestas.numeros){
            if(respuestas.numeros[i].metodo == "porcentaje"){
                if(respuestas.numeros[i].id == si[0].valor){
                      return       (sueldo * respuestas.numeros[i].precio) / 100
                    }        
            
            }else{
                if(respuestas.numeros[i].id == si[0].valor){
                 return respuestas.numeros[i].precio 
          }  
            }
          
          }
       }

    }
  }
}

export const currency = function(number){
    return new Intl.NumberFormat('ja-JP', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
};

export const pdf=(pdf,nombre)=>{
  const docu = new jsPDF();
  docu.html( pdf, {
    callback:function (docu) {
      const pageCount= docu.internal.getNumberOfPages()
      for(let i = 0; i<pageCount; i++){
       docu.addImage(fondo, 'JPEG', 12, 5);
      }
          docu.save(nombre);

    },
    autoPaging:"text",
    margin: [10, 0, 0 ,20],
    html2canvas: { scale: 0.20},
  })

    
}

export const si =()=>{
  let filasPrincipales = document.querySelectorAll('.fila-principal');
  filasPrincipales.forEach(function (fila) {
    fila.addEventListener('click', function () {
      var subtabla = this.nextElementSibling;
      subtabla.style.display = subtabla.style.display === 'none' ? 'table-row' : 'none';
    });
  });
}
