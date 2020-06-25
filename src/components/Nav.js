import React, { useState, useEffect, useContext } from 'react';
import { contextoGlobal } from '../estado/contextoGlobal';
import {Link} from 'react-router-dom';
import useWindowSize from '../mixins/useWindowSize';

import logo from '../assets/img/logo.png';
import { MenuOutlined } from '@ant-design/icons';

import {Space, Button, Row, Col, Layout, Divider, Typography} from 'antd';
const {Header} = Layout;
const { Text } = Typography;

export default function Nav (props) {
  
  const { orden, dispatch } = useContext(contextoGlobal);

  const [navItems, setItems] = useState([]);
  useEffect(() => {
    async function navItems() {
      const res = await fetch('https://api.1tiendaonline.com/menus/')
      const data = await res.json();
      setItems(data)
    }
    navItems()
  }, [])

  const size = useWindowSize();
  const tabletRes = size.width > 900;
  const mobileRes = size.width < 500;
  
  const logoSyle = {
    maxWidth: '210px',
    width: 'auto',
    maxHeight: mobileRes ? '20px' : '28px',
    height: 'auto',
    marginRight: '16px',
    position: 'relative',
    top: tabletRes ? '-4px' : 0
  }
  const navBg = {
    background: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    borderBottom: '1px solid rgb(230, 239, 244)'
  }
  const navStyle = {
    position: 'relative',
    top: 2
  }
  const navLinkStyle = {
    padding: '8px 0'
  }
  const menuIcon = {
    padding: 8,
    fontSize: mobileRes ? 18 : 20,
    position: 'relative',
    top: 5,
    marginLeft: -8
  }

  return (
    <section id="nav" style={navBg}>
        <Header className="container noBg">
          <Row>
            <Col span={18}>
              {tabletRes ?
              <Space align="center" size="0">
                <Link to="/"><img src={logo} alt="logo" style={logoSyle}/></Link>
                <Space align="center" size="0">
                {navItems.map(e =>
                <div key={e.id} style={navStyle}>
                  <Divider type="vertical"/>
                  <Link 
                    to={e.url}
                    key={e.id}
                    style={navLinkStyle}>
                      <Button size="small" type="link"><Text strong>{e.name}</Text></Button>
                  </Link>
                </div>)}
                </Space>
              </Space> :
              <Space size={mobileRes ? 4 : 8} align="center">
                <MenuOutlined style={menuIcon} onClick={() => props.setMenuVisible(true)}/>
                <Link to="/"><img src={logo} alt="logo" style={logoSyle}/></Link>
              </Space>
            }
            </Col>
            <Col span={6}>
              <Row justify="end">
                <Space>
                  {tabletRes && 
                  <Button 
                    type="link" 
                    style={navStyle}
                    onClick={() => {
                      document.body.style.overflow = 'hidden';
                      document.body.style.width = 'calc(100% - 17px)';
                      props.setContactVisible(true)}}>
                      <Text strong>Contacto</Text>
                  </Button>}
                  <Button
                    type="primary"
                    size={size.width < 350 ? 'small' : 'default'}
                    style={navStyle} 
                    onClick={() => {
                      dispatch({
                        type: 'toggleDrawer',
                        payload: {
                          visible: true
                        }
                      });
                    document.body.style.width = 'calc(100% - 17px)'
                    }}>
                    {orden.subTotal <= 0 ? 'Empezar ahora' : 'Completar Pedido'}
                  </Button>
                </Space>
              </Row>
            </Col>
          </Row>
        </Header>
    </section>
  )
}