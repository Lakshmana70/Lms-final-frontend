import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Naverbars() {
  var [role, setrole] = useState(window.localStorage.getItem("role"))
  var navigate = useNavigate()
  
  function logout() {
    window.localStorage.clear()
    navigate("/login")
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          LMS System
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="/" className="nav-link active">
                <i className="bi bi-house-door me-1"></i>Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/Loanform" className="nav-link">
                <i className="bi bi-plus-circle me-1"></i>Add Loan
              </a>
            </li>
          </ul>
          
          <div className="d-flex">
            <button 
              onClick={logout}
              className="btn btn-outline-light hover-effect"
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
