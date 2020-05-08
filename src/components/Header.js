import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';

//DEPENDENCIAS
import { Layout, Row, Typography, Button, Col, Space } from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;

export default function Header() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function data() {
        const res = await fetch('https://api.1tiendaonline.com/header/')
        const dataJson = await res.json();
        setData(dataJson)
        }
        data()
    }, [])

    const headerBg = {
        background: 'linear-gradient(-15deg, rgb(243, 249, 255), white 50%)'
    }
    const header = {
        padding: '8vh 0',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    }

    const api = "https://api.1tiendaonline.com"
    
    return (
        <section id="header" style={headerBg}>
            <Content className="container">
                <Fade cascade>
                <Row key={data.id} align="middle" style={header}>
                    <Col md={14}> 
                    {data.image &&
                        <img
                            srcSet={`
                            ${(api+data.image.formats.thumbnail.url)} 300w,
                            ${(api+data.image.formats.small.url)} 500w,
                            ${(api+data.image.formats.medium.url)} 750w,
                            ${(api+data.image.url)} 1000w`}
                            sizes="
                                (max-width: 300w) 300w,
                                (max-width: 500w) 500w,
                                (max-width: 750px) 750px,
                                1000px"
                            src={api+data.image.formats.medium.url} 
                            alt={data.image.alternativeText}
                            style={{width: '100%', maxWidth: '600px', margin: '16px 4vw'}}/>
                            
                        }
                    </Col>
                    <Col md={10}>
                        <Space direction="vertical" size={16}>
                            <Title level={1} style={{margin: '0'}}>
                                {data.title}
                            </Title>
                            <Text strong>
                                {data.desc}
                            </Text>
                            <Link to={data.buttonUrl}>
                                <Button type="primary" size="large" style={{marginTop: '8px'}}>
                                    {data.button}
                                </Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>
                </Fade>
            </Content>
        </section>
    )
}