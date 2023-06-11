
import WeatherApp from './components/WeatherApp';
import './App.css';

function App() {
  return (
    <div className="App">
      {process.env.REACT_APP_WEATHER_APP}
      <WeatherApp />
    </div>
  );
}

export default App;
