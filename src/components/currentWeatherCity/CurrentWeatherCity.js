import { Component } from 'react';

import styled from 'styled-components';

// import Location from '../location/Location';

import { Link } from 'react-router-dom';

import deleteWallpaper from '../../resources/img/delete-wallpaper.svg';

import './currentWeatherCity.scss';

const ItemWeatherCity = styled.div`
  background-color: red;
  max-width: 100%;
  height: 84px;
  background: #928787;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  position: relative;

  .name {
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }

  .temp {
    font-size: 36px;
    line-height: 42px;

    color: #ffffff;
  }
  .description {
    color: rgba(255, 255, 255);
  }
  .temp-max {
    color: #ffffff;
  }
  .temp-min {
    color: #ffffff;
  }
  .time {
    color: rgba(255, 255, 255);
  }
  .weather-city {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .name-time-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .all-temp {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

class CurrentWeatherCity extends Component {
  constructor(props) {
    super(props);
  }

  currentTimeCity = (timezone) => {
    let timeZoneCity = `${timezone}000`;
    let currentTime = new Date();
    currentTime.getTimezoneOffset();
    let currentTimeOffsetGMT = currentTime.getTime();
    let TimeZone = currentTimeOffsetGMT + Number(timeZoneCity);
    let date = new Date(TimeZone);
    return date;
  };

  render() {
    const {
      name,
      main: { temp, temp_max, temp_min },
      timezone,
      weather,
      onDelete,
      onDetailsTargetCity,
      coord: { lat, lon },
      main,
      visibility,
      wind,
      clouds,
      rain,
      snow,
      sys,
    } = this.props;

    let imageWeather;

    if (
      weather[0].icon == '01d' ||
      weather[0].icon == '01n' ||
      weather[0].icon == '02d' ||
      weather[0].icon == '02n'
    ) {
      console.log('чистое небо');
      imageWeather = {
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat',
        backgroundPositionY: '2.8%',

        backgroundImage: 'url("https://media.tenor.com/I2IlNB_IRFEAAAAC/peanuts-snoopy.gif")',
      };
    } else if (
      weather[0].icon == '03d' ||
      weather[0].icon == '03n' ||
      weather[0].icon == '04d' ||
      weather[0].icon == '04n'
    ) {
      console.log('облака');
      imageWeather = {
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat',
        backgroundPositionY: '48%',
        backgroundImage: 'url("https://media.tenor.com/lLUjSh5G2H4AAAAC/snoopy-peanuts.gif")',
      };
    } else if (
      weather[0].icon == '09d' ||
      weather[0].icon == '09n' ||
      weather[0].icon == '10d' ||
      weather[0].icon == '10n' ||
      weather[0].icon == '11d' ||
      weather[0].icon == '11n'
    ) {
      console.log('дождь');
      imageWeather = {
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat',
        backgroundPositionY: '12%',
        backgroundImage: 'url("https://media.tenor.com/QI3AoasIIPUAAAAC/snoopy-peanuts.gif")',
      };
    } else if (weather[0].icon == '13d' || weather[0].icon == '13n') {
      console.log('снег');
      imageWeather = {
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat',
        backgroundPositionY: '12%',
        backgroundImage: 'url("https://media.tenor.com/6F3YdZ5NFg4AAAAC/snoopy-snow.gif")',
      };
    } else if (weather[0].icon == '50d' || weather[0].icon == '50n') {
      console.log('туман');
      imageWeather = {
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat',
        backgroundPositionY: '40%',
        backgroundImage: 'url("https://media.tenor.com/DxNfVfeScyYAAAAC/snoopy-dog.gif")',
      };
    }

    return (
      <ItemWeatherCity style={imageWeather}>
        <Link to="/Weather-Details">
          <div
            className="weather-city"
            onClick={() =>
              this.props.onDetailsTargetCity(
                name,
                lat,
                lon,
                weather,
                temp,
                timezone,
                weather[0].icon,
                main,
                visibility,
                wind,
                clouds,
                rain,
                snow,
                sys,
                imageWeather,
              )
            }>
            <div className="name-time-description">
              <div className="name-time">
                <div className="name">{name}</div>
                <div className="time">
                  <span>{this.currentTimeCity(timezone).getUTCHours()}:</span>
                  <span>{this.currentTimeCity(timezone).getUTCMinutes()}</span>
                </div>
              </div>
              <div className="description">{weather[0].description}</div>
            </div>
            <div className="all-temp">
              <div className="temp">{Math.round(temp)}</div>
              <div>
                <span className="temp-max">Max.: {Math.round(temp_max)}°, </span>
                <span className="temp-min">min.: {Math.round(temp_min)}°</span>
              </div>
            </div>
          </div>
          <div></div>
        </Link>
        <img className="delete" src={deleteWallpaper} alt="delete icon" onClick={onDelete} />
      </ItemWeatherCity>
    );
  }
}

export default CurrentWeatherCity;
