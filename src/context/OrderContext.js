import React from 'react';

//CONTEXTO
import diseño from '../components/order/diseño'
export const OrderContext = React.createContext(diseño);

export function OrderContextProvider(props) {
    return(
    <OrderContext.Provider>
        {props.children}
    </OrderContext.Provider>
    )
}

export const OrderContextConsumer = OrderContext.Consumer