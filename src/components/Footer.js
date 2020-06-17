import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

//DEPS
import {Layout, Typography, Space, Skeleton} from 'antd';
const {Content} = Layout;
const {Text} = Typography;

export default function Footer() {
    const [dataFooter, setdataFooter] = useState([]);
    useEffect(() => {
        async function dataFooter() {
        const res = await fetch('https://api-1tiendaonline.herokuapp.com/footers/')
        const data = await res.json();
        setdataFooter(data)
        }
        dataFooter()
    }, [])

    const footer = {
        padding: '48px 0 16px',
        background: 'linear-gradient(0deg, rgb(247, 249, 255), white 50%)',
        borderTop: '1px solid #e6eff4'
    }
    const footerTitle = {
        display: 'block',
        fontSize: '15px',
        marginBottom: '8px',
        color: '#114c7d'
    }
    const copy = {
        display: 'block',
        marginTop: '8px',
        textAlign: 'center'
    }

    const loading = dataFooter.length === 0 ? true : false

    return (
        <section id="footer" style={footer}>
            <Content className="container">
                <Skeleton active loading={loading}>
                    <Space align="start" className="footer-col" size={24}>
                    {dataFooter.map(e =>
                        <Space key={e.id} direction="vertical" size={8}>
                            <Text strong style={footerTitle}>{e.title}</Text>
                            {e.links.map(a =>
                            a.targetBlank ? 
                            <a href={a.url} key={a.id} target="_blank" rel="noopener noreferrer"><Text>{a.name}</Text></a> 
                            :
                            <Link to={a.url} key={a.id}><Text>{a.name}</Text></Link>
                            )}
                        </Space>
                    )}
                    </Space>
                </Skeleton>
                <Text style={copy}>
                    © 2020 1tiendaonline. Todos los derechos reservados
                </Text>
            </Content>
        </section>
    )
}
