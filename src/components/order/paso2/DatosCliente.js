import React, {useState} from 'react';
import {Form, Input, Button} from 'antd';

export default function DatosCliente() {
  const [nombre, setNombre] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [nombreTienda, setNombreTienda] = useState()

    const validateMessages = {
        required: 'Debes ingresar ${label}!',
        types: {
          email: 'Ingresa un e-mail válido',
        }
    };

    return (
        <Form
        name="CrearOrden"
        layout="vertical"
        validateMessages={validateMessages}
      >
        <Form.Item 
        name="fullname" 
        label="Tu nombre" 
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 16}}>
          <Input placeholder="Ej: Alfredo Fernandez" onChange={e => setNombre(e.target.value)}/>
        </Form.Item>
        <Form.Item 
            name="phone" 
            label="Tu teléfono / celular" 
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)'}}>
          <Input placeholder="Ej: +54 1122542474" onChange={e => setPhone(e.target.value)}/>
        </Form.Item>
        <Form.Item 
            name="email" 
            label="Tu e-mail" 
            rules={[{ required: true, type: 'email' }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 16}}>
          <Input placeholder="Ej: alfred@gmail.com" onChange={e => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item 
            name="company" 
            label="Nombre de tu tienda" 
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)'}}>
          <Input placeholder="Ej: Baires Ind." onChange={e => setNombreTienda(e.target.value)}/>
        </Form.Item>
        
        <Button onClick={() => console.log(nombre, phone, email, nombreTienda)}>Console log</Button>
      </Form>
    )
}
