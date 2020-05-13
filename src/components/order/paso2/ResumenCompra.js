import React from 'react';
import { Table } from 'antd';

export default function ResumenCompra() {
    const columns = [
        {
            title: 'Servicio',
            dataIndex: 'service',
            key: 'service'
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price'
        }
    ]
    const data = [
        {
            key: '1',
            service: 'Plan Inicial',
            price: '$'+899
        },
        {
            key: '2',
            service: 'Diseño de logotipo',
            price: '$'+1500
        }
    ]
    return (
        <Table 
            columns={columns}
            dataSource={data}
            pagination={false}
            size="middle"
            bordered
            summary={() => ( <>
                <Table.Summary.Row>
                    <Table.Summary.Cell>Instalación y configuración inicial</Table.Summary.Cell>
                    <Table.Summary.Cell>$2000</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                    <Table.Summary.Cell>Total</Table.Summary.Cell>
                    <Table.Summary.Cell>$5000</Table.Summary.Cell>
                </Table.Summary.Row>
            </>)}
        />
    )
}
