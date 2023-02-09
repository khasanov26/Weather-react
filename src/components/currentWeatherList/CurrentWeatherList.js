import { Component } from 'react';

import WeatherService from '../../services/WeatherService';

import CurrentWeatherCity from '../currentWeatherCity/CurrentWeatherCity';

import './currentWeatherList.scss';

class CurrentWeatherList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    };
    this.id = 0;
  }

  weatherService = new WeatherService();

  render() {
    const { cities, onDelete } = this.props;

    const allCiteies = cities.map((item) => {
      this.id++;
      return (
        <CurrentWeatherCity
          key={item.id + this.id}
          {...item}
          onDelete={() => onDelete(item.id)}
          onDetailsTargetCity={this.props.onDetailsTargetCity}
        />
      );
    });
    return <div className="all-cities">{allCiteies}</div>;
  }
}

export default CurrentWeatherList;
