import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import People from './people';
import PeopleDetails from './details';
import './styles.less';

export default function App() {
    // Added basic routing and screens
    return (
        <Router>
            <div className="app">
                <nav>
                    <ul>
                        <li>
                            <Link to="/people">People</Link>
                        </li>
                        <li>
                            <Link to="/people/1">People Details</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/">
                        <People />
                    </Route>
                    <Route path="/people/:id">
                        <PeopleDetails />
                    </Route>
                    <Route path="/people">
                        <People />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
