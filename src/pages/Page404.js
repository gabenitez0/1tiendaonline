import React from 'react';
import {Result, Button, Layout, Space} from 'antd';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
const {Content} = Layout;

const Page404 = () => {

    const empty = {
        margin: '48px auto',
        minHeight: 'calc(100vh - 543px)'
    }

    return ( <>
        <Helmet>
            <title>Página no encontrada - 1tiendaonline</title>
        </Helmet>

        <Content className="container">
            <Result
                status="404"
                title="404 - Página no encontrada"
                subTitle="Es posible que esta página no exista o se encuentre en construcción."
                style={empty}
                extra={<Space>
                    <Button type="link">
                        <Link to="/">Inicio</Link>
                    </Button>
                    <Button type="link">
                        <Link to="/pages">Mapa del sitio</Link>
                    </Button>
                </Space>}
            />
        </Content>
    </>)
}
export default Page404
