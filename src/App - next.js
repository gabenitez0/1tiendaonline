import React, { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// CONTEXT
import { contextoGlobal } from './estado/contextoGlobal';
import { ordenReducer, estadoInicial } from './estado/ordenReducer';

//DEPENDENCIAS
import { Spin, Layout } from 'antd';
import Contacto from './components/Contacto';

//PAGES
import Index from './pages/Index';
import WebDev from './pages/WebDev';
import Planes from './pages/Planes';
import Pages from './pages/Pages';
import Page from './pages/Page';
import Page404 from './pages/Page404';

// COMPONENTES
import MobileMenu from './components/MobileMenu';
import OrderPlan from './components/order/OrderPlan';
import Nav from './components/Nav';
import Footer from './components/Footer';


//MIXINS
import ScrollToTopComponent from './mixins/ScrollToTop';

let history
if (typeof document !== 'undefined') {
  const createBrowserHistory = require('history/createBrowserHistory').default

  history = createBrowserHistory()
}
export default history;

export default function App() {

  const [orden, dispatch] = useReducer(ordenReducer, estadoInicial); 

  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const [pages, setPages] = useState([]);
  useEffect(() => {
      async function Pages() {
      const res = await fetch('https://api-1tiendaonline.herokuapp.com/pages/')
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
        </contextoGlobal.Provider>
      </Router>
    </Layout>
  )
}