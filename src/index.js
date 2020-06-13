import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.hydrate(
        <App />, 
document.getElementById('main'))