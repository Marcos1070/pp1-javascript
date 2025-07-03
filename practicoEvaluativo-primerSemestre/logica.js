const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const año = document.getElementById("añoPublicacion");
const genero = document.getElementById("genero");
const botonIngresar = document.getElementById("botonIngresar");
const botonOrdenar = document.getElementById("botonOrdenar");
let ordenarAscendente = true; //va a cambiar con cada click

//para la opcion de "otro" en genero
const generoInput = document.getElementById("generoOtro");

let librosInfo = [];

//cargar pagina y revisar si hay libros guardados
//LOCALSTORAGEE
const librosGuardados = localStorage.getItem("libros"); //localStorage.getItem("libros"): busca si ya hay libros guardados en el navegador, si encuentra algo lo devuelve como un string

if (librosGuardados) {

    librosInfo = JSON.parse(librosGuardados); //json.parse(librosGuardados) convierte ese texto a un arreglo de objetos (es una estructura de datos que permite almacenar multiples objetos dentro de una misma variable)
    const librosFiltrados = mostrarLibros();
    mostrarResumen(librosFiltrados);

}


//FUNCION DE MOSTRAR LIBROS
function mostrarLibros() {

    const tbody = document.querySelector("#tablaLibros tbody"); // querySelector("#tablaLibros tbody"): busca el <tbody> de la tabla donde se van a mostrar los libros.
    tbody.innerHTML = ""; //limpiar la tabla antes de volver a mostrar, para no duplicar filas


    //parte nueva para el filtro
    const textoBuscado = document.getElementById("filtroTitulo").value.toLowerCase();
    const generoSelecccionado = document.getElementById("filtroGenero").value;

    let librosFiltrados = librosInfo.filter(libro => {

        const coincideTitulo = libro.titulo.toLowerCase().includes(textoBuscado);
        const coincideGenero = generoSelecccionado === "todos" || libro.genero === generoSelecccionado;
        return coincideTitulo && coincideGenero;

    });


    //mensaje "no se encuentran resultados" del filtro
    if (librosFiltrados.length === 0) {

        const fila = document.createElement("tr");
        fila.innerHTML = `<td colspan="6">No se encontraron libros</td>`;
        tbody.appendChild(fila);
        return;

    }    

    librosFiltrados.sort((a, b) => {

        return ordenarAscendente ? a.año - b.año : b.año - a.año;

    });


    librosFiltrados.forEach((libro, index) => { // el forEach es un metodo que permite recorrer la lista, el primer elemento correponde al valor actual de la lista (en este caso cada objeto libro). luego va el index que se utiliza principalmente para numerar la fila correctamente, "<td>${index + 1}</td> como los indices arrancan en 0, al sumarle 1 se muestra un numero de fila: 1,2,3 etc. Tambien porque los botones editar y eliminar estan dentro de cada fila del libro, asique: <button onclick="editarLibro(${index})">Editar</button> esto llama a la funcion editarlibro(index), pasando la posicion del libro en la lista, para que sepamos cual modificar, si no se pasa index no se sabe que libro se refiere el boton que se clickeo, es como un id unico para identificar a los libros (editarLibro(1)) o (eliminarLibro(2))

        const fila = document.createElement("tr"); //forEach crea una nueva fila (<tr>) por cada libro, cada libro va a tener su propia fila en la tabla del html. este tr va a contener varias celdas (<td>), una para cada dato del libro


        // fila.innerHTML = ` esa linea arma todo el contenido html que va dentro de esa fila, usa template literals (`) para escribir esas lineas html con variables dentro (${}).
        // {index + 1}... muestran el numero de fila comanzando desde 1, las demas {libro. ...} muestran los datos ingresados por el usuario
        // despues se crea 2 botones por libro, dentro de la misma celda, cada boton tiene un onclickque llama a una funcion pasando el index actual
        // tbody.appenChild(fila); se agrega la fila construida al <tbody> de la tabla, asi el libro queda visible en pantalla, dentro de la tabla html 
        fila.innerHTML = `  
        
            <td>${index + 1}</td>

            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.año}</td>
            <td>${libro.genero}</td>



            <td>

                <button onclick="editarLibro(${index})">Editar</button>
                <button onclick="eliminarLibro(${index})">Eliminar</button>

            </td>

        `;

        tbody.appendChild(fila);

    });

    return librosFiltrados;

}


//FUNCION ELIMINAR LIBROS
function eliminarLibro(index) {

    // el confirm muestra una ventana de confirmacion
    if (confirm("¿Estas seguro de eliminar este libro?")) {

        //splice(index, 1) elimina 1 elemento en la posicion index de la lista
        librosInfo.splice(index, 1); 

        //actuliza el localStorage con la nueva lista / JSON.stringify() convirte la lista en texto
        localStorage.setItem("libros", JSON.stringify(librosInfo))

        mostrarLibros();
        mostrarResumen();
    }

}


