import React, { useContext } from 'react'
import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Typography, Space, Row, Col, Checkbox, Spin, Select } from 'antd';

const { Text } = Typography;
const { Option } = Select;

function SelectGraphicServices({ title, data }) {

    const { orden, dispatch } = useContext(contextoGlobal);


    const onCheckboxChange = ({ target }) => {

        if (target.checked) {

            const { name, price } = data.find(service => service.id === target.id);

            dispatch({
                type: 'agregarServiciosDiseno',
                payload: {
                    id: target.id,
                    name: name,
                    price: price,
                    qty: 1,
                    total: price
                }
            });

            dispatch({
                type: 'estimarTotal'
            });

        } else {

            dispatch({
                type: 'eliminarServiciosDiseno',
                payload: {
                    id: target.id
                }
            });

            dispatch({
                type: 'estimarTotal'
            });

        }
    }

    const onSelectChange = (value, { id }) => {
        const { price } = orden.serviciosDiseno.find(service => service.id === id);

        if(value === 'No sé') {
            dispatch({
                type: 'modificarServiciosDiseno',
                payload: {
                    id: id,
                    qty: "No sé",
                    total: 0,
                    necesitaAyuda: true
                }
            });
        } else {
            dispatch({
                type: 'modificarServiciosDiseno',
                payload: {
                    id: id,
                    qty: value,
                    total: price * value,
                    necesitaAyuda: false
                }
            });
        }



        dispatch({
            type: 'estimarTotal'
        });
    }

    
    return (
        data.length === 0
            ? <Spin size="large" />
            :
            <Row gutter={[32, 8]}>
                <Col sm={7} span={24}>
                    <Text strong>Servicios de {title}</Text>
                </Col>
                <Col sm={17} span={24}>
                    <Row gutter={8} align="middle">
                        <Col span={14}>
                            <Space direction="vertical">
                                {data.map(service => (
                                    <Checkbox
                                        key={service.id}
                                        id={service.id}
                                        onChange={onCheckboxChange}
                                        defaultChecked={
                                            orden.serviciosDiseno.length > 0
                                            ?
                                            orden.serviciosDiseno.map(designService => designService.id).includes(service.id)
                                            :
                                            false
                                        }
                                    >
                                        {service.name}
                                    </Checkbox>
                                ))}
                            </Space>
                        </Col>
                        <Col span={5}>
                            <Space direction="vertical">
                                {data.map(service => (
                                    <Select
                                        key={service.id}
                                        size="small"
                                        onChange={onSelectChange}
                                        value={
                                            orden.serviciosDiseno.find(item => item.id === service.id)
                                            ?
                                            orden.serviciosDiseno.find(item => item.id === service.id).qty
                                            :
                                            "Elegir"
                                        }
                                        disabled={
                                            orden.serviciosDiseno.length > 0 && orden.serviciosDiseno.map(servicio => servicio.id).includes(service.id)
                                            ?
                                            false
                                            :
                                            true
                                        }
                                    >
                                        {service.qty.map((option, index) => (
                                            <Option
                                                id={service.id}
                                                key={index}
                                                value={option}
                                            
                                            >
                                                {option}
                                            </Option>
                                        ))}
                                    </Select>
                                ))}
                            </Space>
                        </Col>
                        <Col span={5} style={{ textAlign: "right" }}>
                            <Space direction="vertical">
                                {data.map(service => (
                                    <Text key={service.id}>
                                        ${
                                            orden.serviciosDiseno.find(item => item.id === service.id)
                                            ?
                                            orden.serviciosDiseno.find(item => item.id === service.id).total
                                            : 
                                            "0"
                                        }
                                    </Text>
                                ))}
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
    )
}

export default SelectGraphicServices;