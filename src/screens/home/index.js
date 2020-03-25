import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PagedPeople from './../../graphql/people.graphql';
import Card from './../../components/card';
import Profile from './../../components/card/profile-card';
import Loader from './../../components/loader';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import { getIdFromUrl, getProfileUrl } from './../../utils';
import ReactGA from 'react-ga';
import './styles.less';

const NAME_SPACE_KEY = 'people';

function getProfileCard({ name, url, gender }, index) {
    return (
        <Card
            key={`${NAME_SPACE_KEY}-${index}`}
            child={
                <Profile
                    title={name}
                    link={`${NAME_SPACE_KEY}/${getIdFromUrl(url)}`}
                    img={getProfileUrl(gender)}
                />
            }
        />
    );
}

// Retrieve data from prev and new results and merge it
function mergeResults(prevResult, newResult) {
    const prevData = get(prevResult, NAME_SPACE_KEY, prevResult);
    const newData = get(newResult, NAME_SPACE_KEY, newResult);

    return Object.assign({}, prevData, {
        people: {
            people: [...prevData[NAME_SPACE_KEY], ...newData],
            cursor: newResult.cursor,
            __typename: 'PagedPeople'
        }
    });
}

export default function Home() {
    let nextPageNumb = 1;
    const { data, loading, error, fetchMore } = useQuery(PagedPeople, {
        variables: { cursor: nextPageNumb }
    });
    ReactGA.pageview(window.location.pathname);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let loadingMore = false;
        const handleScroll = debounce(() => {
            // Skip fetchMore if it's already being fetched
            if (isLoading || loadingMore) return;

            if (
                document.documentElement.scrollTop + window.innerHeight ===
                    document.documentElement.offsetHeight &&
                nextPageNumb
            ) {
                loadingMore = true;
                setIsLoading(true);

                // Fetch results on scroll down using
                // Apollo-graphQL's "cursor-based" pagination
                return fetchMore({
                    query: PagedPeople,
                    variables: { cursor: nextPageNumb },
                    updateQuery: (
                        prevResult,
                        { fetchMoreResult: { people: newResult } }
                    ) => {
                        if (!newResult) return prevResult;
                        const mergedData = mergeResults(prevResult, newResult);

                        nextPageNumb = get(newResult, 'cursor.nextPage');
                        setIsLoading(false);
                        loadingMore = false;

                        return mergedData;
                    }
                });
            }
        }, 200);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return <Loader loading={loading} />;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    const PeopleCards = data.people.people.map((props, index) =>
        getProfileCard(props, index)
    );

    return (
        <Fragment>
            <div className="home-screen">{PeopleCards}</div>
            {<Loader loading={isLoading} />}
        </Fragment>
    );
}
