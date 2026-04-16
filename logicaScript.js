

function verificarSeleccion() {
    var seleccion = document.getElementById("tipo_valor").value;
    var campoUnico = document.getElementById("bloque_condicion_unico");
    var campoRango = document.getElementById("bloque_condicion_rango");

    if (seleccion === "unico") {
        campoUnico.style.display = "block";
        campoRango.style.display = "none";
    }

    if (seleccion === "rango") {
        campoRango.style.display = "block";
        campoUnico.style.display = "none";
    }
}

function ValidacionIntervalos() {
    let erroresMinimos = Number(document.getElementById("errores_minimos").value);
    let erroresMaximos = Number(document.getElementById("errores_maximos").value);

    document.getElementById("error").textContent = "";
    if (erroresMinimos > erroresMaximos) {

        document.getElementById("salida").textContent = "";
        document.getElementById("error").textContent = "El valor mínimo no puede ser mayor que el valor máximo."; 
            

        return false;
    }
    return true;
}


function factorial(n) {
  if (n < 0) return undefined; 
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

function CalcularPoisson(i){
    let promedio = 2;
    let poison = ((Math.E **(-promedio)  * (promedio ** i))/factorial(i))
    return poison;
}

function ValidarEntrada(idCampo) {
    let errores = document.getElementById(idCampo).value;   
    let numero = Number(errores);
    document.getElementById("error").textContent = "";

    if (
    errores === "" ||
    !Number.isInteger(numero) ||
    numero < 0
) {
    document.getElementById("salida").textContent = "";
    document.getElementById("error").textContent = "Ingresa un número entero mayor o igual a 0.";
    return false;

}
    return true;
}

function CondicionPoissonUnico(condicion, num_errores) {
let suma= 0;

       switch (condicion) {
            case "exactamente":
                let probabilidad = CalcularPoisson(num_errores);
                probabilidad = Number(probabilidad.toFixed(4));
                return probabilidad;
                break;

            case "al_menos":
                if (num_errores === 0) {
                 return 1;
}
                if (num_errores >= 1) {
                    
                    for (let i = 0; i < num_errores; i++) {
                        let probabilidad = CalcularPoisson(i);
                        suma += probabilidad;
                    }
                    suma = 1 - suma;
                    suma = Number(suma.toFixed(4)); 
                }
                return suma;
                break;
            case "a_lo_mas":
                for (let i = 0; i <= num_errores; i++) {
                    let probabilidad = CalcularPoisson(i);
                    suma += probabilidad;
                }
                suma = Number(suma.toFixed(4));
                return suma;
                break;
            
                case "mas_de":
                    if (num_errores >= 0) {
                        for (let i = 0; i <= num_errores; i++) {
                            let probabilidad = CalcularPoisson(i);
                            suma += probabilidad;
                        } 
                        suma = 1 - suma;
                        suma = Number(suma.toFixed(4));
                        return suma;
                    }
                    break;
                case "menos_de":
                    for (let i = 0; i < num_errores; i++) {
                        let probabilidad = CalcularPoisson(i);
                        suma += probabilidad;
                    }
                    suma = Number(suma.toFixed(4));
                    return suma;
                
       }

}

function CondicionPoissonRango(errores_minimos,errores_maximos) {
    let suma = 0;
    
    for (let i = errores_minimos; i <= errores_maximos; i++) {
        let probabilidad = CalcularPoisson(i);
        suma += probabilidad;
    }  
    suma = Number(suma.toFixed(4));
    return suma;      

}


function Calcular_probabilidad() {
    let seleccion = document.getElementById("tipo_valor").value;

   if (seleccion === "unico") {
       let num_errores = Number(document.getElementById("errores").value);
       let condicion = document.getElementById("cond_unico").value;

        if (!ValidarEntrada("errores")) {
            return false;
        }else{
        let probabilidad = CondicionPoissonUnico(condicion, num_errores);
            document.getElementById("salida").textContent = (probabilidad*100).toFixed(2) + "%"  ;
        }
   }
   else if (seleccion === "rango") {
    let num_errores_min = Number(document.getElementById("errores_minimos").value);
    let num_errores_max = Number(document.getElementById("errores_maximos").value);

    if (!ValidarEntrada("errores_minimos") || !ValidarEntrada("errores_maximos") || !ValidacionIntervalos()) {
        return false;
    }

    let probabilidad = CondicionPoissonRango(num_errores_min,num_errores_max);
    document.getElementById("salida").textContent = (probabilidad*100).toFixed(2) + "%"  ;


    }
}

