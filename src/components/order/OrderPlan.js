import React, { useState, useEffect, useContext } from 'react';

import { contextoGlobal } from '../../estado/contextoGlobal';

import useWindowSize from '../../mixins/useWindowSize';
import Paypal from './mediosPago/Paypal';

import SelectPlan from './paso1/SelectPlan';
import SelectGraphicServices from './paso1/SelectGraphicServices';
import SelectMarketingServices from './paso1/SelectMarketingServices';
import SelectDomainServices from './paso1/SelectDomainServices';

import ResumenCompra from './paso2/ResumenCompra';
import MediosPago from './paso2/MediosPago';

import { Form, Drawer, Steps, Divider, Button, Row, Col, Typography, Space, message } from 'antd';
const { Text } = Typography;
const { Step } = Steps;

message.config({
  maxCount: 1,
  getContainer: document.getElementById('message-container')
});

export default function OrderPlan (props) {

  const { orden, dispatch } = useContext(contextoGlobal);

  const [dataPlanes, setdataPlanes] = useState([]);

  const [dataDesign, setDataDesign] = useState([]);

  const [dataMarketing, setDataMarketing] = useState([]);

  const [dataDomain, setDataDomain] = useState([]);

  const [buttonLoading, setButtonLoading] = useState(false);

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
  const product = {
    price: 10,
    name: 'product test'
  }

  const handleOnDrawerClose = () => {

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
      return false;
    }
  }

  const goToPayment = () => {

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

    }
    
    // Esta condicional es una simulación; en este caso solo funcionar con PayPal para efecto de demostración.
    if(orden.metodoDePago === "Paypal") {

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
      message.error('Hay un error con el medio de pago seleccionado!') */
    }

  }

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
              {orden.stateCurrent === 0 && (
                <Text>Subtotal: ${orden.subTotal}</Text>
              )}
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
              {orden.stateCurrent === 1 &&
                <><Button 
                  type="primary"
                  onClick={goToPayment}
                  loading={buttonLoading}
                  disabled={
                    orden.metodoDePago === ""
                  }
                >
                  {orden.metodoDePago !== ""
                    ? "Pagar con " + orden.metodoDePago
                    : "Elegir medio de pago"
                  }
                </Button>
                <Paypal product={product}/>
               </>
              }
              {orden.stateCurrent === steps.length -1 &&
                <Button 
                  type="primary"
                  onClick={() => {
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

              <Divider style={plain}>Dominios</Divider>

              <Form.Item>
                <SelectDomainServices title="dominio" responsive={responsive} data={dataDomain} />
              </Form.Item>

            </Form>
          </>
        )}

        {orden.stateCurrent === 1 && (
          seRequireAyuda ? 
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
          :
          <>
          <Divider style={plain}>Resumen del pedido</Divider>
          <ResumenCompra />
          <Divider style={plain}>Medios de pago</Divider>
          <MediosPago />
          </>
        )}

        {orden.stateCurrent === steps.length - 1 && (
          <>
            <h1 style={{color: 'red'}}>Aqui se deberia de mostrar el resumen de la compra o cualquier cosa en caso de que todo se haya estado bien</h1>
            <h2>{orden.planTienda.name}</h2>
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
            <h2>Servicios incluidos</h2>
            {orden.serviciosIncluidos.map(servicio => (
              <>
                <h3>{servicio.name}</h3>
                <p>tiempo: {servicio.time}</p>
                <p>total: {servicio.total}</p>
              </>
            ))}
            <Divider></Divider>
            <h4>total: {orden.totalFinal}</h4>
          </>
        )}

      </Drawer>
  )
}