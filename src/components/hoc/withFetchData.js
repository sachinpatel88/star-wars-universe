import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

export default function withFetchData(
    WrappedComponent,
    Query,
    variables,
    props,
    dataKey
) {
    const { data, loading, error } = useQuery(Query, {
        variables
    });

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    const details = get(data, dataKey, data);

    return <WrappedComponent {...props} data={details} />;
}
