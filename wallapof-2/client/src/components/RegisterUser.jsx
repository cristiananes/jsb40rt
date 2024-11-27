// Importamos una variable de entorno.
import { useState } from "react";

// Inicializamos el componente.
const RegisterUser = () => {
  //creamos los estados para los campos del formulario
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Manejador de cambio del input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") setUserName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  //manejador de envio del formulario

  const handleSubmit = (e) => {
    //evitamos que la pagina se recargue al enviar el formulario
    e.preventDefault();

    //llamada api o manejar registro usuarios

    console.log("nombre de usuario", userName);
    console.log("email", email);
    console.log("password", password);

    //reiniciar los campos del formulario
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="registroUsuario">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">pass</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Registrar usuario</button>
      </form>
    </div>
  );
};

export default RegisterUser;
