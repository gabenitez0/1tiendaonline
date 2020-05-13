import React from 'react';
import { Table, Tag } from 'antd';

export default function ResumenCompra() {
    const columnsPlan = [
        {
            title: 'Plan de tienda',
            dataIndex: 'plan',
            key: 'plan',
            width: '50%'
        },
        {
            title: 'Sin cargo',
            dataIndex: 'promo',
            key: 'promo',
            width: '25%',
            render: promo => <Tag color="success" style={{margin: '0'}}>{promo}</Tag>
        },
        {
            title: 'Precio',
            dataIndex: 'pricePlan',
            key: 'pricePlan',
            width: '25%',
            render: price => <> {price}<sub style={{bottom: -1}}>/mes</sub> </>
        }
    ]
    const dataPlan = [
        {
            key: '1',
            plan: 'Plan Inicial',
            promo: '90 días',
            pricePlan: '$'+899
        }
    ]

    const columnsServicios = [
        {
            title: 'Servicios adicionales',
            dataIndex: 'service',
            key: 'service',
            width: '50%'
        },
        {
            title: 'Cantidad',
            dataIndex: 'qty',
            key: 'qty',
            width: '25%'
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
            width: '25%'
        }
    ]
    const dataServicios = [
        {
            key: '1',
            service: 'Diseño de logotipo',
            qty: '1',
            price: '$'+1500
        },
        {
            key: '2',
            service: 'Publicidad en Google',
            qty: '30 días',
            price: '$'+4000
        }
    ]

    const heightResponsive = window.innerHeight < 700;
    return ( <>
        <Table 
            columns={columnsPlan}
            dataSource={dataPlan}
            pagination={false}
            size={heightResponsive ? 'small' : 'middle'}
            style={{marginBottom: 16}}
        />
        <Table 
            columns={columnsServicios}
            dataSource={dataServicios}
            pagination={false}
            size={heightResponsive ? 'small' : 'middle'}
            summary={() => ( <>
                <Table.Summary.Row>
                    <Table.Summary.Cell>Instalación, configuración inicial y soporte técnico por chat</Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell>$2000</Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row style={{background: '#fafafa'}}>
                    <Table.Summary.Cell>Total</Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell>$5000</Table.Summary.Cell>
                </Table.Summary.Row>
            </>)}
        />
    </>)
}
