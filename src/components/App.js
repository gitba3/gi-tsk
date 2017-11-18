import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import ApplicationListContainer from './rcp_form/ApplicationListContainer'; // eslint-disable-line import/no-named-as-default
import AddOrEditApplicationContainer from './rcp_form/AddOrEditApplicationContainer'; // eslint-disable-line import/no-named-as-default
import createBrowserHistory from 'history/createBrowserHistory';



const history = createBrowserHistory();


const App = () => {
    return (
        <div >
            <Router history={history}>
                <div>


                    {<Switch>
                        {<Route exact path="/" component={ApplicationListContainer} />}
                        <Route path="/applications" component={ApplicationListContainer} />
                        <Route exact path="/application" component={AddOrEditApplicationContainer} />
                        <Route path="/application/:id" component={AddOrEditApplicationContainer} />
                        {/*<Route component={PageNotFound} />*/}
                    </Switch>}

                </div>

            </Router>
        </div>
    );
};


export default App;