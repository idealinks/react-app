import './WeatherBadge.css';
import React, { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import withWeather from '../../containers/withWeather';
import { ChildProps } from 'react-apollo';
import { Weather, WeatherVariables } from 'types/Weather';
import AppLink from '../../components/AppLink/AppLink';

const WeatherBadge: FunctionComponent<
  ChildProps<{}, Weather, WeatherVariables>
> = ({ data }) => {
  const isContentReady = !data.error && !data.loading;
  return (
    <React.Fragment>
      {data.error && <span>Weather unavailable.</span>}

      {isContentReady && (
        <AppLink href="/pages/weather">
          <a styleName="link">
            <img
              styleName="icon"
              src={`/static/images/weather/${data.weather.obs.icon_ltr}.gif`}
              alt="weather icon"
            />
            <span>{data.weather.obs.temperature}°C</span>
            <span styleName="date">
              {dayjs(data.weather.obs.date).format('dddd MMM D')}
            </span>
          </a>
        </AppLink>
      )}
    </React.Fragment>
  );
};

export default withWeather(WeatherBadge);
