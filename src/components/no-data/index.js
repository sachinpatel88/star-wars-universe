import React from 'react';
import './styles.less';

export default function NoData({
    classNames = '',
    text = 'Data not available',
    reason = ''
}) {
    return (
        <div className={`no-data ${classNames}`}>
            {text}
            {reason}
        </div>
    );
}
