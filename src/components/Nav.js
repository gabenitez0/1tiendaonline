import React, { useState, useEffect, useContext } from 'react';
import { contextoGlobal } from '../estado/contextoGlobal';

import {Link} from 'react-router-dom';

import logo from '../assets/img/logo.png';
import { MenuOutlined } from '@ant-design/icons';

import {Space, Button, Row, Col, Layout, Divider, Typography} from 'antd';
const {Header} = Layout;
const { Text } = Typography;

const MobileMenu = React.lazy(() => import('./MobileMenu'));

export default function Nav (props) {

  const [menuVisible, setMenuVisible] = useState(false);
  
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

  const tabletRes = window.innerWidth > 900;
  const mobileRes = window.innerWidth < 500;
  
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
    width: '100%'
  }
  const navStyle = {
    position: 'relative',
    top: '4px'
  }
  const navLinkStyle = {
    padding: '8px 0'
  }
  const menuIcon = {
    padding: '8px',
    fontSize: mobileRes ? '18px' : '20px',
    position: 'relative',
    top: '5px',
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
                <MenuOutlined style={menuIcon} onClick={() => setMenuVisible(true)}/>
                <Link to="/"><img src={logo} alt="logo" style={logoSyle}/></Link>
              </Space>
            }
            </Col>
            <Col span={6}>
              <Row justify="end">
                <Space>
                {tabletRes && <Button type="link" style={navStyle}><Text strong>Contacto</Text></Button>}
                  <Button type="primary" style={navStyle} onClick={() => props.setVisible(true)}>
                    {orden.costoTotal <= 0 ? 'Empezar' : 'Continuar'}
                  </Button>
                </Space>
              </Row>
            </Col>
          </Row>
        </Header>
        <MobileMenu visible={{menuVisible, setMenuVisible}} mobileRes={mobileRes}/>
    </section>
  )
}