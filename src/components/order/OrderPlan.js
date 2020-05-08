import React, {useState, useEffect} from 'react';
import SelectPlan from './components/SelectPlan';
import SelectGraphicDesign from './components/SelectGraphicDesign';
import {Form, Space, Drawer, Steps, Divider, Button, Row, Col, Typography} from 'antd';
const {Text} = Typography;
const { Step } = Steps;


export default function OrderPlan (props) {
  const {visible, setVisible} = props.visibleState

  const [dataPlanes, setdataPlanes] = useState([]);
  useEffect(() => {
      async function dataPlanes() {
      const res = await fetch('https://api.1tiendaonline.com/planes/')
      const data = await res.json();
      setdataPlanes(data)
      }
      dataPlanes()
  }, [])
  
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

  const [step, setStep] = useState(0);

  function next() {
      const current = step + 1;
      setStep(current);
  }
  function prev() {
      const current = step - 1;
      setStep(current);
  }

  const responsive = window.innerWidth < "500"
  const plain = {fontSize: '14px', color: 'rgba(0,0,0,.65)'}

  return (
    <Drawer
      title={"Armá tu plan: " + steps[step].content}
      placement="right"
      closable={window.innerWidth < "600" ? true : false}
      onClose={() => setVisible(false)}
      visible={visible}
      width={responsive ? "100%" : "500px"}
      footer={
        <Row justify="space-between" align="middle">
          <Col><Text>Subtotal: $1000</Text></Col>
          <Col><Button type="primary">Continuar</Button></Col>
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
          <SelectPlan data={dataPlanes} responsive={responsive}/>
        </Form.Item>

        <Divider style={plain}>Diseño Gráfico</Divider>

        <Form.Item>
          <SelectGraphicDesign title="diseño" responsive={responsive}/>
        </Form.Item>

        <Divider style={plain}>Publicidad y Marketing</Divider>

       {/*  <Form.Item>
          <SelectGraphicDesign title="publicidad" responsive={responsive}/>
        </Form.Item> */}

      </Form>
    </Drawer>
  );
}