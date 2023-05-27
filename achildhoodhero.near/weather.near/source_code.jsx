const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
  max-width: 600px;
  margin: 0 auto;
`;

const Search = styled.div``;

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  font-size: 16px;
`;

const WeatherItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const WeatherLabel = styled.span`
  font-weight: bold;
`;

const WeatherData = styled.span``;

const WeatherIcon = styled.img`
  width: 32px;
  height: 32px;
`;

// -------------------
// --- STYLES ABOVE --
// -------------------

const API_URL = "https://api.api-ninjas.com/v1/weather?city=";
const API_KEY = "XnddRn6A0TXUDpq76POxuQ==9aJ5FrpbwPMD8fCH";

const formatTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.substr(-2);
};

const getWeatherIcon = (cloudPct) => {
  if (cloudPct < 15) {
    return "https://static-00.iconduck.com/assets.00/sun-symbol-emoji-512x512-qjm8vnpc.png";
  } else {
    return "https://cdn-icons-png.flaticon.com/512/3222/3222791.png";
  }
};

const writeStateTerm = (term) => {
  console.log(`Entering writeStateTerm, term: ${term}`); // eslint-disable-line no-console
  State.update({
    term: term,
  });

  if (term === "") {
    State.update({
      term: undefined,
      weather: undefined,
    });
  }
};

const fetchCityWeather = (cityNameString) => {
  console.log(`Entering fetchCityWeather, cityNameString: ${cityNameString}`); // eslint-disable-line no-console
  const thisURL = API_URL + cityNameString;
  const params = {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
  };
  return asyncFetch(thisURL, params);
};

const formatCityWeatherResponse = (res) => {
  console.log(
    `Entering formatCityWeatherResponse, res: ${JSON.stringify(res)}`
  ); // eslint-disable-line no-console
  return res;
};

const debounce = (callable, timeout) => {
  return (args) => {
    clearTimeout(state.timer);
    State.update({
      timer: setTimeout(() => callable(args), timeout ?? 750),
    });
  };
};

const updateCity = debounce((term) => {
  console.log(`Entering updateCity, term: ${term}`); // eslint-disable-line no-console
  writeStateTerm(term);
  const currentStateTerm = state.term;
  console.log(`updateCity, currentStateTerm: ${currentStateTerm}`); // eslint-disable-line no-console
  const currentStateWeather = JSON.stringify(state.weather);
  console.log(`updateCity, currentStateWeather: ${currentStateWeather}`); // eslint-disable-line no-console
  fetchCityWeather(term).then((response) => {
    console.log(
      `Passed fetchCityWeather, response: ${JSON.stringify(response)}`
    ); // eslint-disable-line no-console
    const res = formatCityWeatherResponse(response);
    console.log(
      `Passed formatCityWeatherResponse, res: ${JSON.stringify(res)}`
    ); // eslint-disable-line no-console
    State.update({ weather: res });
  });
});

const onSearchChange = ({ term }) => {
  updateCity(term);
};

const showSearchBar = props.showSearchBar ?? true;

return (
  <Wrapper>
    {showSearchBar && (
      <Search>
        <Widget
          src="chaotictempest.near/widget/SearchPill"
          props={{
            onChange: onSearchChange,
            placeholder: "Type in a city name",
          }}
        />
      </Search>
    )}
    {state.weather && (
      <WeatherInfo>
        <WeatherItem>
          <WeatherLabel>Cloud Percentage:</WeatherLabel>
          <WeatherData>{state.weather.body.cloud_pct}%</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Temperature:</WeatherLabel>
          <WeatherData>
            {state.weather.body.temp}°C{" "}
            <WeatherIcon
              src={getWeatherIcon(state.weather.body.cloud_pct)}
              alt="Weather Icon"
            />
          </WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Feels Like:</WeatherLabel>
          <WeatherData>{state.weather.body.feels_like}°C</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Humidity:</WeatherLabel>
          <WeatherData>{state.weather.body.humidity}%</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Min Temperature:</WeatherLabel>
          <WeatherData>{state.weather.body.min_temp}°C</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Max Temperature:</WeatherLabel>
          <WeatherData>{state.weather.body.max_temp}°C</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Wind Speed:</WeatherLabel>
          <WeatherData>{state.weather.body.wind_speed}m/s</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Wind Direction:</WeatherLabel>
          <WeatherData>{state.weather.body.wind_degrees}°</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Sunrise:</WeatherLabel>
          <WeatherData>{formatTime(state.weather.body.sunrise)}</WeatherData>
        </WeatherItem>
        <WeatherItem>
          <WeatherLabel>Sunset:</WeatherLabel>
          <WeatherData>{formatTime(state.weather.body.sunset)}</WeatherData>
        </WeatherItem>
      </WeatherInfo>
    )}
  </Wrapper>
);
