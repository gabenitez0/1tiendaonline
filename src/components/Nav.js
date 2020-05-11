import React, { useState, useEffect, useContext } from 'react';
import { contextoGlobal } from '../estado/contextoGlobal';

import {Link} from 'react-router-dom';

import logo from '../assets/img/logo.png';

import {Space, Button, Row, Col, Layout, Divider} from 'antd';
const {Header} = Layout;

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
  const buttonStyle = {
    position: 'relative',
    top: '4px'
  }

  return (
    <section id="nav" style={navBg}>
        <Header className="container noBg">
          <Row>
            <Col span={16}>
              <Space>
                <img src={logo} alt="logo" style={logoSyle}/>
                {navItems.map(e => 
                <Link 
                  to={e.url}
                  key={e.id}
                  style={buttonStyle}>
                <Divider type="vertical"/><Button type="link">{e.name}</Button>
                </Link>)}
              </Space>
            </Col>
            <Col span={8}>
              <Row justify="end">
                <Space>
                  <Button type="link" style={buttonStyle}>Contacto</Button>
                  <Button type="primary" style={buttonStyle} onClick={() => props.setVisible(true)}>
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
