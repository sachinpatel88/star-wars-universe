import React from 'react';
import './styles.less';

export default function Error({
    classNames = '',
    text = 'Error',
    reason = ''
}) {
    return (
        <div className={`error ${classNames}`}>
            {text}
            {reason}
        </div>
    );
}
