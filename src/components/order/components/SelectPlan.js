import React, { useState, useContext } from 'react'

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Typography, Select, Row, Col } from 'antd';
const { Text } = Typography;
const { Option } = Select

export default function SelectPlan(props) {

    const context = useContext(contextoGlobal)

    const [price, setPrice] = useState(0);
    /* useEffect(() => {
        console.log(price)
    }) */

    const handleOnChange = (value, {children}) => {
        setPrice(value);
        context.dispatch({
            type: 'establecerPlan',
            payload: {
                plan: children,
                total: value 
            }
        });

        context.dispatch({
            type: 'estimarTotal'
        });
    }

    return (
        <Row gutter={[32, 8]}>
            <Col sm={7} span={24}>
                <Text strong>Plan de tienda</Text>
            </Col>
            <Col sm={17} span={24}>
                <Row align="middle" justify="space-between">
                    <Col span={12}>
                        <Select 
                            defaultValue={context.orden.planTienda.plan !== undefined ? context.orden.planTienda.plan : "Seleccionar"}
                            style={{width: 200}}
                            onChange={(value, option) => handleOnChange(value, option) }
                            
                        >    
                        {props.data.map(e =>
                            <Option 
                                key={e.id}
                                value={e.price}
                            >
                                {e.name}
                            </Option>
                        )}
                            <Option value="0" key="0">
                                No sé
                            </Option>
                        </Select>
                    </Col>
                    <Col span={6} style={{textAlign: "right"}}>
                        <Text>
                            ${ context.orden.planTienda.total !== undefined ? context.orden.planTienda.total : price }<sub style={{bottom: '-1px'}}>/mes</sub>
                        </Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
