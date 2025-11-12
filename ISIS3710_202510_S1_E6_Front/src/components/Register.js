import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- importa useNavigate
import "../styles/Auth.css";

export default function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    if (email.length > 254) return false;
    return /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) newErrors.email = "Correo no válido";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: name,
            correo: email,
            telefono: phone,
            contraseña: userPassword,
            roles: "usuario"
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error en el registro');
        }

        const data = await response.json();

        // Actualizar usuario global (App)
        if (onLogin) {
          onLogin(data);
        }

        // Redirigir a la página principal del usuario sin recargar
        navigate('/pagina-usuario');

      } catch (error) {
        console.error('Error:', error);
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <div className="container-fluid d-flex flex-column flex-md-row align-items-stretch">
      {/* Columna del formulario */}
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center px-5 bg-white">
        <h1 className="text-inicio fw-bold mb-3 text-center">Registro</h1>
        <p className="text-muted text-center">
          Completa la siguiente información para iniciar en DomUs
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control rounded-pill"
              maxLength={100}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-pill"
              maxLength={254}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              placeholder="Número de teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control rounded-pill"
              maxLength={15}
            />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="contrasenia">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="form-control rounded-pill"
              maxLength={128}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          {errors.submit && (
            <p className="text-danger text-center">{errors.submit}</p>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill mb-2"
          >
            Registrarse
          </button>
          <button className="btn btn-light w-100 rounded-pill border mb-2">
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="Google logo"
              className="me-2"
              style={{ height: "20px" }}
            />{" "}
            Registrarse con Google
          </button>
        </form>
      </div>

      {/* Columna de la imagen */}
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
        <img
          src="/assets/logIn.png"
          alt="Motocicleta"
          className="img-fluid"
          style={{ width: "95%", height: "auto", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
