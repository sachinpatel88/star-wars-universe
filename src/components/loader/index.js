import React from 'react';
import './styles.less';

export default function Loader({
    classNames = '',
    loading = false,
    text = 'Fetching Data...'
}) {
    return (
        <div
            className={`loader ${classNames} ${
                loading ? '' : 'hideVisibility'
            }`}
        >
            {text}
        </div>
    );
}
