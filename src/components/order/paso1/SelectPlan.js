import React, { useState, useContext } from 'react'

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Typography, Select, Row, Col } from 'antd';
const { Text } = Typography;
const { Option } = Select

export default function SelectPlan({ data }) {

    const { orden, dispatch } = useContext(contextoGlobal)

    const [price, setPrice] = useState(0);

    const handleOnChange = (value, { id, children }) => {
        setPrice(value);
        
        if(value === 'No sé') {
            dispatch({
                type: 'establecerPlan',
                payload: {
                    name: children,
                    total: 0,
                    necesitaAyuda: true
                }
            });
        } else {
            const { name, offer, price, desc } = data.find(service => service.id === id);
            dispatch({
                type: 'establecerPlan',
                payload: {
                    id: id,
                    name: name,
                    total: price,
                    descripcion: desc,
                    offer: offer,
                    necesitaAyuda: false
                }
            });    
        }


        dispatch({
            type: 'estimarTotal'
        });
    }

    return (
        <Row align="middle" justify="space-between">
            <Col flex="1 0 170px">
                <Text strong>Plan de tienda</Text>
            </Col>
            <Col flex="1 0 150px">
                <Select 
                    defaultValue={orden.planTienda.name !== undefined ? orden.planTienda.name : "Seleccionar"}
                    onChange={handleOnChange}
                >    
                {data.map(e =>
                    <Option
                        id={e.id} 
                        key={e.id}
                        value={e.price}
                    >
                        {e.name}
                    </Option>
                )}
                    <Option value="No sé" key="0">
                        No sé
                    </Option>
                </Select>
            </Col>
            <Col flex="0 0 65px" style={{textAlign: "right"}}>
                <Text>
                    ${ orden.planTienda.total !== undefined ? orden.planTienda.total : price }<sub style={{bottom: '-1px'}}>/mes</sub>
                </Text>
            </Col>
        </Row>
    )
}
