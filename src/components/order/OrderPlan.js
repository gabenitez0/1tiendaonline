import React, { useState, useEffect, useContext } from 'react';

import { contextoGlobal } from '../../estado/contextoGlobal';

import SelectPlan from './paso1/SelectPlan';
import SelectGraphicServices from './paso1/SelectGraphicServices';
import SelectMarketingServices from './paso1/SelectMarketingServices';

import ResumenCompra from './paso2/ResumenCompra';

import { Form, Drawer, Steps, Divider, Button, Row, Col, Typography, Space } from 'antd';
const { Text } = Typography;
const { Step } = Steps;

export default function OrderPlan (props) {

  const { orden } = useContext(contextoGlobal);

  const {visible, setVisible} = props.visibleState;

  const [current, setCurrent] = useState(0);

  const [dataPlanes, setdataPlanes] = useState([]);

  const [dataDesign, setDataDesign] = useState([]);

  const [dataMarketing, setDataMarketing] = useState([]);

  useEffect(() => {
      fetch('https://api.1tiendaonline.com/graphic-designs')
      .then(data => data.json())
      .then(data => setDataDesign(data));

      fetch('https://api.1tiendaonline.com/marketings')
        .then(res => res.json())
        .then(data => setDataMarketing(data));

      async function dataPlanes() {
        const res = await fetch('https://api.1tiendaonline.com/planes/')
        const data = await res.json();

        setdataPlanes(data);
      }
      dataPlanes();
  }, []);
  
  const steps = [
    {
      title: 'Paso 1',
      content: 'Seleccionar servicios',
    },
    {
      title: 'Paso 2',
      content: 'Realizar pago',
    },
    {
      title: 'Listo',
      content: 'Ver Orden',
    },
  ];

  const responsive = window.innerWidth < "500"
  const plain = {fontSize: '14px', color: 'rgba(0,0,0,.65)'}

  const handleOnDrawerClose = () => {
    setVisible(false);
  }

  const next = () => {
    setCurrent(current + 1);
  }

  const prev = () => {
    setCurrent(current - 1);
  }

  const seRequireAyuda = orden.serviciosDiseno.map(servicio => servicio.necesitaAyuda).includes(true) || orden.serviciosPublicidad.map(servicio => servicio.necesitaAyuda).includes(true) || orden.planTienda.necesitaAyuda;

  const serviciosQueRequierenAtencion = () => {
    if(seRequireAyuda) {
      const serviciosDiseno = orden.serviciosDiseno.filter(servicio => servicio.necesitaAyuda === true);
      const serviciosPublicidad = orden.serviciosPublicidad.filter(servicio => servicio.necesitaAyuda === true);
      return [...serviciosDiseno, ...serviciosPublicidad];
    } else {
      return false;
    }
  }

  return (
    <Drawer
      title={"Armá tu plan: " + steps[current].content}
      placement="right"
      closable={window.innerWidth < "600" ? true : false}
      onClose={handleOnDrawerClose}
      visible={visible}
      width={responsive ? "100%" : "500px"}
      footer={
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Subtotal: ${orden.costoTotal}</Text>
          </Col>
          <Col>
            <Space>
            {current > 0 &&
              <Button type="secondary" onClick={prev} >Atras</Button>
            }
            {current < steps.length - 1 &&
              <Button type="primary" onClick={next}>Continuar</Button>
            }
            {current === steps.length -1 &&
              <Button type="primary">Terminar</Button>
            }
            </Space>
          </Col>
        </Row>}
    >
      <Steps current={current} size="small">
        {steps.map(item => (
            <Step key={item.title} title={item.title} description={item.content}/>
        ))}
      </Steps>
      
      {current === 0 && (
        <>
          <Divider style={plain}>Tienda Online</Divider>

          <Form>
            <Form.Item>
              <SelectPlan data={dataPlanes} responsive={responsive} />
            </Form.Item>

            <Divider style={plain}>Diseño Gráfico</Divider>

            <Form.Item>
              <SelectGraphicServices title="diseño" responsive={responsive} data={dataDesign} />
            </Form.Item>

            <Divider style={plain}>Publicidad y Marketing</Divider>

            <Form.Item>
              <SelectMarketingServices title="publicidad" responsive={responsive} data={dataMarketing} />
            </Form.Item>

          </Form>
        </>
      )}

      {current === 1 && (

        <ResumenCompra />,

        seRequireAyuda && (
          <>
            <h1>Algo necesita de atencións</h1>
            {orden.planTienda.necesitaAyuda && (
              <h3>Se necesita ayuda para elegir un plan</h3>
            )}
            <ul>
              {serviciosQueRequierenAtencion().map(servicio => (
                <li key={servicio.id}>{servicio.name}</li>
              ))}
            </ul>
          </>
        )
      )}

      {current === steps.length - 1 && (
        <>
          <h1>{orden.planTienda.plan}</h1>
          <span>{orden.planTienda.total}</span>
          <Divider></Divider>
          <h2>Servicios de diseño</h2>
          {orden.serviciosDiseno.map(servicio => (
            <>
              <h3>{servicio.name}</h3>
              <p>cantidad: {servicio.qty}</p>
              <p>total: {servicio.total}</p>
            </>
          ))}
          <Divider></Divider>
          <h2>Servicios publcidad y marketing</h2>
          {orden.serviciosPublicidad.map(servicio => (
            <>
              <h3>{servicio.name}</h3>
              <p>tiempo: {servicio.time}</p>
              <p>total: {servicio.total}</p>
            </>
          ))}
          <Divider></Divider>
          <h4>total: {orden.costoTotal}</h4>
        </>
      )}

    </Drawer>
  );
}