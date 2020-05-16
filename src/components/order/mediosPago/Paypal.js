import React, { useState, useRef, useEffect } from 'react';

export default function Product({ product }) {
    const [error, setError] = useState(null);
    const paypalRef = useRef();
  
    useEffect(() => {
      window.paypal
        .Buttons({
        locale: 'es_AR',
        style: {
            height: 32,
            size: 'responsive',
            color: 'blue',
            layout: 'horizontal',
            tagline: 'false',
            label: 'pay'
        },
        createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.description,
                  amount: {
                    currency_code: 'USD',
                    value: product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: err => {
            setError(err);
            console.error(err);
          },
        })
        .render(paypalRef.current);
    }, [product.description, product.price]);
  
    return (
      <div>
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <div ref={paypalRef}></div>
      </div>
    );
}