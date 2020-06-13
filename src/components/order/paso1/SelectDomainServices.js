import React, { useContext } from 'react';

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Col, Row, Typography, Spin, Space, Checkbox, Select, Popover } from 'antd';
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

  const minWidth = {
    width: '100%',
    minWidth: 80
  }

  return (
    data.length === 0 
    ? <Spin size="small" />
    :
      <Row gutter={8} align="middle">
        <Col flex="1 0 0">
          <Space direction="vertical">
            <Text strong>Nombres de Dominio</Text>
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
                <Popover content={service.desc}><Text className="popover_planes">{service.name}</Text></Popover>
              </Checkbox>
            ))}
          </Space>
        </Col>
        <Col flex="75px">
          <Space direction="vertical" style={minWidth}>
            <Text strong>Tiempo</Text>
            {data.map(service => (
              <Select 
                key={service.id}
                style={minWidth}
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
        <Col flex="65px" className="pricePaso1">
          <Space direction="vertical">
            <Text strong>Precio</Text>
            {data.map(service => (
              <Text key={service.id}>
                ${
                  orden.servicioDominio.find(item => item.id === service.id)
                  ?
                  orden.servicioDominio.find(item => item.id === service.id).total
                  : "0"
                }<sub style={{bottom: -1}}>/ars</sub>
              </Text>
            ))}
          </Space>
        </Col>
      </Row>
    );
}

export default SelectDomainServices;