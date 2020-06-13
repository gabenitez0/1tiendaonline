import React, {useState, useEffect} from 'react'
import {Drawer, Space, Typography, Tag, Divider, Button} from 'antd';
import { WhatsAppOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import logo from '../assets/img/logo.png';

import useWindowSize from '../mixins/useWindowSize';
const { Text } = Typography;

export default function MobileMenu(props) {

  const size = useWindowSize();
  const responsive = size.width < 350

  const [navItems, setItems] = useState([]);
  useEffect(() => {
    async function navItems() {
      const res = await fetch('https://api.1tiendaonline.com/menus/')
      const data = await res.json();
      setItems(data)
    }
    navItems()
  }, [])

  const block = {
    display: 'block',
    textAlign: responsive ? 'center' : 'left',
    fontSize: 16
  }

  const logoSyle = {
    maxWidth: '210px',
    width: 'auto',
    maxHeight: '24px',
    height: 'auto'
  }

  return(
    <Drawer
      placement="left"
      title={<img alt="logo 1tiendaonline" src={logo} style={logoSyle}/>}
      closable={true}
      onClose={() => props.setMenuVisible(false)}
      visible={props.menuVisible}
      width={responsive ? "100%" : 300}
    >
      <Space direction="vertical" size={16} style={{width: '100%', marginTop: 12}}>
        {navItems.map(e =>
          <Link 
            to={e.url}
            onClick={() => props.setMenuVisible(false)}
            style={block}
            key={e.id}>
              <Text strong>{e.name}</Text>
          </Link>
        )}
        <Divider style={{margin: '16px 0'}}/>
        <Space direction="vertical" style={{textAlign: responsive ? 'center' : 'left',}}>
          <Text strong style={{fontSize: 16}}>Contacto WhatsApp</Text>
          <Text>Si tenés cualquier duda, envianos un mensaje solicitando agendar una llamada o directamente con tu consulta.</Text>
          <Text strong>Tiempo de respuesta: 5 minutos</Text>
          <Button style={{marginTop: 8}} id="tag-contacto">
            <a 
            href="https://api.whatsapp.com/send?phone=5491122542474" 
            target="_blank" 
            rel="noopener noreferrer"
            id="tag-contacto">
              <WhatsAppOutlined style={{marginRight: 8}} />Enviar mensaje
            </a>
          </Button>
        </Space>
        <Divider style={{margin: '16px 0'}}/>
        <Space direction="vertical" style={{textAlign: responsive ? 'center' : 'left', width: '100%'}}>
          <a href="https://www.instagram.com/1tiendaonline_/" target="_blank" rel="noopener noreferrer"><Tag icon={<InstagramOutlined />} color="#a43eb0">1tiendaonline_</Tag></a>
          <a href="https://www.facebook.com/1tiendaonline/" target="_blank" rel="noopener noreferrer"><Tag icon={<FacebookOutlined />} color="rgb(59, 89, 153)">1tiendaonline</Tag></a>
          <Tag icon={<WhatsAppOutlined />} color="mediumseagreen">+54 1122542474</Tag>
        </Space>
      </Space>
    </Drawer>
  )
}