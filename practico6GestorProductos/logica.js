const nombreProducto = document.getElementById("nombreProducto");
const categoriaProducto = document.getElementById("categoriaProducto");
const precioProducto = document.getElementById("precioProducto");
const botonAgregar = document.getElementById("ingresoProductos");
const tablaProductos = document.getElementById("tablaProductos");


let productos = JSON.parse(localStorage.getItem("productos")) || [];


mostrarProductos();


botonAgregar.addEventListener("click", () => {

    const nombre = nombreProducto.value.trim();
    const categoria = categoriaProducto.value.trim();
    const precio = parseFloat(precioProducto.value);
    

    if (nombre === "") {
        alert("Debe ingresar el nombre del producto");
        return;

    }

    if (categoria === "") {
        alert("Debe ingresar la categoria del producto");
        return;

    }

    if (isNaN(precio) || (precio <= 0)) {
        alert("Ingrese un numero mayor que cero")
        return;

    }


    const producto = {
        nombre: nombre,
        categoria: categoria,
        precio: precio

    }

    productos.push(producto);

    localStorage.setItem("productos", JSON.stringify(productos));

    nombreProducto.value = "";
    categoriaProducto.value = "";
    precioProducto.value = "";

    mostrarProductos();

});

function mostrarProductos() {

    //limpia la tabla
    tablaProductos.innerHTML = ""


    productos.forEach((producto, indice) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
        
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>    
            <td>${producto.precio}</td>
            <td><button onclick="eliminarProducto(${indice})">eliminar</button></td>
   
        
        `;
     
    tablaProductos.appendChild(fila);

    });
}

function eliminarProducto(indice) {

    productos.splice(indice, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();

}



