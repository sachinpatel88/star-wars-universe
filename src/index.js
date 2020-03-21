import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens';

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

ReactDOM.render(<App />, root);
