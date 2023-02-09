import { Component } from 'react';

import { Link } from 'react-router-dom';

import backIcon from '../../src/resources/img/back.svg';

import Location from '../components/location/Location';

class WeatherDetails extends Component {
  render() {
    return (
      <div>
        {
          <Location
            detailsCity={this.props.detailsCity}
            loading={this.props.loading}
            toDetails={this.props.toDetails}
          />
        }
        <Link to="/" style={{ position: 'fixed', top: '5%', width: '32px', height: '30px' }}>
          <img style={{ width: '32px', height: '30px' }} src={backIcon} alt="" />
        </Link>
      </div>
    );
  }
}

export default WeatherDetails;