//FUNCION PARA EDITAR LOS LIBROS
function editarLibro(index) {
    //accede al libro que corresponde al inidice recibido
    const libro = librosInfo[index];

    //genero seria un <select> que tiene varias opciones / genero.options devuelve una coleccion tipo htmlcollection (una lista de opciones), pero no es una lista real, por eso se usa el array.from() que convierte esa coleccion en una lista, para poder usar el .some o map mas facil
    const opciones = Array.from(genero.options);

    // .some recorre la lista de opciones y se fija si alguna opcion (opci.value) tiene un valor que sea igual al genero guardado en el libro
    if (opciones.some(opci => opci.value === libro.genero)) {

        // si el genero del libro esta en las opciones del <select> devuelve true
        // esto pormite diferenciar entre un genero ya existente o uno personalizado

        //esto se ejecuta si el genero si esta en el <select>
        genero.value = libro.genero; //selecciona el valor correcto en el menu desplegable
        generoInput.style.display = "none"; //asegura que el input adicional quede oculto, porque no hace falta mostrarlo
        generoInput.value = ""; //limpia ese input oculto por si el usuario habia editado antes otro libro con genero personalizado

    } else {

        genero.value = "otro"; //selecciona la opcion "otro" en el menu
        generoInput.style.display = "inline"; // muestra el campo de texto para que el usuario pueda ver y editar el genero personalizado
        generoInput.value = libro.genero; //rellena ese campo con el genero exacto guardado en el libro

    }

    // todo esto rellena el formulario con el titulo, autor y año del libro
    titulo.value = libro.titulo;
    autor.value = libro.autor;
    año.value = libro.año;

    // elimina el libro original de la lista librosInfo usando su indice
    librosInfo.splice(index, 1);

    //se actuliza localStorage con la lista modificada
    localStorage.setItem("libros", JSON.stringify(librosInfo));
    
    mostrarLibros();
    mostrarResumen();

}

//actualizar select con generos unicos
function actSelectGene() {

    //guardamos el valor actual del filtro del genero, asi cuando se actualiza no se resetea
    const selectGenero = document.getElementById("filtroGenero");
    const valorActual = selectGenero.value;

    //librosInfo.map() saca solo el campo "genero" de cada libro (map crea una nueva lista a partir de una lista ya existente, aplicando una funcion a cada uno de sus elementos)
    //new set elimina duplicados
    //... convierte el set a una lista normal. si hay 5 libros pero solo 3 generos distintos, te da esos 3 generos sin repetir
    const generosUnicos = [...new Set(librosInfo.map(libro => libro.genero))];

    //se borra todo lo que haya en el <select> y se vuelve a agregar la opcion d+por defecto: "Todos los generos"
    selectGenero.innerHTML = `<option value="todos">Todos los generos</option>`;

    //agrega una opcion por cada genero unico
    //se crea un <option> nuevo por cada genero
    //se lo agrega al <select> del filtro
    generosUnicos.forEach(genero => {

        const opcion = document.createElement("option");
        opcion.value = genero;
        opcion.textContent = genero;
        selectGenero.appendChild(opcion)

    });


    // esto evita que el filtro vuelva siempre a "todos los generos" despues de agregar o editar un libro
    //selectGenero.options es una coleccion
    //array.from() o [... ] lo convierte en lista 
    //.some() verifica si el valorActual aun existe en las nuevas opciones, si es asi vuelve a seleccionar ese valor
    if ([...selectGenero.options].some(opt => opt.value === valorActual)) {
        selectGenero.value = valorActual;
    }

}


//funcion para mostrar el resumen
function mostrarResumen(libros = librosInfo){

    const contenedor = document.getElementById("resumenEstadistico")

    if (libros.length === 0){

        contenedor.innerHTML = "<p>No hay libros registrados para mostrar estadísticas.</p>";
        return;

    }

    //total
    const total = librosInfo.length;

    //promedio del año
    const sumaAños = librosInfo.reduce((acum, libro) => acum + libro.año, 0);
    const promedio = Math.round(sumaAños / total);

    // libros despues del 2010
    const libroPosterior = librosInfo.filter(libro => libro.año > 2010).length;

    //libro mas antiguo
    const libroAntiguo = librosInfo.reduce((min, libro) => libro.año < min.año ? libro : min, librosInfo[0]);

    //libro mas reciente
    const libroReciente = librosInfo.reduce((max, libro) => libro.año > max.año ? libro : max, librosInfo[0]);

    
    contenedor.innerHTML = `
    
        <h3> resumen estadistico </h3>

        <p>total de libros: ${total}</p>
        <p>promedio del año de publicacion: ${promedio}</p>
        <p>libros posteriores a 2010: ${libroPosterior}</p>
        <p>libro mas antiguo: ${libroAntiguo.titulo} (${libroAntiguo.año})</p>
        <p>libro mas reciente: ${libroReciente.titulo} (${libroReciente.año})</p>
    
    `;

}




