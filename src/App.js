import React, { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// CONTEXT
import { contextoGlobal } from './estado/contextoGlobal';
import { ordenReducer, estadoInicial } from './estado/ordenReducer';

//DEPENDENCIAS
import { Spin } from 'antd';
const Layout = React.lazy(() => import('antd/lib/layout'));

//PAGES
const Index = React.lazy(() => import('./pages/Index'));
const WebDev = React.lazy(() => import('./pages/WebDev'));
const Planes = React.lazy(() => import("./pages/Planes"));
const Pages = React.lazy(() => import("./pages/Pages"));
const Page = React.lazy(() => import("./pages/Page"));
const Page404 = React.lazy(() => import("./pages/Page404"));

// COMPONENTES
const MobileMenu = React.lazy(() => import('./components/MobileMenu'));
const OrderPlan = React.lazy(() => import('./components/order/OrderPlan'));
const Nav = React.lazy(() => import('./components/Nav'));
const Footer = React.lazy(() => import('./components/Footer'));
const Contacto = React.lazy(() => import('./components/Contacto'));
const WppButton = React.lazy(() => import('./components/WppButton')); 


//MIXINS
const ScrollToTopComponent = React.lazy(() => import("./mixins/ScrollToTop"));

export default function App() {

  const [orden, dispatch] = useReducer(ordenReducer, estadoInicial); 

  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const [pages, setPages] = useState([]);
  useEffect(() => {
      async function Pages() {
      const res = await fetch('https://api.1tiendaonline.com/pages/')
      const data = await res.json();
      setPages(data)
      }
      Pages()
  }, [])

  const spin = {
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    background: 'linear-gradient(-15deg, rgb(243, 249, 255), white 50%)'
  }

  return (
    <React.Suspense fallback={<div style={spin}><Spin tip="1tiendaonline" /></div>}>
    <Layout style={{background: 'linear-gradient(-35deg, #f7fbff, white)'}}>
      <Router>
        <ScrollToTopComponent />
        <contextoGlobal.Provider value={{ orden: orden, dispatch: dispatch }}>
          <MobileMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>
          <Contacto contactVisible={contactVisible} setContactVisible={setContactVisible}/>
          <OrderPlan/>
          <Nav setMenuVisible={setMenuVisible} setContactVisible={setContactVisible}/>
          <Switch>
              <Route exact path='/' component={Index}/>
              <Route exact path='/planes' component={Planes}/>
              <Route exact path='/desarrollo-web' component={WebDev}/>
              <Route exact path='/pages'>
                <Pages pages={pages}/>
              </Route>
              {pages.map(page =>
              <Route exact path={'/'+page.url} key={page.id}>
                <Page idPage={page.id}/>
              </Route>
              )}
              <Route component={Page404}/>
          </Switch>
          <Footer/>
          <WppButton/>
        </contextoGlobal.Provider>
      </Router>
    </Layout>
    </React.Suspense>
  )
}