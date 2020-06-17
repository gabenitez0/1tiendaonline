import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';

//DEPENDENCIAS
import {Layout, Typography, Button, Space, Skeleton} from 'antd';
const {Content} = Layout;
const {Text, Title} = Typography;


export default function CallToAction({id}) {
    const [dataCta, setdataCta] = useState([]);
    useEffect(() => {
        async function dataCta() {
        const res = await fetch('https://api-1tiendaonline.herokuapp.com/ctas/'+id)
        const data = await res.json();
        setdataCta(data)
        }
        dataCta()
    }, [id])
    
    const calltoaction = {
        paddingTop: '64px',
        paddingBottom: '64px',
        height: '100vh',
        maxHeight: '400px',
        display: 'flex',
        textAlign: 'center',
        background: 'white'
    }
    
    const loading = dataCta.length === 0 ? true : false

    return (
        <Fade>
        <section id="calltoaction" style={calltoaction} key={dataCta.id}>
            <Content className="container">
                <Skeleton active loading={loading}>
                <Space direction="vertical" size={16}>
                    <Title level={1} style={{margin: '0'}}>
                        {dataCta.title}
                    </Title>
                    <Text>
                        {dataCta.desc}
                    </Text>
                    {dataCta.targetBlank ?
                    <a 
                    href={dataCta.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    id="tag-contacto_webdev">
                        <Button 
                        type="primary" 
                        size="large" 
                        style={{marginTop: '8px'}} 
                        id="tag-contacto">
                            {dataCta.button}
                        </Button>
                    </a>
                    :
                    <Link to={dataCta.link || '/'}>
                        <Button type="primary" size="large" style={{marginTop: '8px'}} onClick={dataCta.onClick}>
                            {dataCta.button}
                        </Button>
                    </Link>
                    }
                </Space>
                </Skeleton>
            </Content>
        </section>
        </Fade>
    )
}