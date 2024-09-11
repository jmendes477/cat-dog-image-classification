import React from 'react';
import { BrowserRouter as  Routes, Route, Link} from 'react-router-dom';



function Header() {
    
    return (   
        <header className="header">
            <h1 className="header-title">Cat vs. Dog: Image Recognition</h1>
            <nav className="nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/about">About</Link>
            </nav>
        </header>    
    );
}

export default Header;