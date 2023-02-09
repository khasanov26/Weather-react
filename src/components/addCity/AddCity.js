import { Component } from 'react';

import WeatherService from '../../services/WeatherService';

import SearchCity from '../searchCity/SearchCity';

import './addCity.scss';

import searchIcon from '../../resources/img/search-icon.svg';
import closeIcon from '../../resources/img/close-icon.svg';
class AddCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      searchCities: [],
      addCity: null,
      closeIcon: false,
    };
  }

  weatherService = new WeatherService();

  search = async (e) => {
    console.log('поиск');
    console.log(e.target.value);
    if (!e.target.value) {
      this.onSelect();
      this.setState({
        closeIcon: false,
      });
    } else if (e.target.value) {
      this.setState((state) => ({
        cityName: (state.cityName = e.target.value),
        closeIcon: true,
      }));

      let searchCity;
      await this.weatherService.search(e.target.value).then((res) => {
        console.log(res);
        searchCity = res;
        console.log(res);
      });

      this.setState({
        searchCities: searchCity,
      });
    }
  };

  onSelect = () => {
    this.setState((state) => ({
      searchCities: (state.searchCities = []),
      cityName: (state.cityName = ''),
    }));
    this.setState({
      closeIcon: false,
    });
  };

  render() {
    const { searchCities } = this.state;

    const allSearchCiteies = searchCities.map((item, index) => {
      return (
        <SearchCity
          {...item}
          id={index}
          key={index}
          targetCity={this.props.targetCity}
          onSelect={this.onSelect}
        />
      );
    });

    console.log(this.state.closeIcon);

    return (
      <div>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            onChange={this.search}
            value={this.state.cityName}
            onClick={() => console.log('delete')}
            className="addCity-input"
          />
          <img src={searchIcon} alt="search icon" className="search-icon" />

          {this.state.closeIcon ? (
            <img
              src={closeIcon}
              alt="search icon"
              className="close-icon"
              onClick={this.onSelect}
              style={{ cursor: 'pointer' }}
            />
          ) : null}
        </div>

        <div
          style={{
            background: 'rgba(30, 30, 30, 0.98)',
            position: 'absolute',
            zIndex: 1,
            width: '290px',
            paddingLeft: '22px',
            top: '98px',
            borderRadius: '0px 0px 7px 7px',
          }}>
          {allSearchCiteies}
        </div>
      </div>
    );
  }
}

export default AddCity;