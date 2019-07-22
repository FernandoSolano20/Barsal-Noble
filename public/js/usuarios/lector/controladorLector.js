const idRadios = document.querySelectorAll('[name="id"]');
const idInput = document.getElementById('ID');
const idAlert = document.getElementById('alert-id');

const nombreInput1 = document.getElementById('nombre-input');
const nombreAlert1 = document.getElementById('alert-nombre1');

const nombreInput2 = document.getElementById('segundo-nombre-input');
const nombreAlert2 = document.getElementById('alert-nombre2');

const apellidoInput1 = document.getElementById('primer-apellido-input');
const apellidoAlert1 = document.getElementById('alert-apellido1');

const apellidoInput2 = document.getElementById('segundo-apellido-input');
const apellidoAlert2 = document.getElementById('alert-apellido2');

const correoInput = document.getElementById('correo-input');
const correoAlert = document.getElementById('alert-correo');

const telefonoInput = document.getElementById('telefono-input');
const telefonoAlert = document.getElementById('alert-telefono');

const nacimientoInput = document.getElementById('nacimiento-input');
const nacimientoAlert = document.getElementById('alert-date');

const imgInput = document.getElementById('img');
const imgAlert = document.getElementById('alert-img');

const sexoInput = document.querySelectorAll('[name="sexo"]');
const sexoAlert = document.getElementById('alert-sexo');

const aliasInput = document.getElementById('alias-input');
const aliasAlert = document.getElementById('alert-alias');

const provinciaAlert = document.getElementById('alert-provincia');
const cantonAlert = document.getElementById('alert-canton');
const distritoAlert = document.getElementById('alert-distrito');

const sennasInput = document.getElementById('sennas-input');
const sennasAlert = document.getElementById('alert-sennas');
const favAlert = document.getElementById('alert-favorito');
const mapaAlert = document.getElementById('alert-mapa');

let obtenerDatosUsuarios = async function () {
    let error = validarId() | validarNombre1() | validarNombre2() | validarApellido1() | validarApellido2() | validarCorreo() | validarTelefono() | validarNacimiento() | validarFotoPerfil() | validarSexo() | validarAlias() | validarProvincia() | validarCanton() | validarDistrito() | validarSennas() | validarFavoritos() | validarMapa();
    if (!error) {

        document.body.className = "loading";
        let imgValue = document.getElementById('img');
        let imgResult = await crearImagen(imgValue);
        if (imgResult.success) {
            let sexoValue;
            for (let i = 0; i < sexoInput.length; i++) {
                if (sexoInput[i].checked) {
                    sexoValue = sexoInput[i].value;
                    break;
                }
            }
            let nacimiento = new Date(nacimientoInput.value);
            nacimiento = nacimiento.getFullYear() + '-' + Number(nacimiento.getUTCMonth() + 1) + '-' + nacimiento.getUTCDate()
            let usuario = {
                id: idInput.value,
                nombre: nombreInput1.value,
                segundoNombre: nombreInput2.value,
                primerApellido: apellidoInput1.value,
                segundoApellido: apellidoInput2.value,
                correo: correoInput.value,
                img: imgResult.result.secure_url,
                sexo: sexoValue,
                telefono: telefonoInput.value,
                tipoUsuario: 'Lector',
                nacimiento: nacimiento,
                sennas: sennasInput.value,
                alias: aliasInput.value,
                localizacionLatitud: markers[0].position.lat(),
                localizacionLongitud: markers[0].position.lng(),
                estado: 1,
                idProvincia: sectionProvincia.value,
                idCanton: sectionCantones.value,
                idDistrito: sectionDistritos.value,
                idAutor: autorSelect.value,
                idGenero: generoSelect.value,
                idLibro: libroSelect.value,
                idCategoria: categoriaSelect.value,
                idLibreria: ''
            }
            let nuevoUsuario = await crearUsuario(usuario);
            document.body.className = "";
            if (nuevoUsuario.success) {
                Swal.fire({
                    type: 'success',
                    title: nuevoUsuario.message,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                        '<a href="http://localhost:3000/inicioSesion.html" class="linkPage">Ok</a>'
                });
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: nuevoUsuario.message
                });
            }
        }
        else {
            document.body.className = "";
            Swal.fire({
                type: 'error',
                title: imgResult.message
            });
        }
    }
    else {
        Swal.fire({
            type: 'warning',
            title: 'No se ha enviado su mensaje exitosamente',
            text: 'Revise los campos resaltados e intételo de nuevo'
        });
    }
}

