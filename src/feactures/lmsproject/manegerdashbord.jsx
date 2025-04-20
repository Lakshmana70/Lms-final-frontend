import React, { useEffect, useState } from "react";
import Naverbars from "./Header";
import { useDownpaymentMutation, useGetloanQuery, useLazyGetloanQuery } from "../../APISERVER/lmsAPI";
import './ManagerDashboard.css';

export default function Manegerdashbord() {
  const { isLoading, data } = useGetloanQuery();
  const [dowenpaymentfn] = useDownpaymentMutation();
  const [lazyfn] = useLazyGetloanQuery();

  const [approvingcount, setapprovingcount] = useState(0);
  const [dowenpaymentcount, setdowenpaymentcount] = useState(0);
  const [disbursedcount, setdisbursedcount] = useState(0);
  const [Emiscount, setEmiscount] = useState(0);

  useEffect(() => {
    if (!isLoading && Array.isArray(data)) {
      let approv = 0;
      let disbur = 0;
      let downpaym = 0;
      let disbursed = 0;

      data.forEach((s) => {
        const latestStatus = [...s.status].sort((a, b) =>
          a.timestamp < b.timestamp ? 1 : -1
        )[0].code;

        if (latestStatus === "applied") approv++;
        if (latestStatus === "approved") downpaym++;
        if (latestStatus === "downpayment Received") disbursed++;
        if (latestStatus === "disbursed") disbur++;
      });

      setapprovingcount(approv);
      setdowenpaymentcount(downpaym);
      setdisbursedcount(disbursed);
      setEmiscount(disbur);
    }
  }, [data, isLoading]);

  function downpayment(id) {
    dowenpaymentfn(id).then((res) => {
      console.log(res);
      lazyfn().then((r) => {
        console.log(r);
      });
    });
  }

  return (
    <div className="manager-dashboard">
      <Naverbars />
      <div className="dashboard-content">
        <div className="container py-3">
         
       <div className='row align-items-center mb-4'>
          <div className='col-12 col-md-6'>
            <h1 className='display-5 fw-bold text-primary mb-3'>Agent Dashboard</h1>
          </div>
          <div className='col-12 col-md-6'>
            <div className='d-flex flex-wrap gap-3'>
              <div className="card stats-card bg-white shadow-sm">
                <div className="card-body p-3">
                  <h6 className="text-muted mb-2">Approved</h6>
                  <h3 className="mb-0">{approvingcount}</h3>
                </div>
              </div>
              <div className="card stats-card bg-white shadow-sm">
                <div className="card-body p-3">
                  <h6 className="text-muted mb-2">Down Payment</h6>
                  <h3 className="mb-0">{dowenpaymentcount}</h3>
                </div>
              </div>
              <div className="card stats-card bg-white shadow-sm">
                <div className="card-body p-3">
                  <h6 className="text-muted mb-2">Disbursed</h6>
                  <h3 className="mb-0">{disbursedcount}</h3>
                </div>
              </div>
              <div className="card stats-card bg-white shadow-sm">
                <div className="card-body p-3">
                  <h6 className="text-muted mb-2">EMIs Pending</h6>
                  <h3 className="mb-0">{Emiscount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="card table-card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Loan Item</th>
                      <th>Product Cost</th>
                      <th>Status</th>
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
                    ) : Array.isArray(data) && data.length > 0 ? (
                      data.map((d) => {
                        const latest = [...d.status].sort((a, b) =>
                          a.timestamp < b.timestamp ? 1 : -1
                        )[0].code;

                        return (
                          <tr key={d._id}>
                            <td>{d.customerName}</td>
                            <td>{d.loanitem}</td>
                            <td>₹{d.productcost}</td>
                            <td>
                              {latest === "applied" && (
                                <span className="status-badge pending">
                                  Waiting for Approval
                                </span>
                              )}
                              {latest === "approved" && (
                                <button
                                  className="btn btn-primary action-btn"
                                  onClick={() => downpayment(d._id)}
                                >
                                  Collect Downpayment
                                </button>
                              )}
                              {latest === "downpayment Received" && (
                                <span className="status-badge processing">
                                  Awaiting Disbursement
                                </span>
                              )}
                              {latest === "disbursed" && (
                                <span className="status-badge success">
                                  Loan Sanctioned
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">
                          <div className="empty-state">
                            <i className="bi bi-inbox"></i>
                            <p>No loan applications found</p>
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
