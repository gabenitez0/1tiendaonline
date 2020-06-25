import React, { useState, useEffect } from 'react';

//DEPENDENCIAS
import Fade from 'react-reveal/Fade';
import ProgressiveImage from "react-progressive-graceful-image";
import useWindowSize from '../mixins/useWindowSize';
import { Layout, Row, Typography, Button, Col, Space, Skeleton } from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;

export default function Header(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function data() {
            const res = await fetch('https://api.1tiendaonline.com/'+props.page)
            const dataJson = await res.json();
            setData(dataJson);
        }
        data();
    }, [props.page])

    const size = useWindowSize();
    const tablet = size.width <= 767

    const headerBg = {
        background: 'linear-gradient(-15deg, rgb(243, 249, 255), white 50%)'
    }
    const header = {
        padding: '8vh 0',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        textAlign: tablet ? 'center' : 'left'
    }

    const api = "https://api.1tiendaonline.com";
    const loading = data.length === 0 ? true : false
    
    return (
        <section id="header" style={headerBg}>
            <Content className="container">
                <Fade cascade>
                <Row key={data.id} align="middle" style={header}>
                <Skeleton active loading={loading}>
                    <Col md={14} style={{width: '100%'}}> 
                        {data.image && data.lazyImage &&
                            <ProgressiveImage
                                src={api+data.image.url}
                                placeholder={api+data.lazyImage.url}
                            >
                                {(src, loading) => <img 
                                    src={src} 
                                    alt={data.image.alternativeText} 
                                    style={{
                                        filter: loading ? 'blur(5px)' : 'blur(0)',
                                        transition: 'all .5s ease',
                                        width: '100%',
                                        justifyContent: 'center',
                                        maxWidth: '600px', 
                                        margin: tablet ? '0 0 16px' : '16px 4vw'
                                    }}
                                />}
                            </ProgressiveImage>
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
                            <Space style={{marginTop: '8px'}}>
                            {data.comment === 'index' ?
                                <Button 
                                    type="primary" 
                                    size="large"
                                    href={data.buttonUrl}>
                                    {data.button}
                                </Button>
                            :
                            <a
                            href={data.buttonUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            id="tag-contacto">
                                <Button type="primary" size="large">
                                    {data.button}
                                </Button>
                            </a>
                            }
                            {data.comment === 'index' &&
                            <a 
                            id="tag-contacto" 
                            href="https://api.whatsapp.com/send?phone=5491122542474"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                <Button type="link">
                                    Tengo una duda
                                </Button>
                            </a>
                            }
                            </Space>
                        </Space>
                    </Col>
                </Skeleton>
                </Row>
                </Fade>
            </Content>
        </section>
    )
}