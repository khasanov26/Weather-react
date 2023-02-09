import { Component } from 'react';

import CurrentWeatherList from '../components/currentWeatherList/CurrentWeatherList';
import AddCity from '../components/addCity/AddCity';

class HomeWeather extends Component {
  render() {
    return (
      <div>
        <p
          style={{
            fontWeight: '700',
            fontSize: '30px',
            lineHeight: '38px',
            color: '#FFFFFF',
            paddingTop: '30px',
          }}>
          Weather
        </p>
        <AddCity targetCity={this.props.targetCity} />
        <CurrentWeatherList
          city={this.props.city}
          onDetailsTargetCity={this.props.onDetailsTargetCity}
          cities={this.props.cities}
          onDelete={this.props.onDelete}
        />
      </div>
    );
  }
}

export default HomeWeather;
