import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

export default function Card({ child, link, fullWidth, header }) {
    const card = (
        <div className={`${(fullWidth && 'full') || 'default'}-width-card`}>
            {header && <h3>{header}</h3>}
            {child}
        </div>
    );

    // Wrap link if provided
    if (link) {
        return <Link to={link}>{card}</Link>;
    }

    return card;
}
