import React from 'react';

import { MessageOutlined, WhatsAppOutlined } from '@ant-design/icons';
import {Modal, Button, Typography, Space} from 'antd';
const {Text} = Typography;


export default function Contacto(props) {

  const wppButton = {
    backgroundColor: 'mediumseagreen',
    borderColor: 'mediumseagreen'
  }

  return (
    <Modal
      title="¿Cómo podemos ayudarte?"
      visible={props.contactVisible}
      onCancel={() => props.setContactVisible(false)}
      afterClose={() => {
        document.body.style.overflow = null;
        document.body.style.width = null}}
      footer={[
        <Space size={16} key={1}>
          <Text>+54 1122542474</Text>
          <Button key="contact" type="primary" style={wppButton}>
            <a 
            href="https://api.whatsapp.com/send?phone=5491122542474" 
            target="_blank" 
            rel="noopener noreferrer" 
            id="tag-contacto">
              <WhatsAppOutlined style={{marginRight: 8}} />Contactar por Whatsapp</a>
          </Button>
        </Space>
      ]}
    >
      <Space size={16} align="start">
        <MessageOutlined style={{color: 'mediumseagreen', fontSize: 24, marginTop: 4}}/>
        <Space direction="vertical" size={4}>
          <Text>Si tenés cualquier duda, envianos un mensaje solicitando agendar una llamada o directamente con tu consulta.</Text>
          <Text strong>Tiempo de respuesta: 5 minutos</Text>
        </Space>
      </Space>
    </Modal>
  )
}
