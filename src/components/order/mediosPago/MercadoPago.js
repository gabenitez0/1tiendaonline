import React, {useContext} from "react";
import {contextoGlobal} from '../../../estado/contextoGlobal';

import {message} from 'antd';

export default function MercadoPago({changeStep}) {
    const { orden } = useContext(contextoGlobal);
    const mercadopago = require("mercadopago");

    mercadopago.configure({
        sandbox: true,
        access_token:
        "TEST-3617671749737057-061222-e548ca6cd2982343ab894dbed6d46697-67919268"
    });

    let preference = {
        items: [
            ...orden.serviciosDiseno.map(servicio => {
                return {
                    title: servicio.name,
                    unit_price: servicio.total,
                    quantity: servicio.qty
                }
            }),
            ...orden.serviciosPublicidad.map(servicio => {
                return {
                    title: servicio.name,
                    unit_price: servicio.total,
                    quantity: servicio.qty
                }
            }),
            ...orden.servicioDominio.map(servicio => {
                return {
                    title: servicio.name,
                    unit_price: servicio.total,
                    quantity: servicio.qty
                }
            }),
            ...orden.serviciosIncluidos.map(servicio => {
                return {
                    title: servicio.name,
                    unit_price: servicio.total,
                    quantity: 1
                }
            })
        ]
    };

    mercadopago.preferences
        .create(preference)
        .then(async function(response) {
        console.log(response);
        // Este valor reemplazará el string "$$init_point$$" en tu HTML
        const res = await response;
        /* global.init_point = response.body.init_point; */
        })
        .catch(function(error) {
            message.error(error)
            console.log(error);
        });

    return (
            <script
            src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
            data-preference-id={res}
            ></script>
    );
}
