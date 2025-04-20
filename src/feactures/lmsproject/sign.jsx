import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useSignpageMutation } from '../../APISERVER/lmsAPI';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .required('Password is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required')
});

export default function Signpage() {
    const [signfn] = useSignpageMutation();
    const navigate = useNavigate();

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1 className="signup-title">Create Account</h1>
                        <p className="signup-subtitle">Join us today!</p>
                    </div>

                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            mobile: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, setStatus }) => {
                            setStatus(null);
                            signfn(values)
                                .then(() => {
                                    navigate("/login");
                                })
                                .catch(() => {
                                    setStatus("Registration failed. Please try again.");
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({ errors, touched, status, isSubmitting }) => (
                            <Form className="signup-form">
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

                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-phone"></i>
                                        </span>
                                        <Field
                                            type="text"
                                            name="mobile"
                                            className={`form-control ${touched.mobile && errors.mobile ? 'is-invalid' : ''}`}
                                            placeholder="Enter mobile number"
                                        />
                                        {touched.mobile && errors.mobile && (
                                            <div className="invalid-feedback">{errors.mobile}</div>
                                        )}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary signup-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Creating Account...
                                        </>
                                    ) : 'Create Account'}
                                </button>

                                <div className="login-link">
                                    Already have an account? 
                                    <Link to="/login" className="ms-2">Sign In</Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
