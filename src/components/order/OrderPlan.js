import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { contextoGlobal } from '../../estado/contextoGlobal';

import useWindowSize from '../../mixins/useWindowSize';
import Paypal from './mediosPago/Paypal';
import MercadoPago from './mediosPago/MercadoPago';
import Contacto from './mediosPago/Contacto';

import SelectPlan from './paso1/SelectPlan';
import SelectGraphicServices from './paso1/SelectGraphicServices';
import SelectMarketingServices from './paso1/SelectMarketingServices';
import SelectDomainServices from './paso1/SelectDomainServices';

import ResumenCompra from './paso2/ResumenCompra';
import DatosCliente from './paso2/DatosCliente';
import MediosPago from './paso2/MediosPago';

import PedidoCompleto from './paso3/PedidoCompleto';

import { List, Drawer, Steps, Divider, Button, Row, Col, Typography, Space, message, Alert } from 'antd';
const { Text } = Typography;
const { Step } = Steps;

/* message.config({
  maxCount: 1,
  getContainer: document.getElementById('message-container')
}); */

export default function OrderPlan (props) {

  const [contactVisible, setContactVisible] = useState(false);
  const [contactData, setContactData] = useState([]);

  const { orden, dispatch } = useContext(contextoGlobal);

  const [dataPlanes, setdataPlanes] = useState([]);

  const [dataDesign, setDataDesign] = useState([]);

  const [dataMarketing, setDataMarketing] = useState([]);

  const [dataDomain, setDataDomain] = useState([]);

  /* const [buttonLoading, setButtonLoading] = useState(false); */

  useEffect(() => {

      fetch('https://api.1tiendaonline.com/graphic-designs')
      .then(data => data.json())
      .then(data => setDataDesign(data));

      fetch('https://api.1tiendaonline.com/marketings')
        .then(res => res.json())
        .then(data => setDataMarketing(data));

      fetch('https://api.1tiendaonline.com/web-services')
        .then(res => res.json())
        .then(data => setDataDomain(data));

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
      content: 'Resumen y pago',
    },
    {
      title: 'Listo',
      content: 'Ver Orden',
    },
  ];

  const size = useWindowSize();
  const responsive = size.width < "500"
  const plain = {fontSize: '14px', color: 'rgba(0,0,0,.65)'}

  const handleOnDrawerClose = () => {
    document.body.style.width = null

    // Este dispatch se utilizara para indicar si el modal deberia de estar abierto o no.
    dispatch({
      type: 'toggleDrawer',
      payload: {
        visible: false
      }
    });

    // Esto indicara que cuando el drawer este en el ultimo paso y el usuario cierre el drawer
    // todo volvera a como estaba al inicio.
    if(orden.stateCurrent === 2) {
      localStorage.removeItem('state');

      dispatch({type: 'resetearElEstado'})

      dispatch({
        type: 'resetearElEstado'
      })
    }

  }

  const changeStep = () => {
    // Esto revisará si en el estado ya se encuentra un plan tienda seleccionado.
    if(Object.entries(orden.planTienda).length === 0) {
      return message.warning('Necesitas seleccionar un plan tienda.');
    }

    dispatch({
      type: 'totalFinal'
    });

    dispatch({
      type: 'establecerDrawerStep',
      payload: {
        step: orden.stateCurrent + 1
      }
    });

  }

  const prev = () => {
    dispatch({
      type: 'establecerDrawerStep',
      payload: {
        step: orden.stateCurrent - 1
      }
    });
  }

  const seRequireAyuda = orden.serviciosDiseno.map(servicio => servicio.necesitaAyuda).includes(true) || orden.serviciosPublicidad.map(servicio => servicio.necesitaAyuda).includes(true) || orden.servicioDominio.map(servicio => servicio.necesitaAyuda).includes(true) || orden.planTienda.necesitaAyuda;

  const serviciosQueRequierenAtencion = () => {
    if(seRequireAyuda) {
      const serviciosDiseno = orden.serviciosDiseno.filter(servicio => servicio.necesitaAyuda === true);
      const serviciosPublicidad = orden.serviciosPublicidad.filter(servicio => servicio.necesitaAyuda === true);
      const servicioDominio = orden.servicioDominio.filter(servicio => servicio.necesitaAyuda === true);
      return [...serviciosDiseno, ...serviciosPublicidad, ...servicioDominio];
    } else {
      return [];
    }
  }

  /* const goToPayment = () => {

    if(orden.metodoDePago === "MercadoPago") {
      setButtonLoading(true);
      dispatch({
        type: 'estaEnProcesoDePago',
        payload: {
          enProceso: true
        }
      });

      // SDK de Mercado Pago
      const mercadopago = require ('mercadopago');
  
      // Agrega credenciales    
      mercadopago.configure({
        sandbox: true,
        access_token: 'TEST-1912802638413668-013002-510a91a112b7222641c5ca8914999ea6-67919268'
      });

      let preference = {
        items: [
          {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
          }
        ]
      };

      mercadopago.preferences.create(preference)
        .then(function(mpResponse){
          console.log(mpResponse);
        })
        .catch(function(mpError){
          console.log(mpError);
          message.error('Hay un error con el medio de pago seleccionado.')
        });

    } */
    
    // Esta condicional es una simulación; en este caso solo funcionar con PayPal para efecto de demostración.
    /* if(orden.metodoDePago === "Paypal") {

      // Se deberia de habiliar el botón con un icono de loading para hacer notar al 
      // usuario que se esta llevando a pago el pago con el medio seleccionado.
      setButtonLoading(true);
      
      // Por otra parte sera necesario establecer en el estado que se esta llevando al un proceso de pago.
      // Esto evitara que los otros medios pagos se puedan seleccionar y se pueda producir un bug.
      
      // Siempre se debe indicar al estado global que se entro en un proceso de pago para que se puedan
      // deshabilitar las otras opciones de metodo de pago.
      dispatch({
        type: 'estaEnProcesoDePago',
        payload: {
          enProceso: true
        }
      });
      
      /* const product = {
        price: 10,
        name: 'product test'
      }
      if (loaded){
        setTimeout(() => {
          window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: 'USD',
                      value: product.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaidFor(true);
              console.log(order);
              dispatch({
                type: 'establecerDrawerStep',
                payload: {
                  step: orden.stateCurrent + 1
                }
              })
            },
            onError: err => {
              setError(err);
              console.error(err);
              message.error('Sucedio un error en el proceso de pago.')
              dispatch({
                type: 'estaEnProcesoDePago',
                payload: {
                  enProceso: false
                }
              })
            },
          })
          .render(paypalRef.current)
        })
      } */
      

        /* if (paidFor) {
          setButtonLoading(false);
          return (
            dispatch({
              type: 'establecerDrawerStep',
              payload: {
                step: orden.stateCurrent + 1
              }
            })
          );
        } else {
          message.error('Sucedio un error en el proceso de pago.')
          console.log(error)
        }
        dispatch({
          type: 'estaEnProcesoDePago',
          payload: {
            enProceso: false
          }
        }); */


      /*// Este setTimeout simulara la ejecución del metodo correspondiente al metodo de pago
      // donde la puede que el pago se lleve de manera exitosa o no.
      setTimeout(() => {
        setButtonLoading(false);

        // Este condicional simular la respuesta del medio de pago en caso de que la misma sea 
        // exitosa.
        if(Math.round(Math.random()) === 1) {

          // Este dispatch le dira al estado que cambie al ultimo elemento que tiene el componte Steps 
          // que pertence a Ant Design.
          dispatch({
            type: 'establecerDrawerStep',
            payload: {
              step: orden.stateCurrent + 1
            }
          });

        } else {
          // En caso de que sucede un error en el proceso de pago en este caso solo se mandara un 
          // mensaje al usuario.

          message.error('Sucedio un error en el proceso de pago.');
        }

        dispatch({
          type: 'estaEnProcesoDePago',
          payload: {
            enProceso: false
          }
        });

      }, 5000)

    } else {
      message.error('Hay un error con el medio de pago seleccionado!')
    }
  } */

  const dataSeRequiereAyuda = serviciosQueRequierenAtencion().map(servicio => servicio.name);
  if(orden.planTienda.necesitaAyuda === true) {
    dataSeRequiereAyuda.unshift("Elección de plan de tienda")
  }

  const dataTransfer = [{
    title: 'Pagar por transferencia bancaria',
    text: 'Depositar el dinero en la siguiente cuenta:',
    line1: '1430001713004964240016',
    line2: 'gabenitez.ars',
    total: 'Total a pagar: $'+orden.totalFinal+'/ars',
    button1: 'Volver',
    button2: 'Ya realicé el pago'
  }]
  const dataMercadoPago = [{
    title: 'Pagar por MercadoPago',
    text: 'Actualmente estamos implementando el pago directo por MercadoPago.',
    line1: 'Hasta entonces deberás ponerte en contacto con nosotros para enviarte el enlace de pago.',
    line2: 'Puedes utilizar el boton de Contacto que te dejamos a continuación y enviarnos una captura de tu pedido o simplemente escribirnos los servicios que incluye tu pedido.',
    total: 'Total a pagar: $'+orden.totalFinal+'/ars',
    button1: 'Contacto',
    button2: 'Ya realicé el pago'
  }]

  return (
      <Drawer
        title={"Armá tu plan: " + steps[orden.stateCurrent].content}
        placement="right"
        closable={size.width < "600" ? true : false}
        onClose={handleOnDrawerClose}
        visible={orden.drawerVisible}
        width={responsive ? "100%" : "500px"}
        footer={
          <Row justify="space-between" align="middle">
            <Col>
              {orden.stateCurrent === 0 &&
                <Text>Subtotal: ${orden.subTotal}</Text>
              }
            </Col>
            <Col>
              <Space>
              {orden.stateCurrent === 1 &&
                <Button type="secondary" onClick={prev} >Atras</Button>
              }
              {orden.stateCurrent === 0 &&
                <Button
                  type="primary"
                  onClick={changeStep}
                  disabled={
                    Object.entries(orden.planTienda).length === 0 && (orden.serviciosDiseno.length === 0 && orden.serviciosPublicidad.length === 0 && orden.servicioDominio.length === 0)
                  }
                >
                  Continuar
                </Button>
              }
              {orden.stateCurrent === 1 && (
                seRequireAyuda ?
                  <Button type="primary">
                    <a 
                    href={"https://api.whatsapp.com/send?phone=5491122542474&text=Hola, necesito ayuda con: "+dataSeRequiereAyuda} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    id="tag-contacto">
                      Contactar por Whatsapp
                    </a>
                  </Button>
                :
                <>
                {orden.metodoDePago === "" &&
                  <Button 
                    type="primary"
                    disabled={
                      orden.metodoDePago === ""
                    }
                  >
                    Continuar
                  </Button>
                }
                {orden.metodoDePago === "Paypal" &&
                  <Paypal changeStep={changeStep} />
                }
                {orden.metodoDePago === "MercadoPago" && <>
                  <MercadoPago changeStep={changeStep} />
                  
                  {window.location.search === "?compra-exitosa" && (
                      message.success('¡Compra realizada con exito!'),
                      changeStep()
                  )}
                  {window.location.search === "?compra-denegada" && (
                      message.error('Hubo un error en el proceso de pago.')
                  )}
                </>}
                {orden.metodoDePago === "Transferencia Bancaria" &&
                  <Button 
                  type="primary" 
                  onClick={() => {
                    setContactVisible(true)
                    setContactData(dataTransfer)
                  }}>
                    Transferencia Bancaria
                  </Button>
                }
                <Contacto 
                contactVisible={contactVisible} 
                setContactVisible={setContactVisible}
                contactData={contactData}
                changeStep={changeStep}
                />
               </>
              )
              }
              {orden.stateCurrent === steps.length -1 &&
                <Link to="/">
                  <Button 
                  type="primary"
                  onClick={() => {
                    handleOnDrawerClose()
                    dispatch({
                      type: 'toggleDrawer',
                      payload: {
                        visible: false
                      }
                    })

                    dispatch({
                      type: 'resetearElEstado',
                      payload: {
                        visible: false
                      }
                    })
                  }}
                  >
                    Terminar
                  </Button>
                </Link>
              }
              </Space>
            </Col>
          </Row>}
      >
        <Steps current={orden.stateCurrent} size="small">
          {steps.map(item => (
              <Step key={item.title} title={item.title} description={item.content}/>
          ))}
        </Steps>
        
        {orden.stateCurrent === 0 && (
          <>
            <Divider style={plain}>Armar plan</Divider>

            <Alert banner message="A continuación podes armar tu plan a medida seleccionando únicamente los servicios y productos que vas a necesitar." type="info" style={{marginBottom: 24}}/>

            <SelectPlan data={dataPlanes} handleOnDrawerClose={handleOnDrawerClose}/>

            <Divider/>

            <SelectGraphicServices title="diseño" data={dataDesign} />

            <Divider/>

            <SelectMarketingServices title="publicidad" data={dataMarketing} />

            <Divider/>

            <SelectDomainServices title="dominio" data={dataDomain} />
          </>
        )}

        {orden.stateCurrent === 1 && (
          seRequireAyuda ?
          <>
            <Divider style={plain}>Se requiere atención</Divider>
            <Space direction="vertical" style={{width: '100%'}}>
              <List 
              dataSource={dataSeRequiereAyuda}
              header={<Alert banner message="Uno o más elementos requieren de atención:" type="warning" />}
              size="small"
              renderItem={item => (
                <List.Item>• {item}</List.Item>
              )}/>
              <Divider style={plain}>¿Qué hacer?</Divider>
              <Alert banner message="Antes de realizar algún pago, le recomendamos que se ponga en contacto con nosotros para resolver sus dudas y ayudarlo a elegir. Puede hacerlo desde cualquier boton de contacto o incluso utilizando el boton que está en la parte inferior. Tiempo de respuesta: 5 minutos." type="info" />
            </Space>
          </>
          :
          <>
          <Divider style={plain}>Resumen del pedido</Divider>
          <ResumenCompra />
          {/* <Divider style={plain}>Completar datos</Divider>
          <DatosCliente /> */}
          <Divider style={plain}>Elegir medio de pago</Divider>
          <MediosPago />
          </>
        )}

        {orden.stateCurrent === steps.length - 1 && ( <>
          <Divider/>
          <PedidoCompleto />
        </>)}

      </Drawer>
  )
}