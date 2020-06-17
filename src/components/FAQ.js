import React, {useState, useEffect} from 'react';

import Fade from 'react-reveal/Fade';
import {Collapse, Typography, Skeleton, Layout, Space} from 'antd';
const { Panel } = Collapse;
const {Content} = Layout;
const {Text, Title} = Typography;

export default function FAQ() {

    const [data, setData] = useState([]);
    useEffect(() => {
        async function data() {
            const res = await fetch('https://api.1tiendaonline.com/faq')
            const dataJson = await res.json();
            setData(dataJson);
        }
        data();
    }, [])

    const loading = data.length === 0 ? true : false;

    const faq = {
        border: '1px solid rgb(230, 239, 244)',
        backgroundColor: 'white',
        marginBottom: 8
    }

    return ( <>
    <Fade>
        <section id="faq" key={data.id} style={{margin: '64px 0'}}>
            <Content className="container">
                <Skeleton active loading={loading}>
                    <Space direction="vertical" style={{width: '100%'}}>
                        <Title level={3} style={{textAlign: 'center'}}>{data.title}</Title>
                        <Collapse 
                            bordered={false}
                            style={{backgroundColor: 'transparent'}}
                            expandIconPosition="right"
                            defaultActiveKey={['5ee67cff24179a28ca1ccb26', '5ee6878ac1821c28ef7d564c']}
                        >
                            {data.Pregunta && data.Pregunta.map(e => 
                                <Panel 
                                    header={<Title level={4} style={{margin: 0}}>{e.title}</Title>} 
                                    key={e.id}
                                    style={faq}
                                >
                                    <Text strong>{e.desc}</Text>
                                </Panel>
                            )}
                        </Collapse>
                    </Space>
                </Skeleton>
            </Content>
        </section>
    </Fade>
    </>)
}
