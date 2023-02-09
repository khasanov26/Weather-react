import { Component } from 'react';

import styled from 'styled-components';

import './searchCity.scss';

const ItemSearchCity = styled.div`
  width: 100%;
  height: 30px;
  color: #fff;
  color: #9e9da2;
  font-size: 12px;
  line-height: 30px;
`;

class SearchCity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      state,
      id,
      targetCity,
      coord: { lat, lon },
      onSelect,
      sys,
    } = this.props;
    console.log(lat);
    return (
      <ItemSearchCity
        onClick={() => {
          targetCity(name, lat, lon);
          onSelect();
        }}>
        <div style={{ cursor: 'pointer', lineHeight: '24px' }}>
          {name} ({sys.country ? sys.country : 'нет данных'})
        </div>
      </ItemSearchCity>
    );
  }
}

export default SearchCity;
