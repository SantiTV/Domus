import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validación básica
    if (!email) newErrors.email = "El correo es requerido";
    if (!password) newErrors.password = "La contraseña es requerida";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          {
            correo: email,
            password: password
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.access_token) {
          const token = response.data.access_token;

          // Almacenar token
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("jwtToken", token);

          // Obtener datos del usuario
          const userResponse = await axios.get("http://localhost:3000/api/v1/usuarios/perfil", {
            headers: {
              Authorization: `Bearer ${token}`,  // <--- aquí estaba el error
            },
          });

          const userData = {
            ...userResponse.data,
            token, // por si quieres usarlo luego desde `user.token`
          };

          storage.setItem("loggedUser", JSON.stringify(userData));

          if (onLogin) {
            onLogin(userData);
          }

          navigate("/pagina-usuario");
        }
      } catch (error) {
        console.error("Error:", error.response?.data);
        setErrors({
          general: error.response?.data?.message || "Error al iniciar sesión",
        });
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div className="container-fluid d-flex flex-column flex-md-row align-items-stretch">
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center px-5 bg-white">
        <h1 className="text-inicio fw-bold mb-3 text-center">Iniciar Sesión</h1>
        <p className="text-muted text-center">Completa la siguiente información para iniciar sesión</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className={`form-control rounded-pill ${errors.email ? "is-invalid" : ""}`}
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control rounded-pill ${errors.password ? "is-invalid" : ""}`}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />{" "}
              Recordarme
            </label>
            <a href="/recuperar" className="text-decoration-none">Olvidé mi contraseña</a>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill mb-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span className="ms-2">Iniciando sesión...</span>
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
          <button
            className="btn btn-light w-100 rounded-pill border mb-2"
            type="button"
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="Google logo"
              className="me-2"
              style={{ height: "20px" }}
            />{" "}
            Iniciar sesión con Google
          </button>
        </form>
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
        <img src="/assets/logIn.png" alt="Motocicleta" className="img-fluid" style={{ width: "95%", height: "auto", objectFit: "contain" }} />
      </div>
    </div>
  );
}