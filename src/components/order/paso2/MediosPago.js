import React from 'react'

import { Radio, Space } from 'antd';

export default function MediosPago() {
    const mediosPago = [
        {
            "id": 0,
            "name": "Paypal",
            "currency": "USD",
            "desc": "Tarjetas de crédito, débito y transferencia",
            "url": "https://paypal.com/"
        },
        {
            "id": 1,
            "name": "MercadoPago",
            "currency": "ARS",
            "desc": "Tarjetas de crédito, débito, efectivo y transferencia",
            "url": "https://mp.com/"
        },
        {
            "id": 2,
            "name": "Transferencia Bancaria",
            "currency": "ARS",
            "desc": "Transferencia directa",
            "url": "CBU o Alias"
        }
    ]
    return (
        <Radio.Group>
            <Space direction="vertical">
            {mediosPago.map(e =>
                <Radio value={e.id} key={e.id}>
                    {e.name} ({e.currency}) - {e.desc}
                </Radio>
            )}
            </Space>
        </Radio.Group>
    )
}
