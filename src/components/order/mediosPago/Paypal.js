import React, { useRef, useEffect, useContext } from 'react';
import {contextoGlobal} from '../../../estado/contextoGlobal';

import {message} from 'antd';

export default function Product({changeStep}) {
  const { orden } = useContext(contextoGlobal);
  const paypalRef = useRef();

  const product = {
    price: orden.totalFinal/100,
    name: 'Orden de compra 1tiendaonline'
  }

  useEffect(() => {
    window.paypal
      .Buttons({
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
          message.success('¡Compra realizada con exito!');
          changeStep();
          /* const order = await actions.order.capture();
          console.log(order); */
        },
        onError: err => {
          message.error(err)
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);
  
  return <div ref={paypalRef}></div>
}