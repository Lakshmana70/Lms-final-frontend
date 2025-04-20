import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserNavbar.css';

export default function Usernavebar() {
  const navigate = useNavigate();

  return (
    <nav className="user-navbar navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/">
          <i className="bi bi-bank2 me-2"></i>
          LMS Portal
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#userNavContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="userNavContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/payments">
                <i className="bi bi-credit-card me-1"></i>
                Payments
              </a>
            </li> */}
          </ul>
          
          <div className="user-actions">
            <button 
              className="btn btn-outline-light"
              onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
