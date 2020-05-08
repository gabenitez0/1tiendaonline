import React, {useState, useEffect} from 'react'

import {Typography, Space, Select, Row, Col, InputNumber, Dropdown, Button, Menu} from 'antd';
const {Text} = Typography;
const { Option } = Select

export default function SelectPlan(props) {

    const [price, setPrice] = useState(0);
    /* useEffect(() => {
        console.log(price)
    }) */

    return (
        <Row gutter={[32, 8]}>
            <Col sm={7} span={24}>
                <Text strong>Plan de tienda</Text>
            </Col>
            <Col sm={17} span={24}>
                <Row align="middle" justify="space-between">
                    <Col span={12}>
                        <Select 
                            defaultValue="Seleccionar" 
                            style={{width: 200}}
                            onChange={e => setPrice(e)}>
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
                        <Text>${price}<sub style={{bottom: '-1px'}}>/mes</sub></Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
