import React, {useState, useEffect, useContext} from 'react';
import {Helmet} from "react-helmet";

import { contextoGlobal } from '../estado/contextoGlobal';

//DEPENDENCIAS
import Fade from 'react-reveal/Fade';
/* import OrderPlan from "./order/OrderPlan"; */
import {Layout, Typography, Row, Col, Space, Popover, Card, Tag, Divider, Button} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;

const FAQ = React.lazy(() => import("../components/FAQ"));

export default function Planes(props) {

    // eslint-disable-next-line no-unused-vars
    const { orden, dispatch } = useContext(contextoGlobal);

    const [dataPlanes, setdataPlanes] = useState([]);
    useEffect(() => {
        async function dataPlanes() {
        const res = await fetch('https://api-1tiendaonline.herokuapp.com/planes/')
        const data = await res.json();
        setdataPlanes(data)
        }
        dataPlanes()
    }, [])

    const planesTitle = {
        margin: '64px 0'
    }
    const planes = {
        textAlign: 'center',
        margin: '32px 0',
        minHeight: '85vh'
    }
    const plan = {
        background: '#fff',
        boxShadow: '0 2px 5px 1px rgba(111,158,188,.08), 0 5px 15px 6px rgba(74,142,254,.06)'
    }
    const planTitle = {
        margin: '0'
    }
    const price = {
        margin: '0'
    }

    return ( <>
        <section id="planes" style={planes}>
            <Helmet>
                <link rel="canonical" href="https://1tiendaonline.com/planes" />
                <title>Nuestros Planes de Tienda Online - 1tiendaonline</title>
                <meta name="description" content="Conoce nuestros planes de ecommerce. Creamos tu Tienda Online Autoadministrable con Tiendanube y Shopify."/>
                <meta name="keywords" content="planes, precios, tienda online, tienda digital, e-commerce, ecommerce, redes sociales, emprendimiento, emprendedor, ventas, compras, ropa, instagram, facebook, prestashop, woocommerce, tiendanube, shopify"></meta>
            </Helmet>

            <Content className="container">
                <Fade>
                <Space direction="vertical" size={8} style={planesTitle}>
                    <Title style={{margin: '0'}}>Armá tu plan</Title>
                    <Text strong>Tu tienda online a medida hoy</Text>
                    <Button 
                        type="primary" 
                        style={{marginTop: '8px'}} 
                        onClick={() => {
                            dispatch({
                              type: 'toggleDrawer',
                              payload: {
                                visible: true
                              }
                            });
                          document.body.style.width = 'calc(100% - 17px)'
                          }}
                    >
                        {orden.subTotal <= 0 ? 'Empezar' : 'Continuar'}
                    </Button>
                </Space>
                </Fade>
                
                <Row gutter={[16, 16]}>
                    {dataPlanes.map(e =>
                    <Col lg={6} sm={12} xs={24} key={e.id}>
                    <Fade>
                        <Card style={plan}>
                        <Space direction="vertical" size={16}>
                            <Space direction="vertical" size={8}>
                                <Tag color="success" style={{margin: '0'}}>{e.offer}</Tag>
                                <Title level={4} style={planTitle}>{e.name}</Title>
                                <Text>{e.desc}</Text>
                            </Space>
                            <Space size={8} style={price}>
                                <sup>ARS $</sup><Title level={2} style={{marginBottom: '8px'}}>{e.price}</Title><sub>/mes</sub>
                            </Space>
                            <Divider style={{margin: '0 0 16px'}}/>
                            <Space direction="vertical" size={16}>
                                {e.specs.map(a =>
                                <Popover content={a.desc} key={a.id} className="popover_planes">
                                    <Text>{a.name}</Text>
                                </Popover>
                                )}
                            </Space>
                        </Space>
                        </Card>
                    </Fade>
                    </Col>
                    )}
                </Row>
            </Content>
        </section>
        <FAQ />
    </>)
}
