import React from 'react';

import { BankOutlined, WhatsAppOutlined } from '@ant-design/icons';
import {Modal, Button, Typography, Space} from 'antd';
const {Text} = Typography;


export default function Contacto({contactData, contactVisible, setContactVisible, changeStep}) {

  return (
    contactData.map(data =>
    <Modal
      key={Math.random}
      title={data.title}
      visible={contactVisible}
      onCancel={() => setContactVisible(false)}
      footer={[
        <Space key={Math.random}>
            {data.title !== "Pagar por MercadoPago" ?
                <Button
                type="secondary" 
                onClick={() => setContactVisible(false)}>
                    {data.button1}
                </Button>
            :
                <Button
                type="primary"
                id="tag-comprar_mp_contacto"
                onClick={() => setContactVisible(false)}>
                    <a 
                    href="https://api.whatsapp.com/send?phone=5491122542474" 
                    target="_blank" rel="noopener noreferrer" 
                    id="tag-comprar_mp_contacto">
                      <WhatsAppOutlined style={{marginRight: 8}} />Contactar por Whatsapp
                    </a>
                </Button>
            }
            <Button 
            key={2}
            type="primary" 
            onClick={() => {
                setContactVisible(false)
                changeStep()
            }}>
                {data.button2}
            </Button>
        </Space>
      ]}
    >
      <Space size={16} align="start">
        <BankOutlined style={{fontSize: 24, marginTop: 4}}/>
        <Space direction="vertical" size={4}>
          <Text strong>{data.text}</Text>
          {data.title !== "Pagar por MercadoPago" ? <>
            <Text>CBU: <Text copyable code>{data.line1}</Text></Text>
            <Text>Alias: <Text copyable code>{data.line2}</Text></Text>
          </>
          : <>
            <Text>{data.line1}</Text>
            <Text>{data.line2}</Text>
            </>}
          <Text strong>{data.total}</Text>
        </Space>
      </Space>
    </Modal>
    )
  )
}
