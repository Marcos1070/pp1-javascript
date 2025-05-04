let edad = prompt("Por favor, ingresa tu edad: ") // lo ingresado aca siempre es una cadena de texto (string)
edad = Number(edad)  // convierte el valor de edad en numerico

if (edad < 5 || edad > 80){

    alert("La entrada es gratuita")

}else if (edad < 13){

    alert("La entrada es $1000")

}else if (edad >= 13 && edad <= 17){

    alert("La entrada es de $1500")

}else if (edad > 17){

    alert("La entrada es de $2000")

}



