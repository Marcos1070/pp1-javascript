let cuenta = prompt("Ingrese el monto total de la cuenta: ")
cuenta = Number(cuenta)

let servicio = prompt("¿Que tal fue el servicio? (malo) (bueno) (excelente): ")

if (servicio == "malo"){

    cuenta = ((cuenta * 10) / 100) + cuenta
    alert("Debe pagar en total con propina: $" + cuenta)

}

if (servicio == "bueno"){

    cuenta = ((cuenta * 15) / 100) + cuenta
    alert("Debe pagar en total con propina: $" + cuenta)

}

if (servicio == "excelente"){

    cuenta = ((cuenta * 20) / 100) + cuenta
    alert("Debe pagar en total con propina: $" + cuenta)

}

