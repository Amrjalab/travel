'use client';
import { useEffect } from 'react';

export default function PayTestPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.paypal) {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '100.00', // المبلغ الوهمي
              },
            }],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert('✅ Payment completed by ' + details.payer.name.given_name);
            console.log(details); // هون فيك تسجل الدفع مثلاً بقاعدة بيانات
          });
        },
      }).render('#paypal-button-container');
    }
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Test PayPal Payment</h1>
      <div id="paypal-button-container"></div>
    </div>
  );
}
