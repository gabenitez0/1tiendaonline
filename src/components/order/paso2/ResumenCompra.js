import React from 'react';
import { Descriptions } from 'antd';

export default function ResumenCompra() {
    return (
        <Descriptions bordered>
            <Descriptions.Item label="Producto">
                Cloud Database
            </Descriptions.Item>
            <Descriptions.Item label="Precio">
                $1500
            </Descriptions.Item>
        </Descriptions>
    )
}
