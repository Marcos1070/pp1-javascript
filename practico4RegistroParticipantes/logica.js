//esto busca y guarda en variables los elementos del html mediante su id
const input = document.getElementById("participante"); 
const lista = document.getElementById("listaParticipantes");
const botonAgregar = document.getElementById("botonAgregar") 

//input representa el campo de texto donde se escribe el nombre
//lista es el <ul> donde se agregaran los participantes
//botonAgregar es el boton que el usuario hace clic para agregar un nuevo participante

botonAgregar.addEventListener("click", () => { //este codigo se ejecuta cuando el usuario haga click en el boton agregarparticipante
    const nombre = input.value.trim(); //input.value toma el texto que el usuario escribio. trim() elimina los espacios al principio o al final

    if (nombre === "") return //si el campo esta vacio, el codigo se detiene y no agrega nada


    const li = document.createElement("li"); //crea un nuevo <li> en memoria
    li.textContent = nombre; //le pone como texto el nombre del participante


    const botonPresente = document.createElement("button"); // crea el boton de presente
    botonPresente.textContent = "Presente"; //lo que dice dentro del boton
    botonPresente.addEventListener("click", () => { // cuando hace click usa .classlist.toggle("presente") para agregar o quitar la clase css presente
        li.classList.toggle("presente");
    });

    const botonEliminar = document.createElement("button"); //creacion del boton
    botonEliminar.textContent = "❌"; //aparece un cruz en el boton
    botonEliminar.addEventListener("click", () => { //cuando se hace click elimina todo el <li> de la lista
        lista.removeChild(li);
    });

    //se inserta todo en la lista, se agregan primero los botones y luego el li completo en pantalla
    li.appendChild(botonPresente);
    li.appendChild(botonEliminar);
    lista.appendChild(li);

    input.value = ""; //despues de agregar el participante, borra el campo de texto para que el usuario pueda escribir otro nombre

});