import React from 'react';

export const PaymentTable = ({ emis, onPayment, loanId }) => {
  const firstUnpaidIndex = emis?.findIndex((emi) => emi.emiStatus !== "paid");

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>EMI Amount</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {emis?.map((emi, index) => (
            <tr key={emi._id}>
              <td>₹{emi.emiAmount}</td>
              <td>{new Date(emi.emiDate).toLocaleDateString()}</td>
              <td>
                {emi.emiStatus === "paid" ? (
                  <span className="status-badge paid">Paid</span>
                ) : index === firstUnpaidIndex ? (
                  <button
                    className="btn btn-primary btn-sm pay-btn"
                    onClick={() => onPayment(loanId, emi._id)}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};