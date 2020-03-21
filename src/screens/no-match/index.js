import React from 'react';
import './styles.less';

export default function NoMatch({ text = '404 - Requested Page Not Found' }) {
    return <h3>{text}</h3>;
}
