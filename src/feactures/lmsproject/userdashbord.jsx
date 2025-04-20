import React, { useEffect, useState } from "react";
import Usernavebar from "./usernavebar";
import './UserDashboard.css';
import Naverbars from "./Header";
import {
  useGetuserdetailsQuery,
  useLazyGetloanQuery,
  useLazyGetuserdetailsQuery,
  usePaymentloanMutation,
} from "../../APISERVER/lmsAPI";

export default function Userdashbord() {
  var { isLoading, data } = useGetuserdetailsQuery();
  console.log(isLoading, data);
  var [paidemi, setpaidemi] = useState(0);
  var [unpaidemi, setunpaidemi] = useState(0);
  var [paymentfn] = usePaymentloanMutation();
  var [paylazyfn] = useLazyGetuserdetailsQuery();
  function payment(loanid, emiid) {
    console.log(loanid, emiid);
    paymentfn({ loanid: loanid, emiid: emiid }).then((res) => {
      console.log(res);
      paylazyfn().then((r) => {
        console.log(r);
      });
    });
  }

  const totalPaid =
    !isLoading &&
    data?.emis
      .filter((s) => s.emiStatus === "paid")
      .reduce((acc, emi) => acc + emi.emiAmount, 0);

  const totalUnpaid =
    !isLoading &&
    data?.emis
      .filter((s) => s.emiStatus !== "paid")
      .reduce((acc, emi) => acc + emi.emiAmount, 0);
  const totalpayment =
    !isLoading && data?.emis.reduce((acc, emi) => acc + emi.emiAmount, 0);
  useEffect(() => {
    var paid = 0;
    var UnPaid = 0;
    !isLoading &&
      data?.emis.forEach((s) => {
        if (s.emiStatus == "paid") {
          paid = paid + 1;
        } else {
          UnPaid = UnPaid + 1;
        }
      });
    setpaidemi(paid);
    setunpaidemi(UnPaid);
  }, [data]);
  return (
    <div className="user-dashboard bg-light min-vh-100">
      <Usernavebar />
      <div className="container py-4">
        <div className="row align-items-center mb-4">
          <div className="col-12 col-md-6">
            <h1 className="dashboard-title">User Dashboard</h1>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex flex-wrap gap-3">
              <div className="stat-card">
                <div className="stat-content">
                  <span className="stat-label">Paid EMIs</span>
                  <span className="stat-value">{paidemi}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <span className="stat-label">Unpaid EMIs</span>
                  <span className="stat-value">{unpaidemi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <h2 className="card-title mb-4">Payment Details</h2>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>EMI Amount</th>
                        <th>Due Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {!isLoading && data?.emis.map((emis) => (
                        <tr>
                          <td>₹{emis.emiAmount}</td>
                          <td>{new Date(emis.emiDate).toLocaleDateString()}</td>
                          <td>
                            {emis.emiStatus === "paid" ? (
                              <span className="status-badge paid">Paid</span>
                            ) : (
                              <button 
                                className="btn btn-primary btn-sm pay-btn"
                                onClick={() => payment(data?._id, emis._id)}
                              >
                                Pay Now
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody> */}
                    <tbody>
  {!isLoading && (() => {
 
    const firstUnpaidIndex = data?.emis.findIndex((emi) => emi.emiStatus !== "paid");

    return data?.emis.map((emis, index) => (
      <tr key={emis._id}>
        <td>₹{emis.emiAmount}</td>
        <td>{new Date(emis.emiDate).toLocaleDateString()}</td>
        <td>
          {emis.emiStatus === "paid" ? (
            <span className="status-badge paid">Paid</span>
          ) : index === firstUnpaidIndex ? (
            <button
              className="btn btn-primary btn-sm pay-btn"
              onClick={() => payment(data?._id, emis._id)}
            >
              Pay Now
            </button>
          ) : (
            <button className="btn btn-secondary btn-sm" disabled>
              Pending
            </button>
          )}
        </td>
      </tr>
    ));
  })()}
</tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <h2 className="card-title mb-4">Payment Summary</h2>
                <div className="summary-item">
                  <span>Total Payment</span>
                  <span className="amount">₹{totalpayment || 0}</span>
                </div>
                <div className="summary-item">
                  <span>Total Paid</span>
                  <span className="amount paid">₹{totalPaid || 0}</span>
                </div>
                <div className="summary-item">
                  <span>Total Unpaid</span>
                  <span className="amount unpaid">₹{totalUnpaid || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
