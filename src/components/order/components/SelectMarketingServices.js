import React, { useContext } from 'react';

import { contextoGlobal } from '../../../estado/contextoGlobal';

import { Row, Col, Typography, Space, Checkbox, Select } from 'antd';

const { Text } = Typography;
const { Option } = Select;

function SelectMarketingServices ({title, data }) {

  const { orden, dispatch } = useContext(contextoGlobal);

  const handleCheckboxChange = ({ target }) => {
    if(target.checked) {

      dispatch({
        type: 'agregarServiciosPublicidad',
        payload: {
          id: target.id,
          necesitaAyuda: false
        }
      });

    } else {

      dispatch({
        type: 'eliminarServiciosPublicidad',
        payload: {
          id: target.id
        }
      });

      dispatch({ type: 'estimarTotal' });

    }
  }

  const handleSelectChange = (value, { id, children }) => {
    dispatch({
      type: 'modificarServicioPublicidad',
      payload: {
        id: id,
        time: children,
        price: value
      }
    })

    dispatch({ type: 'estimarTotal' });
  }

  return (
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
              {data.map((servicio, index) => {
                if(orden.serviciosPublicidad.length <= 0) {
                  return <Text>$0</Text>
                } else {
                  return <Text>${orden.serviciosPublicidad[index].total || 0}</Text>;
                }
              })}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
    
    
  )
}

export default SelectMarketingServices;