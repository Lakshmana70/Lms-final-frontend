import React from 'react';
import Naverbars from './Header';
import './AdminDashboard.css';

export default function AdminDashboard() {
  // ... existing state and hooks ...

  return (
    <div className="admin-dashboard">
      <Naverbars />
      <div className="dashboard-content">
        <div className="container py-4">
          <div className="row align-items-center mb-4">
            <div className="col-12 col-md-6">
              <h1 className="dashboard-title">
                <i className="bi bi-speedometer2 me-2"></i>
                Admin Dashboard
              </h1>
            </div>
            <div className="col-12 col-md-6">
              <div className="stats-container">
                <div className="stat-card">
                  <div className="stat-content">
                    <i className="bi bi-people mb-2"></i>
                    <span className="stat-label">Total Users</span>
                    <span className="stat-value">{totalUsers}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-content">
                    <i className="bi bi-currency-dollar mb-2"></i>
                    <span className="stat-label">Total Loans</span>
                    <span className="stat-value">{totalLoans}</span>
                  </div>
                </div>
                {/* Add more stat cards as needed */}
              </div>
            </div>
          </div>

          <div className="card table-card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>
                        <i className="bi bi-person me-2"></i>
                        User Name
                      </th>
                      <th>
                        <i className="bi bi-tag me-2"></i>
                        Role
                      </th>
                      <th>
                        <i className="bi bi-calendar me-2"></i>
                        Date
                      </th>
                      <th>
                        <i className="bi bi-gear me-2"></i>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="4">
                          <div className="loading-state">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : data?.length > 0 ? (
                      data.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>
                            <span className={`status-badge ${user.role.toLowerCase()}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{new Date(user.date).toLocaleDateString()}</td>
                          <td>
                            <button className="btn btn-sm btn-primary action-btn me-2">
                              <i className="bi bi-pencil"></i>
                              Edit
                            </button>
                            <button className="btn btn-sm btn-danger action-btn">
                              <i className="bi bi-trash"></i>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">
                          <div className="empty-state">
                            <i className="bi bi-inbox"></i>
                            <p>No users found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}