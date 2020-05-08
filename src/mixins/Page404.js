import React from 'react';
import {Empty, Space, Layout} from 'antd';
import {Link} from 'react-router-dom';
const {Content} = Layout;

const Page404 = () => {

    const empty = {
        margin: '64px 0',
        minHeight: 'calc(100vh - 492px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }

    return (
        <Content className="container">
            <Empty style={empty} 
                description="Error 404 - Página no encontrada">
                <Space direction="vertical" size={16}>
                    Es posible que esta página sea inválida o se encuentre en construcción 
                    <Link to="/">Volver al inicio</Link>
                </Space>
                <div className="push"></div>
            </Empty>
        </Content>
    )
}
export default Page404
