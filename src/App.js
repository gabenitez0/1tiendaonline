import React, { useState, useReducer } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// CONTEXT
import { contextoGlobal } from './estado/contextoGlobal';
import { ordenReducer, estadoInicial } from './estado/ordenReducer';

//DEPENDENCIAS
import { Spin } from 'antd';

const OrderPlan = React.lazy(() => import('./components/order/OrderPlan'));

//PAGES
const Index = React.lazy(() => import('./pages/index'));
const WebDesign = React.lazy(() => import('./pages/web-design'));

// COMPONENTES
const Layout = React.lazy(() => import('antd/lib/layout'));
const Nav = React.lazy(() => import('./components/Nav'));
const Footer = React.lazy(() => import('./components/Footer'));
const Planes = React.lazy(() => import("./components/Planes"));


//MIXINS
/* import Page404 from './mixins/Page404';
import ScrollToTop from './mixins/ScrollToTop'; */
const Page404 = React.lazy(() => import("./mixins/Page404"));
const ScrollToTopComponent = React.lazy(() => import("./mixins/ScrollToTop"));

export default function App() {

  const [orden, dispatch] = useReducer(ordenReducer, estadoInicial); 

  const [visible, setVisible] = useState();

  const spin = {
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  }

  return (
    <React.Suspense fallback={<div style={spin}><Spin tip="1tiendaonline"/></div>}>
    <Layout style={{background: 'linear-gradient(-35deg, #f7fbff, white)'}}>
      <Router>
        <ScrollToTopComponent />
        <contextoGlobal.Provider value={{ orden: orden, dispatch: dispatch }}>
          <OrderPlan visibleState={{visible, setVisible}} />
          <Nav setVisible={setVisible}/>
          <Switch>
              <Route exact path='/' component={Index}/>
              <Route exact path='/planes' component={Planes}/>
              <Route exact path='/web-design' component={WebDesign}/>
              <Route>
                <Page404/>
              </Route>
          </Switch>
          <Footer/>
          
        </contextoGlobal.Provider>
      </Router>
    </Layout>
    </React.Suspense>
  )
}