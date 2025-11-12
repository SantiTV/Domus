import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-bg mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>
              <span className="dom-color">Dom</span>
              <span className="us-color">Us</span>
            </h5>

            <p>
              Transforma los servicios para el hogar con profesionales de primer
              nivel, reservas sin complicaciones y un compromiso con la calidad,
              brindando soluciones expertas a tu puerta con rapidez, confianza y
              fiabilidad.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Explorar</h5>
            <ul className="list-unstyled">
              <li>
                <span className="text-light">Sobre Nosotros</span>
              </li>
              <li>
                <span className="text-light">Lo Que Ofrecemos</span>
              </li>
              <li>
                <span className="text-light">Oportunidades Laborales</span>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <span className="text-light">Términos</span>
              </li>
              <li>
                <span className="text-light">Privacidad</span>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Social Media</h5>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png"
                alt="Facebook"
                className="social-icon me-2 filter-white"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384017.png"
                alt="Twitter"
                className="social-icon me-2 filter-white"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384023.png"
                alt="Whatsapp"
                className="social-icon me-2 filter-white"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
                alt="Instagram"
                className="social-icon me-2 filter-white"
              />
            </div>
          </div>
        </div>
        <hr className="text-light" />
        <div className="text-center">
          <p className="mb-0">
            <span className="dom-color">Domus</span>
            <span className="us-color">Us</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
