// Servicio Proviencias

const sectionProvincia = document.getElementById('provincias');
const sectionCantones = document.getElementById('cantones');
const sectionDistritos = document.getElementById('distritos');
var listaObtenerProvincias = [];
var listaObtenerCantones = [];
var listaObtenerDistritos = [];

/*Servicio*/

var obtenerProvincias = async () => {
    var response = await fetch('https://ubicaciones.paginasweb.cr/provincias.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    var result = await response.json();
    return result;
}
// Fin Sevicio Provincia

// Servicio Cantones

var obtenerCantones = async (provincia) => {
    var response = await fetch('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/cantones.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    var result = await response.json();
    return result;
}

// Servicio Distrito
 

var obtenerDistritos = async (provincia, canton) => {
    var response = await fetch('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/canton/' + canton + '/distritos.json', {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    var result = await response.json();
    return result;
}


// Listar Usuarios

let obtenerUsuarios = async() => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-usuarios',
            responseType: 'json'
        });

        var result = await response.data.lista_usuarios;

        return result;

    } catch (error) {
        console.log(error);
    }
};
