/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Weather
// ====================================================

export interface Weather_weather_obs {
  __typename: "WeatherNow";
  temperature: string | null;
  icon_ltr: string | null;
  date: string | null;
}

export interface Weather_weather {
  __typename: "WeatherInfo";
  obs: Weather_weather_obs | null;
}

export interface Weather {
  weather: Weather_weather | null;
}

export interface WeatherVariables {
  location: string;
}
