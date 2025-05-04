usuario = "Marcos1070"
contraseña = "nico1070"

ingreseUsuario = prompt("Ingrese su usuario: ")


if (ingreseUsuario === usuario){

    ingreseContraseña = prompt("Ingrese la contraseña: ")
    if (ingreseContraseña === contraseña) {

        alert("¡Bienvenido!")

    }else{

        alert("Contraseña incorrecta")

    }

} else{

    alert("Usuario incorrecto")

}

