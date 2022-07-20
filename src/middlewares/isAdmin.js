// si la variable no es true, no va a dejar entrar a las rutas
const administrador = true;

function errorNoAdmin(ruta, metodo){
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcionError = `Ruta '${ruta}' método '${metodo}' no autorizado`;
    } else {
        error.descripcionError = 'No Autorizado';
    }
    return error;
}

export const isAdmin = (req, res, next) => {
    if (!administrador) {
        res.send(errorNoAdmin(req.originalUrl, req.method));
    } else {
        next();
    }
};
