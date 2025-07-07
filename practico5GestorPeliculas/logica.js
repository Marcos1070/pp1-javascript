// DOM
const input = document.getElementById("pelicula");
const lista = document.getElementById("listaPeliculas");
const botonAgregar = document.getElementById("botonAgregar");
const botonVerTodas = document.getElementById("botonVerTodas");
const inputPosicion = document.getElementById("posicion");
const botonEliminar = document.getElementById("botonEliminar");
const botonNumeradas = document.getElementById("botonNumeradas");
const botonOrdenar = document.getElementById("botonOrdenar");
const generoSelect = document.getElementById("genero");


let peliculas = [];


botonAgregar.addEventListener("click", () => {
    const nombre = input.value.trim();   //const nombre = : guarda ese valor limpio en una variable llamada nombre / input.value: obtiene el texto que escribió el usuario en el campo <input id="pelicula"> / .trim(): elimina los espacios en blanco al principio y al final del texto
    const genero = generoSelect.value;   //const genero = : guarda ese valor en una variable llamada genero / generoSelect es la referencia al <select id="genero"> / .value devuelve el valor actual del option seleccionado por el usuario (por ejemplo: "Accion" o "Comedia")

    //validar que no este vacio
    if (nombre === "") {
        alert("Ingrese el nombre de la pelicula");
        return;
    }

    //validar que no este repetida
    if (peliculas.some(p => p.nombre === nombre)) {
        alert("La pelicula ya fue agregada");
        return;
    }

    //agregar al array
    peliculas.push({nombre, genero});

    //limpiar campo
    input.value = "";

    generoSelect.selectedIndex = 0;

    //actualizar la lista en pantalla
    renderizarLista();




});


botonVerTodas.addEventListener("click", () => {

    renderizarLista(); // vuelve a mostrar la lista

});


botonEliminar.addEventListener("click", () => {

    const index = parseInt(inputPosicion.value) - 1;

    if (isNaN(index) || index < 0 || index >= peliculas.length) {
        alert("Posicion invalida");
        return;

    }

    peliculas.splice(index, 1);

    inputPosicion.value = ""; 

    renderizarLista();

});


botonNumeradas.addEventListener("click", () => {

    if (peliculas.length === 0) {
        alert("No hay peliculas en la lista");
        return;
    }

    const numeradas = peliculas.map((pelicula, index) => `${index + 1}. ${pelicula.nombre} (${pelicula.genero})`); 

    alert("Peliculas numeradas:\n" + numeradas.join("\n"));

});


botonOrdenar.addEventListener("click", () => {

    peliculas.sort((a,b) => a.nombre.localeCompare(b.nombre));
    renderizarLista();

});

//funcion para mostrar las peliculas en pantalla
function renderizarLista() {
    //limpiar la loista actual
    lista.innerHTML = "";

    //recorrer el array y crear elementos
    peliculas.forEach((pelicula, index) => {
        const li = document.createElement("li");
        li.textContent = `${pelicula.nombre} (${pelicula.genero})`;
        
        //boton editar
        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", () => {

            const nuevoNombre = prompt("Nuevo nombre de la pelicula: ");
            if (nuevoNombre && nuevoNombre.trim() !== "") {

                peliculas[index].nombre = nuevoNombre.trim();
                renderizarLista();

            }

        });

        li.appendChild(botonEditar);
        lista.appendChild(li);

    });

//mostrar la cantidad total:
document.getElementById("contadorPeliculas").textContent =
    `total de peliculas: ${peliculas.length}`;


}





