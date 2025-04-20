import React, { useEffect, useState } from 'react'
import Naverbars from './Header'
import { useApporveloanMutation, useGetloanQuery, useLazyGetloanQuery, useLoandisburseMutation } from '../../APISERVER/lmsAPI'
export default function Admindashbord() {
  var { isLoading, data } = useGetloanQuery()
  console.log(isLoading, data)
  var [apporvefn] = useApporveloanMutation()
  var [disburseloanfn] = useLoandisburseMutation()
  var [approvecount, setapprovecount] = useState(0)
  var [dowenpaymentcount, setdowenpaymentcount] = useState(0)
  var [disbursedcount, setdisbursedcount] = useState(0)
  var [Emiscount, setEmiscount] = useState(0)
  var [lazyfn]=useLazyGetloanQuery()
      
      // useEffect(()=>{
      //    var approv=0
      //    var disbur=0
      //    var downpaym=0
         
      //   !isLoading && data?.map((s)=>{
      //     var latestcount=[...s.status].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].code;
      //       console.log("ii",latestcount)
      //       if(latestcount==="applied"){
      //         approv=approv+1
               
      //       }
            
      //       if(latestcount==="approved"){
      //          downpaym=downpaym+1
             
      //       }
      //       if(latestcount==="downpayment Received"){
      //        setdisbursedcount(disbursedcount+1)
      //        console.log(disbursedcount)
      //       }
      //       if(latestcount==="disbursed"){
      //         disbur=disbur+1
      //       }
      //   })
      //   setapprovecount(approv)
      //   setEmiscount(disbur)
      //   setdowenpaymentcount(downpaym)
      // },[data])
      useEffect(() => {
        if (!isLoading && Array.isArray(data)) {
          let approv = 0;
          let disbur = 0;
          let downpaym = 0;
      
          data.forEach((s) => {
            const latestStatus = [...s.status].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0]?.code;
            if (latestStatus === "applied") approv++;
            if (latestStatus === "approved") downpaym++;
            if (latestStatus === "downpayment Received") disbur++;
            if (latestStatus === "disbursed") disbur++;
          });
      
          setapprovecount(approv);
          setEmiscount(disbur);
          setdowenpaymentcount(downpaym);
        }
      }, [data, isLoading]);
      
     
  function approve(id) {
    console.log(id)
    apporvefn(id).then((res) => {
      console.log(res)
      lazyfn().then((r)=>{
        console.log(r)
      })
    })
    
  }
  function disburse(id) {
    disburseloanfn(id).then((res) => {
      console.log(res)
      lazyfn().then((r)=>{
        console.log(r)
      })
    })
  }
 
  return (
    <div className="admin-dashboard bg-light min-vh-100">
      <Naverbars />
      <div className='container py-4'>
        <div className='row align-items-center mb-4'>
          <div className='col-12 col-md-6'>
            <h1 className='display-5 fw-bold text-primary mb-3'>Manager Dashboard</h1>
          </div>
          <div className='col-12 col-md-6'>
            <div className='d-flex flex-wrap gap-3'>
              <div className="card stats-card bg-white shadow-sm">
                <div className="card-body p-3">
                  <h6 className="text-muted mb-2">Approved</h6>
                  <h3 className="mb-0">{approvecount}</h3>
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

        <div className='card shadow-sm'>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table table-hover mb-0'>
                <thead>
                  <tr className='bg-primary text-white'>
                    <th className='py-3'>Customer Name</th>
                    <th className='py-3'>Loan Item</th>
                    <th className='py-3'>Product Cost</th>
                    <th className='py-3'>Status</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {!isLoading && data?.map((d) => {
                    const latestStatus = [...d.status].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].code;
                    return (
                      <tr key={d._id}>
                        <td className='py-3'>{d.customerName}</td>
                        <td className='py-3'>{d.loanitem}</td>
                        <td className='py-3'>₹{d.productcost}</td>
                        <td className='py-3'>
                          {latestStatus === 'applied' && (
                            <button className="btn btn-success btn-sm px-4" onClick={() => approve(d._id)}>
                              Approve
                            </button>
                          )}
                          {latestStatus === "approved" && (
                            <span className="badge bg-info px-3 py-2">Waiting for downpayment</span>
                          )}
                          {latestStatus === "downpayment Received" && (
                            <button className="btn btn-warning btn-sm px-4" onClick={() => disburse(d._id)}>
                              Disburse
                            </button>
                          )}
                          {latestStatus === "disbursed" && (
                            <span className="badge bg-secondary px-3 py-2">EMI Pending</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody> */}
                <tbody>
  {!isLoading && Array.isArray(data) && data.length > 0 ? (
    data.map((d) => {
      const latestStatus = [...d.status].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0]?.code;
      return (
        <tr key={d._id}>
          <td className='py-3'>{d.customerName}</td>
          <td className='py-3'>{d.loanitem}</td>
          <td className='py-3'>₹{d.productcost}</td>
          <td className='py-3'>
            {latestStatus === 'applied' && (
              <button className="btn btn-success btn-sm px-4" onClick={() => approve(d._id)}>
                Approve
              </button>
            )}
            {latestStatus === "approved" && (
              <span className="badge bg-info px-3 py-2">Waiting for downpayment</span>
            )}
            {latestStatus === "downpayment Received" && (
              <button className="btn btn-warning btn-sm px-4" onClick={() => disburse(d._id)}>
                Disburse
              </button>
            )}
            {latestStatus === "disbursed" && (
              <span className="badge bg-secondary px-3 py-2">EMI Pending</span>
            )}
          </td>
        </tr>
      );
    })
  ) : (
    !isLoading && (
      <tr>
        <td colSpan="4" className="text-center py-4 text-muted">
          No data found
        </td>
      </tr>
    )
  )}
</tbody>

              </table>
              {isLoading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
