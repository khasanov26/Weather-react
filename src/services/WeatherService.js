class WeatherService {
  _apiBase = 'https://api.openweathermap.org/';
  _apiKey = 'appid=24fea6ceea94a2b65c3e831bb7023504';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getWeather = async (name) => {
    const res = await this.getResource(
      `${this._apiBase}geo/1.0/direct?q=${name}&limit=10&appid=24fea6ceea94a2b65c3e831bb7023504`,
    );

    const oneCity = this._transformOneCity(res);

    const { lat, lon } = oneCity;
    return this.getGeocoding(lat, lon);
  };

  getGeocoding = (lat, lon) => {
    return this.getResource(
      `${this._apiBase}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=24fea6ceea94a2b65c3e831bb7023504&units=metric`,
    );
  };

  getGeoCurrentWeather = async (name) => {
    const res = await this.getResource(
      `${this._apiBase}geo/1.0/direct?q=${name}&limit=10&appid=24fea6ceea94a2b65c3e831bb7023504`,
    );
    const currentCity = this._transformOneCity(res);
    const { lat, lon } = currentCity;
    return this.getCurrentWeather(lat, lon);
  };

  getCurrentWeather = (lat, lon) => {
    return this.getResource(
      `${this._apiBase}data/2.5/weather?lat=${lat}&lon=${lon}&appid=24fea6ceea94a2b65c3e831bb7023504&units=metric`,
    );
  };

  _transformOneCity = (res) => {
    return {
      lat: res[0].lat,
      lon: res[0].lon,
    };
  };

  getCity = (name) => {
    return this.getResource(
      `${this._apiBase}geo/1.0/direct?q=${name}&limit=10&appid=24fea6ceea94a2b65c3e831bb7023504`,
    );
  };

  search = async (name) => {
    let listSearchCities = [];

    const res = await this.getResource(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=24fea6ceea94a2b65c3e831bb7023504`,
    );
    listSearchCities.push(res);

    console.log(listSearchCities);
    return listSearchCities;
  };

  getDetailsCity = async (lat, lon) => {
    const city = await this.getResource(
      `${this._apiBase}data/2.5/forecast?lat=${lat}&lon=${lon}&${this._apiKey}&units=metric`,
    );
    return city;
  };
}

export default WeatherService;
