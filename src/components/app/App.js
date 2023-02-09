import { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WeatherService from '../../services/WeatherService';

import './app.scss';

import HomeWeather from '../../pages/HomeWeather';
import WeatherDetails from '../../pages/WeatherDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: { cityName: null, lat: null, cityName: null },
      cities: null,
      name: null,
      cities: [],
      detailsCity: null,
      loading: true,
      toDetails: null,
    };
    this.id = 0;
  }

  weatherService = new WeatherService();

  async componentDidMount() {
    let newCity;

    await this.weatherService.getGeoCurrentWeather('Kazan').then((res) => {
      newCity = res;
    });
    this.setState(({ cities }) => {
      const newCities = [...cities, newCity];
      return {
        cities: newCities,
      };
    });

    await this.weatherService.getGeoCurrentWeather('Luxembourg').then((res) => {
      newCity = res;
    });
    this.setState(({ cities }) => {
      const newCities = [...cities, newCity];
      return {
        cities: newCities,
      };
    });

    await this.weatherService.getGeoCurrentWeather('New York').then((res) => {
      newCity = res;
    });
    this.setState(({ cities }) => {
      const newCities = [...cities, newCity];
      return {
        cities: newCities,
      };
    });

    await this.weatherService.getGeoCurrentWeather('London').then((res) => {
      newCity = res;
    });
    this.setState(({ cities }) => {
      const newCities = [...cities, newCity];
      return {
        cities: newCities,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.city.cityName);
    console.log('update');
    if (this.state.city.cityName !== prevState.city.cityName) {
      this.updateCity(this.state.city.lat, this.state.city.lon);
      console.log('добавление воторой раз');
    }
  }

  updateCity = async (lat, lon) => {
    console.log(this.state.cities);
    console.log('выбрал город');
    let newCity;
    await this.weatherService.getCurrentWeather(lat, lon).then((res) => {
      newCity = res;
    });
    console.log(newCity);
    this.setState(({ cities }) => {
      const newCities = [...cities, newCity];
      console.log(newCities);

      const uniqueCities = newCities.reduce((o, i) => {
        if (!o.find((v) => v.name == i.name)) {
          o.push(i);
        }
        return o;
      }, []);

      console.log(uniqueCities);
      return {
        cities: uniqueCities,
      };
    });
  };

  onDelete = (id) => {
    console.log(id);
    console.log('delete');
    this.setState(({ cities, city }) => {
      return {
        cities: cities.filter((item) => {
          return item.id !== id;
        }),
        city: { cityName: null, lat: null, cityName: null },
      };
    });
  };

  targetCity = (name, lat, lon) => {
    this.setState({
      city: { cityName: name, lat: lat, lon: lon },
    });
  };

  onDetailsTargetCity = async (
    name,
    lat,
    lon,
    weather,
    temp,
    timezone,
    weatherIcon,
    main,
    visibility,
    wind,
    clouds,
    rain,
    snow,
    sys,
    imageWeather,
  ) => {
    this.setState({
      loading: true,
    });

    if (this.state.name !== name) {
      await this.detailsCity(lat, lon);
      this.setState({
        name: name,
        loading: false,
        toDetails: [
          name,
          temp,
          weather,
          timezone,
          weatherIcon,
          main,
          visibility,
          wind,
          clouds,
          rain,
          snow,
          sys,
          imageWeather,
        ],
      });
    } else if (this.state.name == name) {
      this.setState({
        loading: false,
        toDetails: [
          name,
          temp,
          weather,
          timezone,
          weatherIcon,
          main,
          visibility,
          wind,
          clouds,
          rain,
          snow,
          sys,
          imageWeather,
        ],
      });
      return this.state.detailsCity;
    }
  };

  detailsCity = async (lat, lon) => {
    await this.weatherService.getDetailsCity(lat, lon).then((res) => {
      this.setState({
        detailsCity: res,
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <HomeWeather
                city={this.state.city}
                targetCity={this.targetCity}
                onDetailsTargetCity={this.onDetailsTargetCity}
                cities={this.state.cities}
                onDelete={this.onDelete}
              />
            }
          />
          <Route
            path="/Weather-Details"
            element={
              <WeatherDetails
                detailsCity={this.state.detailsCity}
                loading={this.state.loading}
                toDetails={this.state.toDetails}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
