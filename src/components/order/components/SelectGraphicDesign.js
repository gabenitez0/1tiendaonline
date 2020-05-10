import React, { useRef, useContext } from 'react'
import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Typography, Space, Row, Col, Checkbox, Spin } from 'antd';

const { Text } = Typography;

export default function SelectPlanDesign(props) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const items = Array.from({ length: 3 }, a => useRef(null));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prices = Array.from({ length: 3 }, a => useRef(null));
    
    
    const context = useContext(contextoGlobal);

    const handleInputChange = event => {
        //items.map(item => item.current)

        const ID = event.target.id;

        props.values.forEach((item, index) => {
          item.checked = context.orden.serviciosDiseno.map(servicio => servicio.id).includes(item.id);  
          if (item.id === event.target.id) {
            item.checked = !item.checked;
            items[index].current.disabled = !!items[index].current.disabled;
            
            if(item.checked === true) {
                // Este dispatch del orden reducer agregara un servicio al contexto global.
                context.dispatch({ 
                    type: 'agregarServiciosDiseno',
                    payload: {
                        id: ID,
                        servicio: item.name,
                        precio: item.price,
                        total: 0,
                        necesitaAyuda: false
                    } 
                });

                context.dispatch({
                    type: 'agregarCantidadPrecio',
                    payload: {
                        id: ID,
                        cantidad: 1,
                        total: item.price, 
                    }
                });


                context.dispatch({
                    type: 'estimarTotal'
                });
            }

            if(item.checked === false) {
                context.dispatch({
                    type: 'eliminarServiciosDiseno',
                    payload: {
                        id: item.id
                    }
                });

                context.dispatch({
                    type: 'estimarTotal'
                });
            }


          } else{
            prices.filter(priceLabel => priceLabel.current.id === ID)[0].current.textContent = '$0'
          }
        });

    };

    const handleSelectChange = event => {
        const id = event.target.id;
        if(event.target.value !== 'auxiliar') {
            let servicio = props.values.filter(servicio => servicio.id === id)[0];
            const total = servicio.price * Number(event.target.value);
            prices.filter(priceLabel => priceLabel.current.id === id)[0].current.textContent = `$${total}`;
            
            context.dispatch({
                type: 'agregarCantidadPrecio',
                payload: {
                    id: id,
                    cantidad: Number(event.target.value),
                    total: total
                }
            });
        } else {
            prices.filter(priceLabel => priceLabel.current.id === id)[0].current.textContent = `$0`;
            
            context.dispatch({ 
                type: 'solicitarAyuda',
                payload: {
                    id: id
                } 
            });
            
        }

        context.dispatch({type: 'estimarTotal'});
    };

    const select ={
        border: '1px solid #d9d9d9',
        width: '60px'
    }
    
    return (
        props.values.length === 0 
        ?  <Spin size="large" style={{margin: '0 auto'}}/>
        : 
        <Row gutter={[32, 8]}>
            <Col sm={7} span={24}>
                <Text strong>Servicios de {props.title}</Text>
            </Col>
            <Col sm={17} span={24}>
                <Row gutter={8} align="middle">
                    <Col span={14}>
                        <Space direction="vertical">
                        {props.values.map(item =>
                            <Checkbox
                            id={item.id}
                            key={item.id}
                            onChange={handleInputChange}
                            defaultChecked= {
                                context.orden.serviciosDiseno.map(servicio => servicio.id).includes(item.id)
                            }
                            >
                                {item.name}
                            </Checkbox>
                        )}
                        </Space>
                    </Col>
                    <Col span={5}>
                        <Space direction="vertical">
                        {props.values.map((item, i) =>
                            <select
                                ref={items[i]}
                                id={item.id}
                                key={item.id}
                                style={select}
                                onChange={handleSelectChange}
                                disabled={context.orden.serviciosDiseno.map(servicio => servicio.id).includes(item.id) ? false : true}
                            >
                                {
                                    context.orden.serviciosDiseno.length !== 0 
                                    ?
                                    context.orden.serviciosDiseno.filter(servicio => servicio.id === item.id).map(elemento => (
                                        <option key={0} hidden>
                                            {elemento.cantidad || 0}
                                        </option>
                                    ))
                                    :
                                    null
                                }
                                {item.qty.map(opcion => (
                                    <option
                                        key={Math.random()}
                                        defaultValue={opcion}
                                        hidden={opcion === 0}
                                    >
                                        {opcion}
                                    </option>
                                ))}
                                <option
                                    key={Math.random()}
                                    value="auxiliar"
                                    selected={
                                        context.orden.serviciosDiseno.length > 0 && context.orden.serviciosDiseno.find(servicio => servicio.id === item.id && servicio.necesitaAyuda === true)
                                        ?
                                        true
                                        :
                                        false
                                    }
                                    >
                                    No se
                                </option>
                            </select>
                        )}
                        </Space>
                    </Col>
                    <Col span={5} style={{textAlign: "right"}}>
                        <Space direction="vertical">
                        {props.values.map((item, i) => (
                            <p  
                                id={item.id}
                                ref={prices[i]}
                                key={item.id}
                                style={{margin: '0', color: 'rgba(0,0,0,.65)'}}>
                                {   
                                    context.orden.serviciosDiseno.length >= 1 && context.orden.serviciosDiseno.find(servicio => servicio.id === item.id && servicio.necesitaAyuda === true)
                                    ?
                                    '*'
                                    :
                                    context.orden.serviciosDiseno.filter(servicio => servicio.id === item.id)[0] !== undefined
                                    ? `$${context.orden.serviciosDiseno.filter(servicio => servicio.id === item.id)[0].total}`
                                    : "$0"
                                }
                            
                            </p>
                        ))}
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
