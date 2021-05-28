import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import "./Sidebar.css"
const Sidebar = (props) => {
        return (
          <Menu>
            <a className="menu-item" href="/">
              Motos
            </a>
            <a className="menu-item" href="/salads">
              Nouvelle réservation
            </a>
            <a className="menu-item" href="/pizzas">
              Clients
            </a>
            <a className="menu-item" href="/desserts">
              Calendrier
            </a>
            <a className="menu-item" href="/desserts">
              Paramètres
            </a>
          </Menu>
        );
}

export default Sidebar