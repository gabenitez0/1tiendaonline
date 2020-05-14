import React, { useContext } from 'react';

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Table, Tag } from 'antd';

export default function ResumenCompra() {

    const { orden } = useContext(contextoGlobal);

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
            render: promo => <Tag color="success" style={{ margin: '0' }}>{promo}</Tag>
        },
        {
            title: 'Precio',
            dataIndex: 'pricePlan',
            key: 'pricePlan',
            width: '25%',
            render: price => <> {price}<sub style={{ bottom: -1 }}>/mes</sub> </>
        }
    ]
    const dataPlan = [
        {
            key: orden.planTienda.id,
            plan: orden.planTienda.name,
            promo: orden.planTienda.offer,
            pricePlan: '$' + orden.planTienda.total
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
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: '25%'
        }
    ]

    const dataServicios = [
        ...orden.serviciosDiseno.map(servicio => {
            return {
                key: servicio.id,
                service: servicio.name,
                qty: servicio.qty,
                total: '$' + servicio.total
            }
        }),
        ...orden.serviciosPublicidad.map(servicio => {
            return {
                key: servicio.id,
                service: servicio.name,
                qty: servicio.time,
                total: '$' + servicio.total
            }
        }),
        ...orden.servicioDominio.map(servicio => {
            return {
                key: servicio.id,
                service: servicio.name,
                qty: servicio.time,
                total: '$' + servicio.total
            }
        }),
        ...orden.serviciosIncluidos.map(servicio => {
            return {
                key: servicio.id,
                service: servicio.name,
                total: '$' + servicio.total
            }
        })
    ]

    const heightResponsive = window.innerHeight < 700;

    return (
        <>
            <Table
                columns={columnsPlan}
                dataSource={dataPlan}
                pagination={false}
                size={heightResponsive ? 'small' : 'middle'}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columnsServicios}
                dataSource={dataServicios}
                pagination={false}
                size={heightResponsive ? 'small' : 'middle'}
                summary={() => (
                    <>
                        <Table.Summary.Row style={{ background: '#fafafa' }}>
                            <Table.Summary.Cell>Subtotal</Table.Summary.Cell>
                            <Table.Summary.Cell></Table.Summary.Cell>
                            <Table.Summary.Cell>
                                ${
                                    orden.subTotal + 
                                    orden.serviciosIncluidos
                                        .map(servicio => servicio.total ? servicio.total : 0)
                                        .reduce((a, c) => a + c)
                                }
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row style={{ background: '#fafafa' }}>
                            <Table.Summary.Cell>Descuento</Table.Summary.Cell>
                            <Table.Summary.Cell></Table.Summary.Cell>
                            <Table.Summary.Cell>${orden.planTienda.total}</Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row style={{ background: '#fafafa' }}>
                            <Table.Summary.Cell>Total</Table.Summary.Cell>
                            <Table.Summary.Cell></Table.Summary.Cell>
                            <Table.Summary.Cell>${orden.totalFinal}</Table.Summary.Cell>
                        </Table.Summary.Row>      
                    </>                  
                )}
            />
        </>
    )
}
