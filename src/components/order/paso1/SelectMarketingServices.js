import React, { useContext } from 'react';

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Row, Col, Typography, Space, Checkbox, Select, Spin, Popover } from 'antd';

const { Text } = Typography;
const { Option } = Select;

function SelectMarketingServices ({title, data }) {

  const { orden, dispatch } = useContext(contextoGlobal);

  const handleCheckboxChange = ({ target }) => {

    if(target.checked) {

      const { name, options } = data.find(service => service.id === target.id);

      dispatch({
        type: 'agregarServiciosPublicidad',
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
        type: 'eliminarServiciosPublicidad',
        payload: {
          id: target.id
        }
      });

    }

    dispatch({ type: 'estimarTotal' });
  }

  const handleSelectChange = (value, { id, children }) => {
    
    if(children === 'No sé') {

      dispatch({
        type: 'modificarServicioPublicidad',
        payload: {
          id: id,
          time: children,
          price: value,
          necesitaAyuda: true
        }
      });

    } else {

      dispatch({
        type: 'modificarServicioPublicidad',
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
          <Text strong>Servicios de Publicidad</Text>
          {data.map(service => (
            <Checkbox 
              key={service.id}
              id={service.id}
              defaultChecked={
                orden.serviciosPublicidad.map(service => service.id).includes(service.id) ? true : false
              }
              onChange={handleCheckboxChange}
            >
              <Popover content={service.desc}><Text className="popover_planes">{service.name}</Text></Popover>
            </Checkbox>
          ))}
        </Space>
      </Col>
      {/* Area de opciones */}
      <Col flex="75px">
        <Space direction="vertical" style={minWidth}>
          <Text strong>Tiempo</Text>
          {data.map(service => (
            <Select
              key={service.id}
              style={minWidth}
              size="small"
              onChange={handleSelectChange}
              value={
                orden.serviciosPublicidad.length !== 0 && orden.serviciosPublicidad.map(item => item.id).includes(service.id)
                ? orden.serviciosPublicidad.find(item => item.id === service.id).time
                : "Elegir"
              }
              disabled={
                !orden.serviciosPublicidad.map(service => service.id).includes(service.id)
              }
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
                  orden.serviciosPublicidad.find(item => item.id === service.id)
                  ?
                  orden.serviciosPublicidad.find(item => item.id === service.id).total
                  :
                  "0"
              }<sub style={{bottom: -1}}>/ars</sub>
            </Text>
          ))}
        </Space>
      </Col>
    </Row>
  )
}

export default SelectMarketingServices;