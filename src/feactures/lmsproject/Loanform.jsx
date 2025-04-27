import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './LoanForm.css';
import React from 'react';
import { useAddloanMutation, useGetintrestratesQuery } from '../../APISERVER/lmsAPI';
import { useNavigate } from 'react-router-dom';
import Naverbars from './Header';

const validationSchema = Yup.object({
  typeofloan: Yup.string().required('Loan type is required'),
  loanitem: Yup.string().required('Loan item is required'),
  productcost: Yup.number()
    .required('Product cost is required')
    .positive('Must be a positive number'),
  intrest: Yup.string().required('Interest rate is required'),
  downpayment: Yup.number()
    .required('Down payment is required')
    .positive('Must be a positive number'),
  customerMobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  customerName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Customer name is required'),
});

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
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
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
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="loanitem"
                                                    className="form-control"
                                                    placeholder="Loan Item"
                                                    id="loanitem"
                                                />
                                                <label htmlFor="loanitem">Loan Item</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="productcost"
                                                    className="form-control"
                                                    placeholder="Product Cost"
                                                    id="productcost"
                                                />
                                                <label htmlFor="productcost">Product Cost</label>
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
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="downpayment"
                                                    className="form-control"
                                                    placeholder="Down Payment"
                                                    id="downpayment"
                                                />
                                                
                                                <label htmlFor="downpayment">Down Payment</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="customerMobile"
                                                    className="form-control"
                                                    placeholder="Customer Mobile"
                                                    id="customerMobile"
                                                />
                                                <label htmlFor="customerMobile">Customer Mobile</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field
                                                    name="customerName"
                                                    className="form-control"
                                                    placeholder="Customer Name"
                                                    id="customerName"
                                                />
                                                <label htmlFor="customerName">Customer Name</label>
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">Add Loan</button>
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