let cambiarIdentificacion = function () {
    for (let i = 0; i < idRadios.length; i++) {
        if (idRadios[i].checked) {
            document.getElementById('labelID').innerHTML = idRadios[i].value;
            idInput.name = idRadios[i].value;
            break;
        }
    }
    validarId();
}

let validarId = function () {
    let elementNumber = {
        value: idInput.value,
        alert: idAlert,
        input: idInput
    }
    if (elementNumber.input.name === 'Cédula') {
        if (!validarNumeros(elementNumber))
            return true;
        else if (elementNumber.value.length != 9) {
            idAlert.innerText = "Debe tener 9 dígitos."
            idAlert.className = idAlert.className.replace("alertHidden", "");
            idInput.className = idInput.className.replace("inputError", "");
            idInput.className = idInput.className + " inputError";
            return true;
        }
    }
    else if (elementNumber.input.name === 'Pasaporte') {
        if (!noVacio(elementNumber)) {
            return true;
        }
        if (elementNumber.value.length != 44) {
            idAlert.innerText = "Debe tener 44 dígitos."
            idAlert.className = idAlert.className.replace("alertHidden", "");
            idInput.className = idInput.className.replace("inputError", "");
            idInput.className = idInput.className + " inputError";
            return true;
        }
        else if (!regexPassport.test(elementNumber.value)) {
            idAlert.innerText = "El formato no coincide."
            idAlert.className = idAlert.className.replace("alertHidden", "");
            idInput.className = idInput.className.replace("inputError", "");
            idInput.className = idInput.className + " inputError";
            return true;
        }
    }
    else if (elementNumber.input.name === 'Residente') {
        if (!validarNumeros(elementNumber))
            return true;
        else if (elementNumber.value.length != 12) {
            idAlert.innerText = "Debe tener 12 dígitos."
            idAlert.className = idAlert.className.replace("alertHidden", "");
            idInput.className = idInput.className.replace("inputError", "");
            idInput.className = idInput.className + " inputError";
            return true;
        }
    }
    idAlert.className = idAlert.className.replace("alertHidden", "");
    idAlert.className = idAlert.className + " alertHidden";
    idInput.className = idInput.className.replace("inputError", "");
    return false;
}

