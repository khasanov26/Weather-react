import { Component } from 'react';

import WeatherService from '../../services/WeatherService';

import Spinner from '../spinner/Spinner';

import './location.scss';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
    };
  }

  weatherService = new WeatherService();

  changeHour = (hour) => {
    if (hour <= 9) {
      return `0${hour}`;
    } else {
      return `${hour}`;
    }
  };

  getWeekDay = (date) => {
    let weekDay = new Date(date).getDay();
    let days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return days[weekDay];
  };

  weekWeather = (listWeather) => {
    let week = [[], [], [], [], []];

    let sliceStart = 0;

    for (let j = 1; j < 6; j++) {
      let list = listWeather;
      let sliceEnd = 8 * j;
      list = list.slice(sliceStart, sliceEnd);
      sliceStart = sliceEnd;
      let tempMax = [];
      const maxTemp = () => {
        for (let i = 0; i < list.length; i++) {
          tempMax.push(list[i].main.temp_max);
        }
        tempMax = Math.max(...tempMax);
        week[j - 1].push(Math.round(tempMax));
      };
      maxTemp();

      let tempMin = [];
      const minTemp = () => {
        for (let i = 0; i < list.length; i++) {
          tempMin.push(list[i].main.temp_min);
          if (i == 5) {
            week[j - 1].push(list[i].weather[0].icon);
          }
          if (i == 0) {
            week[j - 1].push(list[i].dt_txt);
          }
        }
        tempMin = Math.min(...tempMin);
        week[j - 1].push(Math.round(tempMin));
      };
      minTemp();
    }
    return week;
  };

  sunSet = (time) => {
    let sunTime = `${time}000`;

    sunTime = new Date(+sunTime);
    return sunTime;
  };

  render() {
    const View = () => {
      console.log(this.props);
      const {
        city: { name },
        list,
      } = this.props.detailsCity;

      const { toDetails } = this.props;
      console.log(this.props.toDetails);

      const hourWeather = list.slice(1, 10).map((item, i) => {
        let hour = new Date(item.dt_txt);
        hour = hour.getHours();
        return (
          <div key={i} className="week-weather-item">
            <span>{this.changeHour(hour)}</span>
            <span>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                className="week-weather-img"
              />
            </span>
            <span>{Math.round(item.main.temp)}</span>
          </div>
        );
      });

      let fiveDays = this.weekWeather(list);
      fiveDays = fiveDays.map((item, i) => {
        let day = this.getWeekDay(item[1]);
        return (
          <div>
            <div key={i} className="five-days-weather-item">
              <div className="five-days-weather-day">{day}</div>
              <div>
                <img src={`http://openweathermap.org/img/wn/${item[2]}@2x.png`} />
              </div>
              <div>max.: {item[0]}°</div>
              <div>min.: {item[3]}°</div>
            </div>
            <hr />
          </div>
        );
      });

      return (
        <div className="city">
          <div className="city-name">{toDetails[0]}</div>
          <div className="city-temp">{Math.round(toDetails[1])}</div>
          <div className="city-description">
            {toDetails[2][0].description[0].toUpperCase() + toDetails[2][0].description.slice(1)}
          </div>
          <div className="city-tempMaxMin">
            Max.:{Math.round(toDetails[5].temp_max)}°, min.: {Math.round(toDetails[5].temp_min)}°
          </div>
          <div className="week-weather">
            <div className="week-weather-head">forecast for every 3 hours</div>
            <hr />
            <div className="week-weather-list">
              <div className="week-weather-item">
                <span>Now</span>
                <span>
                  <img
                    src={`http://openweathermap.org/img/wn/${toDetails[4]}@2x.png`}
                    className="week-weather-img"
                  />
                </span>
                <span>{Math.round(toDetails[1])}</span>
              </div>
              {hourWeather}
            </div>
          </div>
          <div className="five-days-weather">
            <div className="five-days-weather-head">forecast for 5 days</div>
            <hr />
            <div className="five-days-weather-list">{fiveDays}</div>
          </div>

          <div className="weather-details">
            <div className="weather-details-item item">
              <div className="item-head">feels like</div>
              <div className="item-desc ">{Math.round(toDetails[5].feels_like)}°</div>
              <div className="item-head">visibility</div>
              <div className="item-desc ">{Math.round(toDetails[6] / 1000)} km</div>
            </div>
            <div className="weather-details-item item">
              <div className="item-head">pressure</div>
              <div className="item-desc ">{Math.round(toDetails[5].pressure / 1.333)} mm Hg</div>
            </div>
            <div className="weather-details-item item">
              <div className="item-head">humidity</div>
              <div className="item-desc ">{toDetails[5].humidity} %</div>
              <div className="item-head">clouds</div>
              <div className="item-desc ">{toDetails[8].all} %</div>
            </div>
            <div className="weather-details-item item">
              <div className="item-head">wind</div>
              <div className="item-wind">
                <div>speed {toDetails[7].speed} meter/sec</div>
                <div>direction {toDetails[7].deg} degrees</div>
                <div>gust {toDetails[7].gust} meter/sec</div>
              </div>
            </div>
            <div className="weather-details-item item">
              <div className="item-head">Осадки</div>
              <div>
                <div className="item-head-rain">Rain</div>
                <div className="item-rain">
                  {toDetails[9]
                    ? toDetails[9]
                      ? ` Rain volume ${toDetails[9]['1h']} mm for last 1 hours`
                      : ` Rain volume ${toDetails[9]['3h']} mm for last 3 hours`
                    : `Rain volume 0 mm for last 3 hours`}
                </div>
              </div>
              <div>
                <div className="item-head-snow">Snow</div>
                <div className="item-snow">
                  {toDetails[10]
                    ? toDetails[10]
                      ? `Snow volume ${toDetails[10]['1h']} mm for last 1 hours`
                      : `Snow volume ${toDetails[10]['3h']} mm for last 3 hours`
                    : `Snow volume 0 mm for last 3 hours`}
                </div>
              </div>
            </div>
            <div className="weather-details-item item">
              <div>
                <div className="item-head">Sunrise</div>
                <div className="item-sunrice">
                  {this.sunSet(toDetails[11].sunrise).getHours()}:
                  {this.sunSet(toDetails[11].sunrise).getMinutes()}
                </div>
              </div>
              <div>
                <div className="item-head">Sunset</div>

                <div className="item-sunset">
                  {this.sunSet(toDetails[11].sunset).getHours()}:
                  {this.sunSet(toDetails[11].sunset).getMinutes()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const { loading } = this.props;
    return <div>{loading ? <Spinner /> : <View />}</div>;
  }
}

export default Location;
