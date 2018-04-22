import React from 'react';
import { NavBar } from './NavBar';

export const Layout = props => (
    <div className="container">
        <header>
            <NavBar />
        </header>
        <br/>
        <div className="container">{props.children}</div>
    </div>
);

export default Layout;