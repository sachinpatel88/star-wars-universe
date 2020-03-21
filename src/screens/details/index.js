import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import parseInt from 'lodash/parseInt';
import Details from './../../graphql/details.graphql';
import FilmQuery from './../../graphql/films.graphql';
import SpeciesQuery from './../../graphql/species.graphql';
import VehicleQuery from './../../graphql/vehicles.graphql';
import StarshipQuery from './../../graphql/star-ships.graphql';
import PlanetQuery from './../../graphql/planets.graphql';
import Card from './../../components/card';
import TableView from '../../components/card/table-view';
import FetchAndFeedDataWrapper from './../../components/fetch-and-feed-data-wrapper';
import Error from './../../components/error';
import NoData from './../../components/no-data';
import Loader from './../../components/loader';

const queryMap = {
    starship: StarshipQuery,
    vehicle: VehicleQuery,
    film: FilmQuery,
    species: SpeciesQuery,
    homeworld: PlanetQuery
};

function createDetailsFetcher(urls, dataKey) {
    return (
        <FetchAndFeedDataWrapper
            query={queryMap[dataKey]}
            dataKey={dataKey}
            urls={urls}
            group
        />
    );
}

export default function PeopleDetails() {
    const { id } = useParams();

    const { data, loading, error } = useQuery(Details, {
        variables: { id: parseInt(id) }
    });

    if (loading) return <Loader loading={loading} />;
    if (error) return <Error />;
    if (!data) return <NoData text="Not found"></NoData>;

    const {
        details: {
            films,
            species,
            vehicles,
            starships,
            homeworld,
            url,
            ...basic
        }
    } = data;

    const basicInfo = <TableView data={basic} />;
    const homeworldInfo = (
        <FetchAndFeedDataWrapper
            query={PlanetQuery}
            dataKey="planet"
            url={homeworld}
        />
    );

    const filmsInfo = createDetailsFetcher(films, 'film');
    const speciesInfo = createDetailsFetcher(species, 'species');
    const vehiclesInfo = createDetailsFetcher(vehicles, 'vehicle');
    const starshipsInfo = createDetailsFetcher(starships, 'starship');

    return (
        <Fragment>
            <Card fullWidth child={basicInfo} header={'Baisc Details'} />
            <Card fullWidth child={homeworldInfo} header={'Home Planet'} />
            <Card fullWidth child={filmsInfo} header={'Films'} />
            <Card fullWidth child={speciesInfo} header={'Species'} />
            <Card fullWidth child={vehiclesInfo} header={'Vehicles'} />
            <Card fullWidth child={starshipsInfo} header={'Starships'} />
        </Fragment>
    );
}
