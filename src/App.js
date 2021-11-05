import './styles/App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Views/Home';
import MovieDetails from './Views/MovieDetails';
import PersonDetails from './Views/PersonDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movie/:id" render={(historyProps) => {
          return <MovieDetails {...historyProps} />;
        }} />
        <Route path="/person/:personId" render={(historyProps) => {
          return <PersonDetails {...historyProps} />;
        }} />
      </Switch>
    </div>
  );
}

export default App;
