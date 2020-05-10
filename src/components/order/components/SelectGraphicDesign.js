import React, { useRef, useState, useContext } from 'react'
import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Typography, Space, Row, Col, Checkbox } from 'antd';

const { Text } = Typography;

export default function SelectPlan(props) {

    const context = useContext(contextoGlobal);

    // eslint-disable-next-line
    const [data, setData] = useState([
        {
            id: 0,
            name: 'Diseño de logotipo',
            price: 1500,
            qty: [0, 1, 2, 3, 4, 5],
            checked: false
        },
        {
            id: 1,
            name: 'Diseño de imagen',
            price: 4000,
            qty: [0, 1, 2, 3, 4, 5],
            checked: false
        },
        {
            id: 2,
            name: 'Recursos gráficos',
            price: 500,
            qty: [0, 1, 2, 3, 4, 5],
            checked: false
        }
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const items = Array.from({ length: data.length }, a => useRef(null));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prices = Array.from({ length: data.length }, a => useRef(null));
    
    const handleInputChange = event => {
        const ID = event.target.id;
        data.forEach(item => {
          item.checked = context.orden.serviciosDiseno.map(servicio => servicio.id).includes(item.id);  
          if (item.id === Number(event.target.id)) {
            
            item.checked = !item.checked;
            items[item.id].current.disabled = !items[item.id].current.disabled;

            if(item.checked === true) {
                // Este dispatch del orden reducer agregara un servicio al contexto global.
                context.dispatch({ 
                    type: 'agregarServiciosDiseno',
                    payload: {
                        id: item.id,
                        servicio: item.name,
                        precio: item.price,
                        total: 0 
                    } 
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
            prices[ID].current.innerText = '$0'
          }
        });

    };

    const handleSelectChange = event => {
        const ID = event.target.id;
        const price = data[ID].price * Number(event.target.value);
        prices[ID].current.innerText = '$' + price;

        context.dispatch({
            type: 'agregarCantidadPrecio',
            payload: {
                id: ID,
                cantidad: Number(event.target.value),
                total: price
            }
        });

        context.dispatch({type: 'estimarTotal'});
    };

    const select ={
        border: '1px solid #d9d9d9',
        width: '60px'
    }

    console.log()

    return (
        <Row gutter={[32, 8]}>
            <Col sm={7} span={24}>
                <Text strong>Servicios de {props.title}</Text>
            </Col>
            <Col sm={17} span={24}>
                <Row gutter={8} align="middle">
                    <Col span={14}>
                        <Space direction="vertical">
                        {data.map(item =>
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
                        {data.map((item, i) =>
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
                                    >
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        )}
                        </Space>
                    </Col>
                    <Col span={5} style={{textAlign: "right"}}>
                        <Space direction="vertical">
                        {data.map((item, i) =>

                            <p 
                                ref={prices[i]}
                                key={item.id}
                                style={{margin: '0', color: 'rgba(0,0,0,.65)'}}>
                                {context.orden.serviciosDiseno.filter(servicio => servicio.id === item.id)[0] !== undefined
                                ? `$${context.orden.serviciosDiseno.filter(servicio => servicio.id === item.id)[0].total}`
                                : "$0"}
                            </p>
                        )}
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
