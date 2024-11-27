// Función que lanza un error con un mensaje y un código de estado HTTP dados.
const generateErrorUtil = (msg, code) => {
    const err = new Error(msg);
    err.httpStatus = code;
    throw err;
};

export default generateErrorUtil;
