import React from 'react';
import GoogleAdsContext from '../contexts/GoogleAdsContext';

export const withGoogleAdsContext = Component => props => {
  return (
    <GoogleAdsContext.Consumer>
      {context => <Component {...props} adsContext={context} />}
    </GoogleAdsContext.Consumer>
  );
};