let validarNombre1 = function () {
    let elementText = {
        value: nombreInput1.value,
        alert: nombreAlert1,
        input: nombreInput1
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarNombre2 = function () {
    let elementText = {
        value: nombreInput2.value,
        alert: nombreAlert2,
        input: nombreInput2
    }
    if (elementText.value != '')
        return !(validarTexto(elementText));
    return false;
}

let validarApellido1 = function () {
    let elementText = {
        value: apellidoInput1.value,
        alert: apellidoAlert1,
        input: apellidoInput1
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarApellido2 = function () {
    let elementText = {
        value: apellidoInput2.value,
        alert: apellidoAlert2,
        input: apellidoInput2
    }
    if (elementText.value != '')
        return !(validarTexto(elementText));
    return false;
}

let validarTelefono = function () {
    let elementNumber = {
        value: telefonoInput.value,
        alert: telefonoAlert,
        input: telefonoInput
    }
    if (!validarNumeros(elementNumber)) {
        return true;
    }
    else if (elementNumber.value.length != 8) {
        telefonoAlert.innerText = "Debe tener 8 dígitos."
        telefonoAlert.className = telefonoAlert.className.replace("alertHidden", "");
        telefonoInput.className = telefonoInput.className.replace("inputError", "");
        telefonoInput.className = telefonoInput.className + " inputError";
        return true;
    }
    else {
        telefonoAlert.className = telefonoAlert.className.replace("alertHidden", "");
        telefonoAlert.className = telefonoAlert.className + " alertHidden";
        telefonoInput.className = telefonoInput.className.replace("inputError", "");
        return false;
    }
}

let validarNacimiento = function () {
    let elementDate = {
        value: nacimientoInput.value,
        alert: nacimientoAlert,
        input: nacimientoInput
    }
    return !(validarFecha(elementDate) && validarFechaMayorActual(elementDate));
}

let validarFotoPerfil = function () {
    let elementPicture = {
        value: imgInput.value,
        alert: imgAlert,
        input: imgInput
    }
    return !(noVacio(elementPicture) && validarFotos(elementPicture));
}

let validarSexo = function () {
    let elementCheckbox = {
        alert: sexoAlert,
        input: sexoInput
    }
    if (!validarRadio(elementCheckbox)) {
        return true;
    }
    else {
        sexoAlert.className = sexoAlert.className.replace("alertHidden", "");
        sexoAlert.className = sexoAlert.className + " alertHidden";
        sexoInput[0].parentElement.className = sexoInput[0].parentElement.className.replace("errorRadio", "");
        return false;
    }
}

let validarAlias = function () {
    let elementText = {
        value: aliasInput.value,
        alert: aliasAlert,
        input: aliasInput
    }
    return !(noVacio(elementText));
}

let validarProvincia = function () {
    let elementSelect = {
        value: sectionProvincia.value,
        alert: provinciaAlert,
        input: sectionProvincia
    }
    return !(validarSelect(elementSelect));
}

let validarCanton = function () {
    let elementSelect = {
        value: sectionCantones.value,
        alert: cantonAlert,
        input: sectionCantones
    }
    return !(validarSelect(elementSelect));
}

let validarDistrito = function () {
    let elementSelect = {
        value: sectionDistritos.value,
        alert: distritoAlert,
        input: sectionDistritos
    }
    return !(validarSelect(elementSelect));
}

let validarSennas = function () {
    let elementText = {
        value: sennasInput.value,
        alert: sennasAlert,
        input: sennasInput
    }
    return !(noVacio(elementText));
}

let validarFavoritos = function () {
    if (autorSelect.value === '' && generoSelect.value === '' && categoriaSelect.value === '' && libroSelect.value === '') {
        favAlert.className = favAlert.className.replace("alertHidden", "");
        autorSelect.className = autorSelect.className.replace("selectError", "");
        autorSelect.className = autorSelect.className + " selectError";
        generoSelect.className = generoSelect.className.replace("selectError", "");
        generoSelect.className = generoSelect.className + " selectError";
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        categoriaSelect.className = categoriaSelect.className + " selectError";
        libroSelect.className = libroSelect.className.replace("selectError", "");
        libroSelect.className = libroSelect.className + " selectError";
        return true;
    }
    else {
        autorSelect.className = autorSelect.className.replace("selectError", "");
        generoSelect.className = generoSelect.className.replace("selectError", "");
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        libroSelect.className = libroSelect.className.replace("selectError", "");
        favAlert.className = favAlert.className.replace("alertHidden", "");
        favAlert.className = favAlert.className + " alertHidden";
        return false;
    }
}

idInput.addEventListener('blur', validarId);
nombreInput1.addEventListener('blur', validarNombre1);
nombreInput2.addEventListener('blur', validarNombre2);
apellidoInput1.addEventListener('blur', validarApellido1);
apellidoInput2.addEventListener('blur', validarApellido2);
correoInput.addEventListener('blur', validarCorreo);
telefonoInput.addEventListener('blur', validarTelefono);
nacimientoInput.addEventListener('blur', validarNacimiento);
imgInput.addEventListener('change', validarFotoPerfil);
aliasInput.addEventListener('blur', validarAlias);
sectionProvincia.addEventListener('change', validarProvincia);
sectionCantones.addEventListener('change', validarCanton);
sectionDistritos.addEventListener('change', validarDistrito);
sennasInput.addEventListener('blur', validarSennas);
for (let i = 0; i < sexoInput.length; i++)
    sexoInput[i].addEventListener('change', validarSexo);
autorSelect.addEventListener('change', validarFavoritos);
generoSelect.addEventListener('change', validarFavoritos);
categoriaSelect.addEventListener('change', validarFavoritos);
libroSelect.addEventListener('change', validarFavoritos);
document.getElementById('registrar').addEventListener('click', obtenerDatosUsuarios);
document.getElementById('map').addEventListener('click', validarMapa);
for (let i = 0; i < idRadios.length; i++)
    idRadios[i].addEventListener('change', cambiarIdentificacion);