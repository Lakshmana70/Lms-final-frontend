import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useLoginpageMutation } from '../../APISERVER/lmsAPI';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Loginpage() {
  const [loginfn] = useLoginpageMutation();
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <p className="login-subtitle">Please sign in to your account</p>
          </div>

          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              setStatus(null);
              try {
                const res = await loginfn(values);
                if (res.error || !res.data?.token) {
                  setStatus("Invalid username or password");
                } else {
                  window.localStorage.setItem("token", res.data.token);
                  window.localStorage.setItem("role", res.data.role);
                  navigate("/");
                }
              } catch (error) {
                setStatus("Invalid username or password");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, status, isSubmitting }) => (
              <Form className="login-form">
                {status && (
                  <div className="alert alert-danger">{status}</div>
                )}

                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <Field
                      type="text"
                      name="username"
                      className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                      placeholder="Enter username"
                    />
                    {touched.username && errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <Field
                      type="password"
                      name="password"
                      className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary login-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : 'Sign In'}
                </button>

                <div className="signup-link">
                  Don't have an account?
                  <Link to="/sign" className="ms-2">Create Account</Link>
                  

                </div>
                 <div className="demo-accounts  text-center"> 

                  <h6>Demo Accounts</h6>
                  <p>Manager: ramu/ramu12 </p>
                  <p>Agent:  lakshmana/lakshmana</p>
                  <p>User: Raju /Raju12</p>
                   </div>
                
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
