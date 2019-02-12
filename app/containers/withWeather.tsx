import { graphql } from 'react-apollo';
import getConfig from 'next/config';
import { GET_WEATHER } from '../../graphql/queries';
import { Weather, WeatherVariables } from 'types/Weather';

const { publicRuntimeConfig } = getConfig();

export default graphql<{}, Weather, WeatherVariables>(GET_WEATHER, {
  options: () => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      location: publicRuntimeConfig.majorLocationAlias
    }
  })
});
