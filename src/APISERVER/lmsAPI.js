import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const LmsApi = createApi({
  reducerPath: 'LmsApi',
  baseQuery: fetchBaseQuery({ baseUrl:
         'https://lms-backend-qvwl.onrender.com'
          // 'http://localhost:8500'
   }),
  endpoints: (builder) => ({
    loginpage: builder.mutation({
        query: (user) => ({
            url: "/login",
            method: "POST",
            body: user,
          
          }),
    }),
    Addloan: builder.mutation({
        query: (values) => ({
            url: `/addloan`,
            method: 'POST',
            headers:{
              "authorization":window.localStorage.getItem("token")
            },
            body: values,
          }),
    }),
    signpage: builder.mutation({
        query: (values) => ({
            url: `/signup`,
            method: 'POST',
            body: values,
          }),
    }),
    getloan: builder.query({
        query: () => ({
            url: `/`,
            method: 'GET',
            headers:{
              'authorization':window.localStorage.getItem('token')
            }
          }),
    }),
    apporveloan: builder.mutation({
        query: (id) => ({
            url: `/approveloan/${id}`,
            method: 'PUT',
            headers:{
              'authorization':window.localStorage.getItem('token')
            }
          }),
    }),
    downpayment: builder.mutation({
        query: (id) => ({
            url: `/downpaymentReceived/${id}`,
            method: 'PUT',
            headers:{
              'authorization':window.localStorage.getItem('token')
            }
          }),
    }),
      loandisburse: builder.mutation({
        query: (id) => ({
            url: `/disburseloan/${id}`,
            method: 'PUT',
            headers:{
              'authorization':window.localStorage.getItem('token')
            }
          }),
    }),
      paymentloan: builder.mutation({
        query: ({loanid,emiid}) => ({
            url: `/payemi/${loanid}/${emiid}`,
            method: 'PUT',
            headers:{
              'authorization':window.localStorage.getItem('token')
            }
          }),
    }),
    getuserdetails: builder.query({
      query: () => ({
          url: `/userloandetails/`,
          method: 'GET',
          headers:{
            'authorization':window.localStorage.getItem('token')
          }
        }),
  }),
    getintrestrates: builder.query({
      query: () => ({
          url: `/intrestrates`,
          method: 'GET',
          headers:{
            'authorization':window.localStorage.getItem('token')
          }
        }),
  }),
  }),
})

export const { useLoginpageMutation,useAddloanMutation,useSignpageMutation,
  useGetloanQuery,
  useApporveloanMutation,
  useDownpaymentMutation,
  useLoandisburseMutation,
  useGetuserdetailsQuery,
  usePaymentloanMutation,
  useLazyGetloanQuery,
  useLazyGetuserdetailsQuery,
  useGetintrestratesQuery
} =LmsApi
