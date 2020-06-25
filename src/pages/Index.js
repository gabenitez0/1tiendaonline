import React from 'react'
import {Helmet} from "react-helmet";

import Header from '../components/Header';
const Features = React.lazy(() => import('../components/Features'));
const CallToAction = React.lazy(() => import('../components/CallToAction'));
const Planes = React.lazy(() => import('../components/Planes'));
const FAQ = React.lazy(() => import('../components/FAQ'));

export default function index() {
    return (
        <>
            <Helmet>
                <link rel="canonical" href="https://1tiendaonline.com/" />
                <title>Tu Propia Tienda Online Hoy - 1tiendaonline</title>
                <meta name="description" content="Hacé Crecer tus Ventas y tu Negocio. Creamos tu Tienda Online Autoadministrable con Tiendanube y Shopify."/>
                <meta name="keywords" content="tiendaonline, tienda digital, e-commerce, ecommerce, redes sociales, emprendimiento, emprendedor, ventas, compras, ropa, instagram, facebook, prestashop, woocommerce, tiendanube, shopify"></meta>
            </Helmet>

            <Header page="header"/>
            <Features feature="features"/>
            <Planes />
            <FAQ />
        </>
    )
}
