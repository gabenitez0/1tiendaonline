import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

//DEPS
import {Layout, Typography, Row, Col, Space} from 'antd';
const {Content} = Layout;
const {Text} = Typography;

export default function Footer() {
    const [dataFooter, setdataFooter] = useState([]);
    useEffect(() => {
        async function dataFooter() {
        const res = await fetch('https://api.1tiendaonline.com/footers/')
        const data = await res.json();
        setdataFooter(data)
        }
        dataFooter()
    }, [])

    const footer = {
        padding: '46px 0 16px',
        background: 'linear-gradient(0deg, rgb(247, 249, 255), white 50%)',
        borderTop: '1px solid #e6eff4'
    }
    const footerTitle = {
        display: 'block',
        fontSize: '15px',
        marginBottom: '8px'
    }
    const column = {
        padding: '16px'
    }
    const copy = {
        display: 'block',
        marginTop: '32px',
        textAlign: 'center'
    }

    return (
        <section id="footer" style={footer}>
            <Content className="container">
                <Row>
                {dataFooter.map(e =>
                <Col md={6} sm={12} xs={24} style={column} key={e.id}>
                    <Space direction="vertical" size={8}>
                        <Text strong style={footerTitle}>{e.title}</Text>
                        {e.links.map(a =>
                        <Link to={a.url} key={a.id}>{a.name}</Link>
                        )}
                    </Space>
                </Col>
                )}
                </Row>
                <Text style={copy}>
                    © 2020 1tiendaonline. Todos los derechos reservados
                </Text>
            </Content>
        </section>
    )
}
