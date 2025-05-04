let peso = prompt("Ingrese su peso en kilos: ")
let altura = prompt("Ingrese su altura en metros: ")

peso = Number(peso)
altura = Number(altura)

imc = peso / (altura * altura)

if (imc < 18.5){

    alert("Bajo peso")

}

if (imc >= 18.5 && imc <= 24.9){

    alert("Peso normal")

}

if (imc >= 25 && imc <= 29.9){

    alert("Sobrepeso")

}

if (imc >= 30){

    alert("Obesidad")

}