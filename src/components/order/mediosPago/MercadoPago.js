import React, {useContext} from "react";
import {contextoGlobal} from '../../../estado/contextoGlobal';

import {message} from 'antd';

export default function MercadoPago({changeStep}) {
    const { orden } = useContext(contextoGlobal);
    const mercadopago = require("mercadopago");

    mercadopago.configure({
        access_token:
        "APP_USR-3617671749737057-061401-cc2460a77231f882579dcf2fcb1d3120-67919268"
    });

    let preference = {
        tracks: [
            {
                type: "facebook_ad",
                values: {
                    "pixel_id": '1198768203665510'
                }
            }
        ],
        back_urls: {
            success: "https://1tiendaonline.com/?compra-exitosa",
            failure: "https://1tiendaonline.com/?compra-denegada"
        },
        auto_return: "approved",
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
                    quantity: 1
                }
            }),
            ...orden.servicioDominio.map(servicio => {
                return {
                    title: servicio.name,
                    unit_price: servicio.total,
                    quantity: 1
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
    /* console.log(response); */
    // Este valor reemplazará el string "$$init_point$$" en tu HTML
    const script = document.createElement("script");

    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.async = true;
    script.setAttribute('data-preference-id', response.body.id);
    script.setAttribute('data-button-label', "MercadoPago");
    
    let form = document.getElementById('btn-mp');
    if(!global.init_point) form.appendChild(script);
        global.init_point = response.body.init_point;

    })

    .catch(function(error) {
        message.error(error)
        /* console.log(error) */
    });

    return <div id="btn-mp"></div>
}
