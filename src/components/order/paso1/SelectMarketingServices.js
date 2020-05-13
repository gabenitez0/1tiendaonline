import React, { useContext } from 'react';

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Row, Col, Typography, Space, Checkbox, Select, Spin } from 'antd';

const { Text } = Typography;
const { Option } = Select;

function SelectMarketingServices ({title, data }) {

  const { orden, dispatch } = useContext(contextoGlobal);

  const handleCheckboxChange = ({ target }) => {

    if(target.checked) {

      const { name } = data.find(service => service.id === target.id)

      dispatch({
        type: 'agregarServiciosPublicidad',
        payload: {
          id: target.id,
          name: name,
          necesitaAyuda: false,
          time: "10 días",
          total: 1500
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

  return (
    data.length === 0 
    ? <Spin size="large" />
    :
    <Row gutter={[32, 8]}>
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
                defaultChecked={
                  orden.serviciosPublicidad.map(service => service.id).includes(service.id) ? true : false
                }
                onChange={handleCheckboxChange}
              >
                {service.name}
              </Checkbox>
            ))}
          </Space>
          </Col>
          {/* Area de opciones */}
          <Col span={5}>
            <Space direction="vertical">
              {data.map(service => (
                <Select
                  key={service.id}
                  size="small"
                  onChange={handleSelectChange}
                  value={
                    orden.serviciosPublicidad.length > 0 && orden.serviciosPublicidad.find(item => item.id === service.id).time
                    ?
                    orden.serviciosPublicidad.find(item => item.id === service.id).time
                    :
                    "0 días"
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
          <Col span={5} style={{textAlign: "right"}}>
              <Space direction="vertical">
                {data.map(service => (
                  <Text key={service.id}>
                    ${
                        orden.serviciosPublicidad.find(item => item.id === service.id)
                        ?
                        orden.serviciosPublicidad.find(item => item.id === service.id).total
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

export default SelectMarketingServices;