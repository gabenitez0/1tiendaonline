import React, { useState, useEffect, useContext } from 'react';

import { contextoGlobal } from '../../estado/contextoGlobal';

import SelectPlan from './components/SelectPlan';
import SelectPlanDesign from './components/SelectGraphicDesign';

import { Form, Drawer, Steps, Divider, Button, Row, Col, Typography } from 'antd';
const { Text } = Typography;
const { Step } = Steps;

export default function OrderPlan (props) {
  const {visible, setVisible} = props.visibleState;

  const [dataPlanes, setdataPlanes] = useState([]);

  const [dataDesign, setDataDesign] = useState([]);

  useEffect(() => {
      fetch('https://api.1tiendaonline.com/graphic-designs')
      .then(data => data.json())
      .then(data => setDataDesign(data));

      async function dataPlanes() {
        const res = await fetch('https://api.1tiendaonline.com/planes/')
        const data = await res.json();

        setdataPlanes(data);
      }
      dataPlanes();
  }, []);

  const context = useContext(contextoGlobal);
  
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

  // eslint-disable-next-line
  const [step, setStep] = useState(0);

  // function next() {
  //     const current = step + 1;
  //     setStep(current);
  // }
  // function prev() {
  //     const current = step - 1;
  //     setStep(current);
  // }

  const responsive = window.innerWidth < "500"
  const plain = {fontSize: '14px', color: 'rgba(0,0,0,.65)'}

  const handleOnDrawerClose = () => {
    console.log('el drawer se cerro');
    setVisible(false);
  }

  const handleafterVisibleChange = () => {
    if(visible) {

    }
  }

  return (
    <Drawer
      title={"Armá tu plan: " + steps[step].content}
      placement="right"
      closable={window.innerWidth < "600" ? true : false}
      onClose={handleOnDrawerClose}
      afterVisibleChange={handleafterVisibleChange}
      visible={visible}
      width={responsive ? "100%" : "500px"}
      footer={
        <Row justify="space-between" align="middle">
          <Col>
      <Text>Subtotal: ${context.orden.costoTotal}</Text>
          </Col>
          <Col>
            <Button type="primary" onClick={() => console.log(context.orden)} >Continuar</Button>
          </Col>
        </Row>}
    >
      <Steps current={step} size="small">
        {steps.map(item => (
            <Step key={item.title} title={item.title} description={item.content}/>
        ))}
      </Steps>

      <Divider style={plain}>Tienda Online</Divider>

      <Form>
        <Form.Item>
          <SelectPlan data={dataPlanes} responsive={responsive} />
        </Form.Item>

        <Divider style={plain}>Diseño Gráfico</Divider>

        <Form.Item>
          <SelectPlanDesign title="diseño" responsive={responsive} values={dataDesign} />
        </Form.Item>

        <Divider style={plain}>Publicidad y Marketing</Divider>

       {/*  <Form.Item>
          <SelectGraphicDesign title="publicidad" responsive={responsive}/>
        </Form.Item> */}

      </Form>
    </Drawer>
  );
}