import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

// @TODO: Code duplication. Refactor/Update Logic. almost identical to `./card/index.js`
export default function Profile({ title = '', link, img }) {
    const card = (
        <Fragment>
            {img && <img src={img} />}
            <div>{title}</div>
        </Fragment>
    );

    if (link) {
        return <Link to={link}>{card}</Link>;
    }
    return card;
}
