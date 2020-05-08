import React, {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';

//DEPENDENCIAS
import {Layout, Typography, Row, Col, Space} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;


export default function Features (props) {
    const [dataFeature, setDataFeature] = useState([]);
    useEffect(() => {
        async function dataFeature() {
        const res = await fetch('https://api.1tiendaonline.com/'+props.feature)
        const data = await res.json();
        setDataFeature(data)
        }
        dataFeature()
    }, [])
    
    const feature = {
        margin: '12vh auto'
    }

    return (
        dataFeature.map(e =>
            <section id="feature" style={{background: e.rowReverse ? '#f7fbff' : '#fff'}} key={e.id}>
                <Content className="container" style={feature}>
                    <Row align="middle" style={{flexDirection:  e.rowReverse === true ? 'row-reverse' : 'row'}}>
                        <Col md={12}>
                        <Fade bottom>
                            <img src={"https://api.1tiendaonline.com"+e.image.url} alt={e.image.alternativeText} style={{maxWidth: '135%', position:'relative', left: e.rowReverse ? '5%' : '-40%'}}/>
                        </Fade>
                        </Col>
                        <Col md={12}>
                        <Fade>
                            <Space direction="vertical" size={16}>
                                <Text strong>
                                    {e.comment}
                                </Text>
                                <Title level={2} style={{margin: '0'}}>
                                    {e.title}
                                </Title>
                                <Text>
                                    {e.desc}
                                </Text>
                            </Space>
                        </Fade>
                        </Col>
                    </Row>
                </Content>
            </section>
        )
    )
}
