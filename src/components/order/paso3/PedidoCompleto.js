import React from 'react'
import ResumenCompra from '../paso2/ResumenCompra';

import {Divider, Result} from 'antd';

export default function PedidoCompleto() {

    return (<>
      <Result
        status="success"
        title="¡Pedido realizado con exito!"
        subTitle="Muchas gracias por realizar tu pedido, verificaremos el pago y nos pondremos en contacto contigo para darte el acceso a tu tienda lo antes posible."
      />,
      <Divider>Resumen de compra</Divider>
      <ResumenCompra />
    </>)
}
