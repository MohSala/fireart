import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Loader from "./components/common/Loader";
const Results = lazy(() => import('./pages/Results'));
const Quiz = lazy(() => import('./pages/Quiz'));
const SelectDifficulty = lazy(() => import('./pages/SelectDifficulty'));


function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            <Route exact path="/" component={SelectDifficulty} />
            <Route exact path="/quiz" component={Quiz} />
            <Route exact path="/results" component={Results} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
