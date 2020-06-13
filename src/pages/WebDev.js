import React from 'react';
import {Helmet} from "react-helmet";

import Header from '../components/Header';
const Features = React.lazy(() => import('../components/Features'));
const CallToAction = React.lazy(() => import('../components/CallToAction'));

export default function index() {
    return ( <>
        <Helmet>
            <link rel="canonical" href="https://1tiendaonline.com/desarrollo-web" />
            <title>Desarrollo Web Profesional - 1tiendaonline</title>
            <meta name="description" content="Desarrollamos tu página web institucional con las mejores tecnologías y diseño profesional."/>
            <meta name="keywords" content="tiendaonline, tienda digital, e-commerce, ecommerce, redes sociales, emprendimiento, emprendedor, desarrollo web, profesional, diseño web, web design, developer, programador"></meta>
        </Helmet>
        <Header page="header-wd"/>
        <Features feature="web-designs"/>
        <CallToAction id="5ecc2ea52de4d316c9949ac0" />
    </>
    )
}
