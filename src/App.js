import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//DEPENDENCIAS
import { Spin } from 'antd';

//PAGES
const Index = React.lazy(() => import('./pages/index'));
const WebDesign = React.lazy(() => import('./pages/web-design'));

// COMPONENTES
const Layout = React.lazy(() => import('antd/lib/layout'));
const Nav = React.lazy(() => import('./components/Nav'));
/* const Header = React.lazy(() => import('./components/Header')); */
const Footer = React.lazy(() => import('./components/Footer'));
const Planes = React.lazy(() => import("./components/Planes"));
const OrderPlan = React.lazy(() => import("./components/order/OrderPlan"));

//MIXINS
/* import Page404 from './mixins/Page404';
import ScrollToTop from './mixins/ScrollToTop'; */
const Page404 = React.lazy(() => import("./mixins/Page404"));
const ScrollToTop = React.lazy(() => import("./mixins/ScrollToTop"));


export default function App() {

  const [visible, setVisible] = useState()

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
        <ScrollToTop/>
        <Nav setVisible={setVisible}/>
        <Switch>
          <Route exact path='/' component={Index}/>
          <Route exact path='/planes' component={Planes}/>
          <Route exact path='/web-design' component={WebDesign}/>
          <Route><Page404/></Route>
        </Switch>
        <Footer/>
        <OrderPlan visibleState={{visible, setVisible}} />
      </Router>
    </Layout>
    </React.Suspense>
  )
}