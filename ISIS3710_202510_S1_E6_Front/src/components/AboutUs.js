import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Sección About Us - Texto Largo */}
      <div className="about-text">
        <h2 className="purple-text">Sobre Nosotros</h2>
        <p>
          En <strong>DomUs</strong>, nos dedicamos a revolucionar la manera en que las personas acceden a servicios 
          para el hogar. Conectamos a profesionales altamente calificados con clientes que necesitan soluciones 
          rápidas y eficientes. Nuestra misión es ofrecer una plataforma intuitiva y confiable donde cualquier persona 
          pueda encontrar el servicio adecuado sin complicaciones. Creemos que la tecnología debe facilitar la vida diaria, 
          y por eso trabajamos constantemente para mejorar nuestra plataforma, asegurando que la experiencia de cada usuario 
          sea fluida, rápida y segura.
        </p>
        <p>
          Nuestro compromiso no solo es con la calidad del servicio, sino también con la seguridad y la transparencia. 
          Nos aseguramos de que cada trabajador pase por un riguroso proceso de selección, revisamos su experiencia y 
          antecedentes, y recopilamos opiniones de otros usuarios para garantizar que cada servicio cumpla con los más 
          altos estándares. Además, ofrecemos un sistema de pago seguro, evitando cualquier riesgo para nuestros clientes.  
        </p>
        <p>
          En DomUs, no solo facilitamos la búsqueda de profesionales del hogar, sino que también contribuimos a la economía 
          local. Brindamos oportunidades laborales a expertos en distintas áreas, permitiéndoles acceder a más clientes 
          y gestionar su propio tiempo y tarifas de manera flexible. Creemos en una comunidad donde tanto clientes como 
          trabajadores salgan beneficiados a través de un ecosistema digital eficiente y confiable.  
        </p>
      </div>

      {/* Sección de Beneficios */}
      <div className="benefits-container">
        <div className="benefit-item">
          <span>📢</span>
          <h3 className="purple-text">Conexión Rápida</h3>
          <p>
            Sabemos que el tiempo es valioso, y por eso hemos diseñado un sistema que te permite encontrar 
            trabajadores en cuestión de minutos. Ya no necesitas llamar a múltiples números o buscar referencias 
            interminables: con DomUs, accedes a un amplio catálogo de expertos listos para ayudarte de inmediato.
          </p>
        </div>

        <div className="benefit-item">
          <span>🛠️</span>
          <h3 className="purple-text">Servicios Garantizados</h3>
          <p>
            La calidad y la confianza son nuestras prioridades. Todos los trabajadores registrados en nuestra 
            plataforma pasan por un proceso de verificación y evaluación constante. Además, ofrecemos garantías 
            en cada servicio, asegurándonos de que el trabajo realizado cumpla con las expectativas del cliente.
          </p>
        </div>

        <div className="benefit-item">
          <span>🤝</span>
          <h3 className="purple-text">Seguridad y Confianza</h3>
          <p>
            Nos tomamos la seguridad en serio. Cada profesional que forma parte de nuestra comunidad es verificado 
            rigurosamente para garantizar su confiabilidad. Además, contamos con un sistema de calificaciones y 
            comentarios para que puedas conocer la experiencia de otros usuarios antes de tomar una decisión.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
