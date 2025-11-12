import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "../styles/Navbar.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const navItems = [
    { id: 1, name: "Dashboard", icon: "dashboard.svg" },
    { id: 2, name: "Servicios", icon: "services.svg" },
    { id: 3, name: "Calendario", icon: "calendar-tick.svg" },
    { id: 4, name: "Perfil", icon: "user-square.svg" },
];

function Navbar({ setSelectedView }) {
    const [activeItem, setActiveItem] = useState(1);
    const navigate = useNavigate();

    const handleNavClick = (item) => {
        setActiveItem(item.id);
        setSelectedView(item.name); 
    };

    return (
        <div className="navbar-container">
            {/* Logo */}
            <a className="navbar-brand mb-4" href="/">
                <p className="logo">
                    Dom<span className="usColor">US</span>
                </p>
            </a>

            {/* Navegacion */}
            <Nav className="flex-column">
                {navItems.map((item) => (
                    <Nav.Link
                        key={item.id}
                        className={`nav-item ${activeItem === item.id ? "active" : ""}`}
                        onClick={() => handleNavClick(item)}
                    >
                        <div className="icon-container">
                            <img
                                src={`/assets/navbar-iconos/${item.icon}`}
                                alt={item.name}
                                className="nav-icon"
                            />
                        </div>
                    </Nav.Link>
                ))}
            </Nav>

            {/* Avatar */}
            <div className="user-avatar" >
                <img src="/assets/navbar-iconos/user.svg" alt="Usuario" onClick={()=>navigate("/pagina-usuario")} />
            </div>
        </div>
    );
}

Navbar.propTypes = {
    setSelectedView: PropTypes.func.isRequired,
};

export default Navbar;