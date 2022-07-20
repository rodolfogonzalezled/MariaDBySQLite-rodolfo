function enviarMensaje() {
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    if (!email.value || !mensaje.value) {
        alert("Debe completar los campos");
        return false;
    }

    socket.emit("mensajeNuevo", {
        autor: email.value,
        mensaje: mensaje.value
    });
    mensaje.value = "";
    return false;
}

function borrarMensajes() {
    const autor = document.getElementById("email").value;
    socket.emit("borrarMensajes", autor);
}

const btnBorrarMensajes = document.getElementById("eliminarMensaje");
btnBorrarMensajes.addEventListener("click", borrarMensajes);

socket.on("mensajes", (mensajes) => {
    if (mensajes.length > 0) {
        document.getElementById('sinMensajes').style.display = 'none';
        document.getElementById('listaMensajes').style.display = 'block';
        document.getElementById('eliminarMensaje').style.display = 'block';
        let mensajesHtml = mensajes
            .map((mensaje) => `<span>
                <b style="color: blue;">${mensaje.autor}</b>
                <label style="color: brown;">[${new Date(mensaje.timestamp).toLocaleString()}]</label>:
                <label style="color: green;">${mensaje.mensaje}</label> 
                </span>`)
            .join("<br>");
        document.getElementById("listaMensajes").innerHTML = mensajesHtml;
    } else {
        document.getElementById('listaMensajes').style.display = 'none';
        document.getElementById('eliminarMensaje').style.display = 'none';
        document.getElementById('sinMensajes').style.display = 'block';
    }
});