import React from 'react'

const Payment = (options) => {
  const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  return (
    <div>Payment</div>
  )
}

export default Payment