import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
                <li className="nav-item"><NavLink to="/" className="navbar-brand">CRUD</NavLink></li>
                <li className="nav-item"><NavLink to="/" exact className="nav-link">Visa artiklar</NavLink></li>
                <li className="nav-item"><NavLink to="/articles/add" className="nav-link">Skapa artikel</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;