import React, {useState, useRef, useContext} from 'react'
import {OrderContextProvider, OrderContext} from '../../../context/OrderContext'

import {Typography, Space, Select, Row, Col, Checkbox, InputNumber} from 'antd';
const {Text} = Typography;
const { Option } = Select

SelectPlan.contextType = OrderContext

export default function SelectPlan(props) {

    const data = useContext();

   /*  const [data, setData] = useState([
        {
            id: 0,
            name: 'Diseño de logotipo',
            price: 1500,
            qty: [1, 2, 3, 4, 5],
            checked: false
        },
        {
            id: 1,
            name: 'Diseño de imagen',
            price: 4000,
            qty: [1, 2, 3, 4, 5],
            checked: false
        },
        {
            id: 2,
            name: 'Recursos gráficos',
            price: 500,
            qty: [1, 2, 3, 4, 5],
            checked: false
        }
    ]); */

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const items = Array.from({ length: data.length }, a => useRef(null));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prices = Array.from({ length: data.length }, a => useRef(null));
    
    const handleInputChange = event => {
        const ID = event.target.id;
        data.forEach(item => {
          if (item.id === Number(event.target.id)) {
            item.checked = !item.checked;
            items[item.id].current.disabled = !items[item.id].current.disabled;
          } else{
            prices[ID].current.innerText = '$0'
          }
        });
    };

    const handleSelectChange = event => {
        const ID = event.target.id;
        prices[ID].current.innerText = '$' + data[ID].price * event.target.value;
    };

    const select ={
        border: '1px solid #d9d9d9',
        width: '60px'
    }

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
                            onChange={handleInputChange}>
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
                                defaultValue="qty"
                                style={select}
                                onChange={handleSelectChange}
                                disabled>
                                <option value="qty" disabled>
                                    Qty
                                </option>
                                {item.qty.map(a =>
                                    <option
                                        key={Math.random()}
                                        value={a}
                                    >
                                        {a}
                                    </option>
                                )}
                                <option value={0}>
                                    No sé
                                </option>
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
                                $0
                            </p>
                        )}
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
