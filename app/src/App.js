import './App.css';
import Weather from "./components/weather";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <Switch>
                  <Route exact path='/' component={Weather} />
                  <Route>
                      <Weather />
                  </Route>
              </Switch>
          </Router>

      </header>
    </div>
  );
}

export default App;
