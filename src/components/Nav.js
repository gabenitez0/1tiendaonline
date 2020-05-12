import React, { useState, useEffect, useContext } from 'react';
import { contextoGlobal } from '../estado/contextoGlobal';

import {Link} from 'react-router-dom';

import logo from '../assets/img/logo.png';

import {Space, Button, Row, Col, Layout, Divider, Typography} from 'antd';
const {Header} = Layout;
const { Text } = Typography;

export default function Nav (props) {
  
  const { orden } = useContext(contextoGlobal);

  const [navItems, setItems] = useState([]);
  useEffect(() => {
    async function navItems() {
      const res = await fetch('https://api.1tiendaonline.com/menus/')
      const data = await res.json();
      setItems(data)
    }
    navItems()
  }, [])

  const logoSyle = {
    maxWidth: '210px',
    width: 'auto',
    maxHeight: '28px',
    height: 'auto',
    marginRight: '16px',
    position: 'relative',
    top: '-4px'
  }
  const navBg = {
    background: '#fff',
  }
  const navStyle = {
    position: 'relative',
    top: '4px'
  }
  const navLinkStyle = {
    padding: '8px 0'
  }

  
  const responsive = {
    color: 'gray'
  }

  return (
    <section id="nav" style={navBg}>
        <Header className="container noBg">
          <Row>
            <Col span={18}>
                <img src={logo} alt="logo" style={logoSyle}/>
                <Space align="center" size="0">
                {navItems.map(e =>
                <div style={navStyle}>
                  <Divider type="vertical"/>
                  <Link 
                    to={e.url}
                    key={e.id}
                    style={navLinkStyle}>
                      <Button size="small" type="link"><Text strong>{e.name}</Text></Button>
                  </Link>
                </div>)}
                </Space>
            </Col>
            <Col span={6}>
              <Row justify="end">
                <Space>
                  <Button type="link" style={navStyle}><Text strong>Contacto</Text></Button>
                  <Button type="primary" style={navStyle} onClick={() => props.setVisible(true)}>
                    {orden.costoTotal > 0 ? 'Continuar' : 'Empezar'}
                  </Button>
                </Space>
              </Row>
            </Col>
          </Row>
        </Header>
    </section>
  )
}
