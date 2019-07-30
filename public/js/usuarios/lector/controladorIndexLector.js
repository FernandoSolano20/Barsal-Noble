let mostrarUsuarioRegistrado = async () => {
    let usuarioActual = await obtenerLectorId(sessionStorage.id);

    let avatar = document.getElementById('avatar_lector');
    let nombre = document.getElementById('nombre_lector');
    let alias = document.getElementById('alias_lector');
    let correo = document.getElementById('correo_lector');

    avatar.setAttribute('src', usuarioActual.img);
    nombre.innerHTML = usuarioActual.nombre;

    if (usuarioActual.alias) {
        alias.innerHTML = usuarioActual.alias;
    }

    let linkCorreo = document.createElement('a');
    linkCorreo.setAttribute('href', 'mailto:' + usuarioActual.correo);
    linkCorreo.innerHTML = usuarioActual.correo;

    correo.appendChild(linkCorreo);
}

mostrarUsuarioRegistrado();

const tbody = document.querySelector('#tablaElementos tbody');
let listaLibros = [];
const sctLibros = document.querySelector('#listaLibros')
//let txtFiltro = document.querySelector('#txtFiltro');

let formatNumber = { //funcion que formatea los numeros
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear: function (num) {
        num += '';
        let splitStr = num.split('.');
        let splitLeft = splitStr[0];
        let splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        let regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
}


let mostrarTabla = async () => {
    let usuario = await preferenciasUsuario(sessionStorage.id);
    let preferencias = {};

    if (usuario.categoria)
        preferencias.categoria = usuario.categoria;

    if (usuario.autor)
        preferencias.autor = usuario.autor;

    if (usuario.genero)
        preferencias.genero = usuario.genero;

    listaLibros = await obtenerPreferencias(preferencias);
    for (let i = 0; i < listaLibros.length; i++) {
        let contenedorLibro = document.createElement('div');
        contenedorLibro.classList.add('card');

        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = listaLibros[i]['titulo'];

        header.appendChild(h2);

        let contenedorImagen = document.createElement('div');
        contenedorImagen.classList.add('contenedorImagen');
        let fotoPortada = document.createElement('img');
        fotoPortada.src = listaLibros[i]['caratula'];

        contenedorImagen.appendChild(fotoPortada);
        let portada = document.createElement('img');

        let genero = document.createElement('p');
        genero.classList.add('genero');
        genero.innerText = `Genero: ${listaLibros[i].genero.nombre}`;

        let categoria = document.createElement('p');
        categoria.classList.add('categoria');
        categoria.innerText = `Categoría: ${listaLibros[i].categoria.nombre}`;

        /* let pprecio = document.createElement('p');
        pprecio.classList.add('precio');
        pprecio.innerText = `Precio: ${formatNumber.new(listaLibros[i].precio, "¢")}`; */

        let contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('contenedor');
        contenedorBotones.classList.add('column');



        let btnPerfil = document.createElement('button');
        btnPerfil.classList.add('dosColumnas');
        btnPerfil.classList.add('botonVerLibro');
        btnPerfil.classList.add('material-blue');
        btnPerfil.setAttribute('id', 'verPerfil');
        btnPerfil.setAttribute('type', 'button');
        btnPerfil.innerText = 'Ver Perfil';

        let btnAgregarTipo = document.createElement('a');
        btnAgregarTipo.classList.add('dosColumnas');
        btnAgregarTipo.classList.add('botonVerLibro');
        btnAgregarTipo.classList.add('material-blue');
        btnAgregarTipo.setAttribute('id', 'verPerfil');
        btnAgregarTipo.href = "http://localhost:3000/formatoLibro.html?id=" + listaLibros[i]._id;
        btnAgregarTipo.innerText = 'Agregar tipo';

        contenedorLibro.appendChild(header);
        contenedorLibro.appendChild(contenedorImagen);
        contenedorLibro.appendChild(genero);
        contenedorLibro.appendChild(categoria);
        //contenedorLibro.appendChild(pprecio);
        contenedorLibro.appendChild(contenedorBotones);
        contenedorBotones.appendChild(btnAgregarTipo);
        contenedorBotones.appendChild(btnPerfil);


        sctLibros.appendChild(contenedorLibro);

    }


};

let filtrarLibros = async () => {

    let filtro = txtFiltro.value.toLowerCase();
    sctLibros.innerHTML = '';

    for (let i = 0; i < listaLibros.length; i++) {

        if (listaLibros[i]['titulo'].toLowerCase().includes(filtro) || listaLibros[i].genero.nombre.toLowerCase().includes(filtro) || listaLibros[i].categoria.nombre.toLowerCase().includes(filtro)) {
            let contenedorLibro = document.createElement('div');
            contenedorLibro.classList.add('card');

            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            h2.innerText = listaLibros[i]['titulo'];

            header.appendChild(h2);

            let contenedorImagen = document.createElement('div');
            contenedorImagen.classList.add('contenedorImagen');
            let fotoPortada = document.createElement('img');
            fotoPortada.classList.add('fotoPortada');
            fotoPortada.src = listaLibros[i]['caratula'];

            contenedorImagen.appendChild(fotoPortada);

            let genero = document.createElement('p');
            genero.classList.add('genero');
            genero.innerText = `Genero: ${listaLibros[i].genero.nombre}`;

            let categoria = document.createElement('p');
            categoria.classList.add('categoria');
            categoria.innerText = `Categoría: ${listaLibros[i].categoria.nombre}`;

            let pprecio = document.createElement('p');
            pprecio.classList.add('precio');
            pprecio.setAttribute('id', 'precio');
            pprecio.innerText = `Precio: ${formatNumber.new(listaLibros[i].precio, "¢")}`;

            let btnPerfil = document.createElement('button');
            btnPerfil.classList.add('material-blue');
            btnPerfil.classList.add('botonVerLibro');
            btnPerfil.setAttribute('id', 'verPerfil');
            btnPerfil.setAttribute('type', 'button');
            btnPerfil.innerText = 'Ver perfil';
            btnPerfil.dataset._id = listaLibros[i]['_id'];
            btnPerfil.addEventListener('click', function () {
                //console.log(this.dataset._id);
                window.location.href = `ver-perfil-contacto.html?_id=${this.dataset._id}`
            });

            contenedorLibro.appendChild(header);
            contenedorLibro.appendChild(contenedorImagen);
            contenedorLibro.appendChild(genero);
            contenedorLibro.appendChild(categoria);
            contenedorLibro.appendChild(pprecio);
            contenedorLibro.appendChild(btnPerfil);

            sctLibros.appendChild(contenedorLibro);
        }


    }
};

mostrarTabla();
txtFiltro.addEventListener('keyup', filtrarLibros);