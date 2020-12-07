const formulario = document.querySelector('#formulario');
const inputs = document.querySelectorAll('#formulario');
const valores = {};

// REGEX PARA VALIDAR LOS CAMPOS
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}






//FUCIJON PARA APLICAR A LOS INPUTS
const validarformulario = (e) => {
    const valorName = e.target.name;
    const valor = e.target.value;
    const clase = e.target.parentElement.parentElement;

    switch (valorName) {
        case 'usuario':
            if (expresiones.usuario.test(valor)) {

                validacionExitoInputs(clase);
                valores.usuario = true;

            } else {
                validacionErrorInputs(clase);
                valores.usuario = false;
            }
            break;
        case 'nombre':
            if (expresiones.nombre.test(valor)) {
                validacionExitoInputs(clase);
                valores.nombre = true;

            } else {
                validacionErrorInputs(clase);
                valores.nombre = false;
            }

            break;
        case 'correo':
            if (expresiones.correo.test(valor)) {
                validacionExitoInputs(clase);
                valores.correo = true;
            } else {
                validacionErrorInputs(clase);
                valores.correo = false;
            }

            break;
        case 'contrasena':
            if (expresiones.password.test(valor)) {
                validacionExitoInputs(clase);
                valores.contrasena = true;

            } else {
                validacionErrorInputs(clase);
                valores.contrasena = false;
            }

            break;
        case 'contrasena-dos':
            const contrasena = document.querySelector('#contrasena').value;
            if (e.target.value === contrasena) {
                validacionExitoInputs(clase);
                valores.contrasena2 = true;

            } else {
                validacionErrorInputs(clase);
                valores.contrasena2 = false;
            }

            break;
        case 'telefono':
            if (expresiones.telefono.test(valor)) {
                validacionExitoInputs(clase);
                valores.telefono = true;

            } else {
                validacionErrorInputs(clase);
                valores.telefono = false;
            }

            break;
        default:
            console.log("");
            break;
    }
}



//RECORRER LOS INPUTS PARA VALIDARLOS
inputs.forEach(input => {
    // input.addEventListener('click', validarformulario);
    input.addEventListener('blur', validarformulario);
    input.addEventListener('keyup', validarformulario);
});


const validacionExitoInputs = clase => {

    //para acceder a los errores de lo iconos
    const alertas = clase.children[1];
    const alertaError = alertas.children[1];
    const alertaExito = alertas.children[2];

    alertaError.classList.add('iconos-validacion-error');
    alertaError.classList.remove('iconos-validacion-error-activo');

    alertaExito.classList.remove('iconos-validacion-exito');
    alertaExito.classList.add('iconos-validacion-exito-activo');

    //para acceder a los errores de campo
    const errorCampo = clase.children[2];
    errorCampo.classList.remove('error-campo-activo');
    errorCampo.classList.add('error-campo');


}

const validacionErrorInputs = clase => {
    //para acceder a los errores de lo iconos
    const alertas = clase.children[1];
    const alertaError = alertas.children[1];
    const alertaExito = alertas.children[2];

    alertaError.classList.remove('iconos-validacion-error');
    alertaError.classList.add('iconos-validacion-error-activo');

    alertaExito.classList.add('iconos-validacion-exito');
    alertaExito.classList.remove('iconos-validacion-exito-activo');

    //para acceder a los errores de campo
    const errorCampo = clase.children[2];
    errorCampo.classList.add('error-campo-activo');
    errorCampo.classList.remove('error-campo');


}



// AL PRESIONAR EL BOTÓN DE ENVIAR
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(document.querySelector('#terminos-condiciones').checked){
        valores.terminos =true;
    }else{
        valores.terminos =false;
    }

    const {usuario, nombre, contrasena, contrasena2, correo, telefono, terminos} = valores;
    if(usuario === true && nombre === true && contrasena === true && contrasena2 === true && correo === true && telefono === true && terminos === true){

        const error = document.querySelector('#contenedor-mensaje1');
        error.classList.add('contenedor-mensaje');
        error.classList.remove('error');

        const exito = document.querySelector('#contenedor-mensaje2');
        exito.classList.remove('contenedor-mensaje');
        exito.classList.add('exito');

        limpiarFormulario();
        
    }else{
        const error = document.querySelector('#contenedor-mensaje1');
        error.classList.remove('contenedor-mensaje');
        error.classList.add('error');

        const exito = document.querySelector('#contenedor-mensaje2');
        exito.classList.add('contenedor-mensaje');
        exito.classList.remove('exito');
    }
    
}); 

const limpiarFormulario = () => {
    const con = document.querySelectorAll('i');
    const exito = document.querySelector('.exito');
    
    setTimeout( () =>{
        formulario.reset();
         con.forEach(con => {
        if(con.classList.contains('iconos-validacion-exito-activo')){
            con.classList.remove('iconos-validacion-exito-activo');
            con.classList.add('iconos-validacion-exito');
        }
    });

    exito.classList.remove('exito');
    exito.classList.add('contenedor-mensaje');
        
    }, 3000)
};