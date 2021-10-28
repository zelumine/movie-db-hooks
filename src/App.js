import './styles/App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Views/Home';
import MovieDetails from './Views/MovieDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movie/:id" render={(historyProps) => {
          return <MovieDetails {...historyProps} />;
        }} />
      </Switch>
    </div>
  );
}

export default App;
