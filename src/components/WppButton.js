import React from 'react';
import {WhatsAppOutlined} from '@ant-design/icons';

export default function WppButton() {
    const wppButton = {
        position: 'fixed',
        zIndex: 10,
        bottom: '2vw',
        right: '3vw',
        width: 50,
        height: 50,
        background: 'mediumseagreen',
        color: 'white',
        fontSize: 32,
        padding: 8,
        borderRadius: '50%',
        boxShadow: 'rgba(111, 158, 188, 0.3) 0px 2px 5px 1px, rgba(74, 142, 254, 0.06) 0px 5px 15px 6px'
    }
    return (
        <a 
        id="tag-contacto" 
        href="https://api.whatsapp.com/send?phone=5491122542474"
        target="_blank"
        rel="noopener noreferrer"
        >
            <WhatsAppOutlined style={wppButton}/>
        </a>
    )
}
