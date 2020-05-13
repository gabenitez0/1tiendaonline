import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';

//DEPENDENCIAS
import {Layout, Typography, Button, Space} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;


export default function CallToAction() {
    const [dataCta, setdataCta] = useState([]);
    useEffect(() => {
        async function dataCta() {
        const res = await fetch('https://api.1tiendaonline.com/cta/')
        const data = await res.json();
        setdataCta(data)
        }
        dataCta()
    }, [])
    
    const calltoaction = {
        paddingTop: '64px',
        paddingBottom: '64px',
        height: '100vh',
        maxHeight: '400px',
        display: 'flex',
        textAlign: 'center',
        background: 'white'
    }


    return (
        <Fade>
        <section id="calltoaction" style={calltoaction} key={dataCta.id}>
            <Content className="container">
                <Space direction="vertical" size={16}>
                    <Title level={1} style={{margin: '0'}}>
                        {dataCta.title}
                    </Title>
                    <Text>
                        {dataCta.desc}
                    </Text>
                    <Link to={dataCta.link || '/'}>
                        <Button type="primary" size="large" style={{marginTop: '8px'}} onClick={dataCta.onClick}>
                            {dataCta.button}
                        </Button>
                    </Link>
                </Space>
            </Content>
        </section>
        </Fade>
    )
}