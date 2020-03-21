import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home';
import PeopleDetails from './details';
import NoMatch from './no-match';
import './styles.less';

export default function Main() {
    return (
        <Router>
            <div className="app-container">
                <Switch>
                    <Route exact path={['/', '/people']}>
                        <Home />
                    </Route>
                    <Route exact path="/people/:id">
                        <PeopleDetails />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
