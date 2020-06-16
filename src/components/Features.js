import React, { useState, useEffect } from 'react';

//DEPENDENCIAS
import Fade from 'react-reveal/Fade';
import ProgressiveImage from "react-progressive-graceful-image";
import useWindowSize from '../mixins/useWindowSize';
import {Layout, Typography, Row, Col, Space, Skeleton} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;


export default function Features ({ feature }) {
    const [dataFeature, setDataFeature] = useState([]);
    useEffect(() => {
        async function dataFeature() {
            const res = await fetch('https://api.1tiendaonline.com/' + feature)
            const data = await res.json();
            setDataFeature(data)
        }
        
        dataFeature();
    }, [feature])

    const size = useWindowSize();
    const tablet = size.width <= 767

    const api = "https://api.1tiendaonline.com";
    const loading = dataFeature.length === 0 ? true : false

    const featureStyles = {
        padding: '12vh 48px',
        maxWidth: 1140,
        margin: 'auto'
    }
    const loadingStyle = {
        padding: loading && '8vh 48px',
        width: loading && '100%',
        maxWidth: loading && 1140,
        margin: loading && 'auto'
    }

    
    return (
        <section id="feature" style={loadingStyle}>
        <Skeleton active loading={loading}>
        {dataFeature.map(e =>
            <div style={{background: e.rowReverse ? '#f7fbff' : '#fff'}} key={e.id}>
                <Content style={featureStyles}>
                    <Row align="middle" style={{flexDirection:  e.rowReverse === true ? 'row-reverse' : 'row'}}>
                        <Col md={12} style={{width: '100%'}}>
                            <Fade bottom>
                                <ProgressiveImage
                                    src={api+e.image.url}
                                    srcSetData={{
                                        srcSet: e.image.map((a, i) => 
                                        `${api+a.url} ${500 + 200 * i+'w'}`).join(', '),
                                        sizes: '(max-width: 520px) 500px, 700px'
                                    }}
                                    placeholder={api+e.lazyImage.url}
                                >
                                    {(src, loading, srcSetData) => <img 
                                        src={src}
                                        srcSet={srcSetData.srcSet}
                                        sizes={srcSetData.sizes}
                                        alt={e.title}
                                        style={{
                                            filter: loading ? 'blur(15px)' : 'blur(0)',
                                            transition: 'all .5s ease',
                                            position:'relative', 
                                            width: tablet ? '100%' : '135%', 
                                            maxWidth: 700, 
                                            left: tablet ? 0 : e.rowReverse ? '5%' : '-40%',
                                            marginBottom: tablet ? 24 : 0
                                        }}
                                    />}
                                </ProgressiveImage>
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
            </div>
        )}
        </Skeleton>
        </section>
    )
}
