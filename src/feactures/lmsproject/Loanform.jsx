import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './LoanForm.css';
import { useAddloanMutation, useGetintrestratesQuery } from '../../APISERVER/lmsAPI';
import { useNavigate } from 'react-router-dom';
import Naverbars from './Header';



export default function Loanform() {
    var [addloanfn] = useAddloanMutation();
    var {isLoading,data}=useGetintrestratesQuery()
     console.log("int",isLoading,data)
    var navigate=useNavigate()
    return (
        <div className="loan-form-page">
            <Naverbars />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card loan-form-card">
                            <div className="card-body p-4 p-md-5">
                                <h1 className="text-center mb-4 form-title">Loan Application</h1>
                                <Formik
                                    initialValues={{
                                        typeofloan: "",
                                        loanitem: "",
                                        productcost: "",
                                        intrest: "",
                                        downpayment: "",
                                        customerMobile: "",
                                        customerName: "",
                                    }}
                                    validationSchema={Yup.object({
                                        typeofloan: Yup.string().required("Required"),
                                        loanitem: Yup.string().required("Required"),
                                        productcost: Yup.number().required("Required"),
                                        intrest: Yup.string().required("Required"),
                                        downpayment: Yup.number().required("Required"),
                                        customerMobile: Yup.string()
                                            .required("Required")
                                            .matches(/^[0-9]{10}$/, "Must be a valid mobile number"),
                                        customerName: Yup.string().required("Name Required"),
                                    })}
                                    onSubmit={(values) => {
                                        console.log("values", values);
                                        values.intrest=JSON.parse(values.intrest)
                                        console.log(values);
                                        addloanfn(values).then((res) => {
                                            console.log(res);
                                        });
                                        var role=window.localStorage.getItem("role")

                                        if(role=="admin"){
                                            navigate("/manegerdashbord")
                                        }
                                        if(role=="manager"){
                                            navigate("/agentdashbord")
                                        }

                                        }}
                                >
                                    {() => (
                                        <Form>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    as='select'
                                                    name="typeofloan"
                                                    className="form-control"
                                                    placeholder="Type of Loan"
                                                    id="typeofloan"
                                                   
                                                >
                                                    <option > Select Type of Loan</option>
                                                    <option value="vehical">vehical</option>
                                                  </Field>
                                                <label htmlFor="typeofloan">Type of Loan</label>
                                                <ErrorMessage name="typeofloan" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="loanitem"
                                                    className="form-control"
                                                    placeholder="Loan Item"
                                                    id="loanitem"
                                                />
                                                <label htmlFor="loanitem">Loan Item</label>
                                                <ErrorMessage name="loanitem" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="productcost"
                                                    className="form-control"
                                                    placeholder="Product Cost"
                                                    id="productcost"
                                                />
                                                <label htmlFor="productcost">Product Cost</label>
                                                <ErrorMessage name="productcost" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    as="select"
                                                    name="intrest"
                                                    className="form-control"
                                                    placeholder="Tenure"
                                                    id="tenure"
                                                >
                                                 <option value="">Select intrest</option>
                                                  {
            !isLoading && data?.intrestrates.map((lr)=>{
              return <option value={JSON.stringify(lr)}>{`${lr.rateofintrest}% for ${lr.tenure} ${lr.tenuretype}`}</option>
            })
          }
             </Field>
                                                <label htmlFor="tenure">select intrest</label>
                                                <ErrorMessage name="intrest" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="downpayment"
                                                    className="form-control"
                                                    placeholder="Down Payment"
                                                    id="downpayment"
                                                />
                                                
                                                <label htmlFor="downpayment">Down Payment</label>
                                                <ErrorMessage name="downpayment" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="customerMobile"
                                                    className="form-control"
                                                    placeholder="Customer Mobile"
                                                    id="customerMobile"
                                                />
                                                <label htmlFor="customerMobile">Customer Mobile</label>
                                                <ErrorMessage name="customerMobile" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="customerName"
                                                    className="form-control"
                                                    placeholder="Customer Name"
                                                    id="customerName"
                                                />
                                                <label htmlFor="customerName">Customer Name</label>
                                                <ErrorMessage name="customerName" component="div" className="text-danger" />
                                            </div>
                                            <button  className="btn btn-primary w-100">Add Loan</button>

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
