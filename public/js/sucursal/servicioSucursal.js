'use strict';
var crearSucursal = async (sucursal) => {
    var response = await fetch('http://localhost:4000/api/sucursal/registrarSucursal', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(sucursal)
    });
    var result = await response.json();
    return result;
}



let obtenerSucursales = async() => {
    var response = await fetch('http://localhost:4000/api/sucursal/listarSucursales', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.listaSucursales;
};

let obtenerSucursalPorId = async(id) => {
    var response = await fetch('http://localhost:4000/api/sucursal/sucursalId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let obtenerCountSucursal = async function () {
    var response = await fetch('http://localhost:4000/api/sucursal/countSucursal', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.count;
}

let pasarLibroLibreriaSucursal = async function (compra) {
    var response = await fetch('http://localhost:4000/api/sucursal/comprarLibroSucursalLibreria', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(compra)
    });
    var result = await response.json();
    return result;
}

let pasarLibroEntreSucursales = async function (compra) {
    var response = await fetch('http://localhost:4000/api/sucursal/pasarLibrosEntreSucursales', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(compra)
    });
    var result = await response.json();
    return result;
}

let pasarLibroEntreSucursaleLibreria = async function (compra) {
    var response = await fetch('http://localhost:4000/api/sucursal/pasarLibrosEntreSucursalLibreria', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(compra)
    });
    var result = await response.json();
    return result;
}

let suscribirUsuario = async function (data) {
    var response = await fetch('http://localhost:4000/api/sucursal/suscribirUsuarioSucursal', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(data)
    });
    var result = await response.json();
    return result;
}

let desuscribirUsuario = async function (data) {
    var response = await fetch('http://localhost:4000/api/sucursal/desuscribirUsuarioSucursal', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(data)
    });
    var result = await response.json();
    return result;
}

let obtenerSucursalesPorEjemplaresId = async(ejemplares) => {
    let response = await fetch('http://localhost:4000/api/sucursal/obtenerSucursalesPorEjemplaresId', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(ejemplares)
    });
    let result = await response.json();
    return result;
}

let obtenerCantidadEjemplarPorSucursal = async(ejemplares) => {
    let response = await fetch('http://localhost:4000/api/sucursal/obtenerCantidadEjemplarPorSucursal', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(ejemplares)
    });
    let result = await response.json();
    return result;
}