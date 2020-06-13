import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

import {Layout, Typography, Skeleton, List} from 'antd';
const {Content} = Layout;
const {Title} = Typography;

export default function Pages(props) {

    const pageStyle = {
        margin: '96px auto',
        minHeight: 'calc(100vh - 543px)',
        maxWidth: 800
    }

    const loading = props.pages.length === 0 ? true : false

    return ( <>
    <Helmet>
        <link rel="canonical" href="https://1tiendaonline.com/pages/" />
        <title>Explorar contenido - 1tiendaonline</title>
        <meta name="description" content="Explorar el contenido de nuestra página"/>
        <meta name="keywords" content="1tiendaonline, paginas web, tiendas online, tiendas digitales, ecommerce"></meta>
    </Helmet>
    <Content className="container" style={pageStyle}>
        <Title>Explorar contenido</Title>
        <Skeleton active className="text-loading" loading={loading}>
            <List
                dataSource={props.pages}
                renderItem={page => (
                <List.Item>
                    <List.Item.Meta
                    title={
                        <Link to={page.url}><Title level={3}>{page.title}</Title></Link>
                        }
                    description={page.seoDescription}
                    />
                </List.Item>
                )}
            />
        </Skeleton>
    </Content>
    </>)
}
