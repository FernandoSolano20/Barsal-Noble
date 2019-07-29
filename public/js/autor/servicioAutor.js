let registrarAutor = async (autor) => {
    let response = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/autor/registrarAutor',
        responseType: 'json',
        data: autor
    });
    return response.data;
};



let obtenerAutores = async () => {
    let response = await fetch('http://localhost:4000/api/autor/listarAutores', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaAutores;
}

let obtenerAutorId = async(_id) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/autor/buscarAutorId/${_id}`,
            responseType: 'json'
        });

        return response.data.autor;
    } catch (error) {
        console.log(error);
    }
};

let agregarPremios = async (pid, pnombrePremio, pannoPremio, pDescPremio) => {
    let response = await axios({
        method: 'post',
        url: `http://localhost:4000/api/autor/agregarPremios`,
        responseType: 'json',
        data: {
            _id: pid,
            nombre: pnombrePremio,
            anno: pannoPremio,
            descripcion: pDescPremio
        }
    });
    return response.data;
};