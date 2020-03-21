import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import { normalizeKeyValue } from '../../utils';
import './styles.less';

// Create rows from given details
function getRowList(data) {
    return data.map(({ title, description }, index) => (
        <div className="row" key={`list-${index}`}>
            <span className="column title" key={`title-${index}`}>
                {title}
            </span>
            <span className="column description" key={`desc-${index}`}>
                {description}
            </span>
        </div>
    ));
}

export default function TableView({ data, group = false }) {
    if (!isPlainObject(data)) return <p>Invalid data input.</p>;

    const normalizeData = normalizeKeyValue(data);
    const listView = getRowList(normalizeData);

    if (group) return <div className="groupRows">{listView}</div>;

    return listView;
}
