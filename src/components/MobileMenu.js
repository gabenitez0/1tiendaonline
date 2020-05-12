import React from 'react'
import {Drawer} from 'antd';

export default function MobileMenu(props) {
  const {menuVisible, setMenuVisible} = props.visible;
  return(
    <Drawer
      title="Menu"
      placement="left"
      closable={true}
      onClose={setMenuVisible(false)}
      visible={menuVisible}
      width={props.mobileRes ? "100%" : "500px"}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
}