import React, { useContext } from 'react'

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Radio, Space } from 'antd';

export default function MediosPago() {
    
    const { orden, dispatch } = useContext(contextoGlobal);
    
    const mediosPago = [
        {
            "id": "0",
            "name": "Paypal",
            "currency": "USD",
            "desc": "Tarjetas de crédito, débito y transferencia",
            "url": "https://paypal.com/"
        },
        {
            "id": "1",
            "name": "MercadoPago",
            "currency": "ARS",
            "desc": "Tarjetas de crédito, débito, efectivo y transferencia",
            "url": "https://mp.com/"
        },
        {
            "id": "2",
            "name": "Transferencia Bancaria",
            "currency": "ARS",
            "desc": "Transferencia directa",
            "url": "CBU o Alias"
        }
    ]

    const handleRadioChange = ({ target }) => {
        dispatch({
            type: 'establecerMetodoDePago',
            payload: {
                metodoDePago: target.value
            }
        });

    }

    return (
        <Radio.Group
            onChange={handleRadioChange} 
            defaultValue={orden.metodoDePago}
        >
        <Space direction="vertical">
            {mediosPago.map(service =>
                <Radio 
                    value={service.name} 
                    key={service.id}
                    disabled={
                        orden.metodoDePago !== service.name && orden.estaEnProcesoDePago === true   
                    }
                >
                    {service.name} ({service.currency}) - {service.desc}
                </Radio>
            )}
        </Space>
        </Radio.Group>
    )
}
