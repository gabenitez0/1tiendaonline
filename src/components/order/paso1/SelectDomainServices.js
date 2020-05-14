import React, { useContext } from 'react';

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Col, Row, Typography, Spin, Space, Checkbox, Select } from 'antd';
const { Option } = Select;

const { Text } = Typography;
 
function SelectDomainServices({ data, title }) {

  const { orden, dispatch } = useContext(contextoGlobal);

  const handleCheckboxChange = ({ target }) => {
    const { name, options } = data.find(service => service.id === target.id);

    if(target.checked) {
      dispatch({
        type: 'agregarServicioDominio',
        payload: {
          id: target.id,
          name: name,
          necesitaAyuda: false,
          time: options[0].time,
          total: options[0].price
        }
      });
    } else {
      dispatch({
        type: 'eliminarServicioDominio',
        payload: {
          id: target.id
        }
      });
    }


    dispatch({
      type: 'estimarTotal'
    });

  }

  const handleSelectChange = (value, { id, children }) => {
    
    if(children === 'No sé') {

      dispatch({
        type: 'modificarServicioDominio',
        payload: {
          id: id,
          time: children,
          price: value,
          necesitaAyuda: true
        }
      });

    } else {

      dispatch({
        type: 'modificarServicioDominio',
        payload: {
          id: id,
          time: children,
          price: value,
          necesitaAyuda: false
        }
      });

    }

    dispatch({ type: 'estimarTotal' });
  }

  return (
    data.length === 0 
    ? <Spin size="large" />
    :<Row gutter={[32, 8]}>
    <Col sm={7} span={24}>
      <Text strong>Servicios de {title}</Text>
    </Col>
    {/* Area de servicios */}
    <Col sm={17} span={24}>
      <Row gutter={8} align="middle">
      <Col span={14}>
        <Space direction="vertical">
          {data.map(service => (
            <Checkbox
              key={service.id}
              id={service.id}
              disabled={
                orden.servicioDominio.length !== 0
                ? !orden.servicioDominio.map(item => item.id).includes(service.id)
                : false
              }
              defaultChecked={
                orden.servicioDominio.length !== 0
                ? orden.servicioDominio.map(item => item.id).includes(service.id)
                : false
              }
              onChange={handleCheckboxChange}
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
                value={
                  orden.servicioDominio.length !== 0 && orden.servicioDominio.map(item => item.id).includes(service.id)
                  ? orden.servicioDominio.find(item => item.id === service.id).time
                  : "Elegir"
                }
                disabled={
                  !orden.servicioDominio.map(service => service.id).includes(service.id)
                }
                onChange={handleSelectChange}
              >
                {service.options.map((option, index) => (
                  <Option
                    id={service.id} 
                    key={index}
                    value={option.price}
                  >
                    {option.time}
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
                  orden.servicioDominio.find(item => item.id === service.id)
                  ?
                  orden.servicioDominio.find(item => item.id === service.id).total
                  : "0"
                }
              </Text>
            ))}
          </Space>
        </Col>
      </Row>
    </Col>
  </Row>
  );

}

export default SelectDomainServices;