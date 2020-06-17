import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";

import {Layout, Typography, Skeleton} from 'antd';
const {Content} = Layout;
const {Paragraph, Title} = Typography;
const ReactMarkdown = require('react-markdown');

export default function Page(props) {

    const [page, setPage] = useState([]);
    useEffect(() => {
        async function Page() {
        const res = await fetch('https://api-1tiendaonline.herokuapp.com/pages/'+props.idPage)
        const data = await res.json();
        setPage(data)
        }
        Page()
    }, [])

    const pageStyle = {
        margin: '96px auto',
        minHeight: 'calc(100vh - 543px)',
        maxWidth: 800
    }

    const loading = page.length === 0 ? true : false

    return ( <>
    <Helmet>
        <link rel="canonical" href={"https://1tiendaonline.com/"+page.url} />
        <title>{page.title + ' - 1tiendaonline'}</title>
        <meta name="description" content={page.seoDescription}/>
        <meta name="keywords" content={page.tags}></meta>
    </Helmet>
    <Content className="container" style={pageStyle}>
        <Skeleton active loading={loading}>
            <Title>{page.title}</Title>
            <Paragraph><ReactMarkdown source={page.content} className="pages" /></Paragraph>
        </Skeleton>
    </Content>
    </>)
}