//boton
botonIngresar.addEventListener("click", () => {

    // de esta forma puedo hacer que se tome los valores guardados en titulo, autor, año y genero, ademas le aplico un trim para eliminar espacios. 
    let tituloValor = titulo.value.trim();
    let autorValor = autor.value.trim();
    let añoValor = parseInt(año.value.trim());   //parseInt sirve para pasar lo ingresado a un numero verdadero, en realidad js lo hace por defecto pero para evitar problemas a futuro en caso de que se cambie algo es mas recomendable de esta forma

    //capturar el valor real del genero
    let generoValor = genero.value === "otro" ? generoInput.value.trim() : genero.value; //si el usuario ingreso algo se usa ese algo para trabajar, si lo que se ingreso coincide con "otro" entonces permite al usuario escribir libremente y guarda la informacion

    // ver si esta vacio
    if (tituloValor === "") {
        alert("Ingrese un titulo")
        return
    }

    if (autorValor === "") {
        alert("Ingrese el autor")
        return
    }

    if (isNaN(añoValor)) {  //el isNaN en este caso lo uso por el cambio que hice con el parseInt, lo que pasa es que nunca se cumpliria la condicion de que la cadena estuviera vacia, porque si no se ingresa nada el parseInt devulve Nan, ya de esta forma si se da el caso de que si lo devuelve, es decir que el campo esta vacio, ya cumpliria la condicion y pediria ingresar algo
        alert("Ingrese el año en el que se publico")
        return
    }    

    if (generoValor === "") {
        alert("Ingrese el genero")
        return
    }

    // validar que el año este entre 1900 y el año actual:
    let añoActual = new Date().getFullYear(); // obtiene el año actual
    
    if (añoValor < 1900 || añoValor > añoActual){
        alert("Ingrese un año entre 1900 y el año presente");
        return;    
    };
    
    //validar antes de ingresarlos a la lista que no se pongan el mismo titulo ni autor y que ademas esten ingresados en minisculas
    if (librosInfo.some(libro =>    //el some se utiliza en las listas para verificar si al menos un elemento de la lista cumple con una condicion
        libro.titulo.toLowerCase() === tituloValor.toLowerCase() &&
        libro.autor.toLowerCase() === autorValor.toLowerCase()          //error tonto, fue poner tituloValor y autorValor, en lugar de titulo.tolowercase y autor.tolowercase, eso esta mal porque al momento de hacer el push, guarde los datos en los objetos titulo, autor
    )) {
        alert("Ese titulo con ese autor ya se encuentra registrado");
        return;
    }

    // agregar a la lista
    librosInfo.push({

        titulo: tituloValor,
        autor: autorValor,
        año: añoValor,
        genero: generoValor

    });


    //guardar en localStorage
    localStorage.setItem("libros", JSON.stringify(librosInfo));


    // limpiar campos
    titulo.value = "";
    autor.value = "";
    año.value = "";
    genero.selectedIndex = 0; //selectedIndex es una propiedad del elemento select que representa el indice (posicion) de la opcion seleccionada, los indices comienzan en 0 en la primera opcion


    //parte de la opcion "otro" en genero, para limpiar el campo
    generoInput.value = "";
    generoInput.style.display = "none"; //oculta el campo para completar luego de darle a "ingresar datos"


    mostrarLibros();
    actSelectGene();
    mostrarResumen();

});

//para que el usuario pueda escribir "otro" en la parte de genero
genero.addEventListener("change", () => {  //esto significa que cada vez que el usuario cambie la opcion seleccionada en el menu desplegable (<select id="genero">), ejecuta el codigo que esta adentro

    if (genero.value === "otro") {              //si el usuario elige la opcion "otro" en el <select>, se mostrara el <input id="generoOtro"> que inicialmente estaba oculto (display:none;)
        generoInput.style.display = "inline";
    } else {

        generoInput.style.display = "none";     // si elige cualquier otro genero que no sea "otro", el campo de texto se oculta y se borra su contenido
        generoInput.value = ""; //limpiar si no es otro

    }

});

//detectar cambios en los filtros
document.getElementById("filtroTitulo").addEventListener("input", () => {

    const librosFiltrados = mostrarLibros();
    mostrarResumen(librosFiltrados);

});

document.getElementById("filtroGenero").addEventListener("change", () => {

    const librosFiltrados = mostrarLibros();
    mostrarResumen(librosFiltrados);

});

botonOrdenar.addEventListener("click", () => {

    ordenarAscendente = !ordenarAscendente;

    //cambia texto del boton
    botonOrdenar.textContent = ordenarAscendente ? "ordenar por año ascendente" : "Ordenar por año descendente";

    const librosFiltrados = mostrarLibros();
    mostrarResumen(librosFiltrados);
});
