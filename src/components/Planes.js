import React, {useState, useEffect, useContext} from 'react';
import { contextoGlobal } from '../estado/contextoGlobal';

//DEPENDENCIAS
import Fade from 'react-reveal/Fade';
/* import OrderPlan from "./order/OrderPlan"; */
import {Layout, Typography, Row, Col, Space, Popover, Card, Tag, Divider, Button, Skeleton} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;

export default function Planes(props) {
    const { orden, dispatch } = useContext(contextoGlobal);

    const [dataPlanes, setdataPlanes] = useState([]);
    useEffect(() => {
        async function dataPlanes() {
        const res = await fetch('https://api.1tiendaonline.com/planes/')
        const data = await res.json();
        setdataPlanes(data)
        }
        dataPlanes()
    }, [])

    const planes = {
        textAlign: 'center',
        padding: '12vh 0',
        minHeight: '85vh',
        background: 'white'
    }
    const plan = {
        background: '#fafdff',
        boxShadow: '0 2px 5px 1px rgba(111,158,188,.08), 0 5px 15px 6px rgba(74,142,254,.06)'
    }
    const planTitle = {
        margin: '0'
    }
    const price = {
        margin: '0'
    }

    const loading = dataPlanes.length === 0 ? true : false

    return (
        <section id="planes" style={planes}>
            <Content className="container">
                <Skeleton active loading={loading}>
                <Fade>
                <Space direction="vertical" size={8}>
                    <Title style={{margin: '0'}}>Empezá a Automatizar tus Ventas Ahora</Title>
                    <Text strong>Plataforma NEXT-GEN</Text>
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
                        {orden.subTotal <= 0 ? 'Empezar Ahora' : 'Completar Pedido'}
                    </Button>
                </Space>
                </Fade>
                
                <Row gutter={[16, 16]} justify="center" style={{margin: '48px 0'}}>
                    {dataPlanes.map(e =>
                    <Col lg={8} sm={12} xs={24} key={e.id}>
                    <Fade bottom>
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
                
                <Button 
                    type="primary" 
                    size="large"
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
                    {orden.subTotal <= 0 ? 'Empezar Ahora' : 'Completar Pedido'}
                </Button>
                </Skeleton>
            </Content>
        </section>
    )
}