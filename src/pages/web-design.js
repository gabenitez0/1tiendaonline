import React, { Fragment } from 'react'

import Header from '../components/Header';
const Features = React.lazy(() => import('../components/Features'));
const CallToAction = React.lazy(() => import('../components/CallToAction'));

export default function index() {
    return (
        <Fragment>
            <Header/>
            <Features feature="web-designs"/>
            <CallToAction/>
        </Fragment>
    )
}
