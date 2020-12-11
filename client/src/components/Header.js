import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';

class Header extends React.Component {

    render() {
        
        return (
            <div className="header">
                <h1 className="logo">Mis presupuestos</h1>
                <div className="header-right">
                    <NavLink className="menu" to="/" >Home</NavLink>
                    <NavLink className="menu" to='/operations' >Operaciones</NavLink>
                </div>
            </div>
        );
    };
};

export default Header;