import React from 'react';
import NoData from './../../components/no-data';
import { getIdFromUrl } from './../../utils';
import TableView from '../card/table-view';
import WithFetchData from '../hoc/withFetchData';

function WithQuery({ id, query, dataKey, ...props }) {
    // dataKey used to identify present result from response
    return WithFetchData(TableView, query, { id: id }, props, dataKey);
}

export default function FetchAndFeedDataWrapper({ url, urls = [], ...props }) {
    if (url) return <WithQuery id={getIdFromUrl(url)} {...props} />;
    if (!urls.length) return <NoData />;

    return urls.map((url, key) => (
        <WithQuery key={key} id={getIdFromUrl(url)} {...props} />
    ));
}
