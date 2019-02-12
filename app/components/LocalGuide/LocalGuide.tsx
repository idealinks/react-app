import React, { FunctionComponent } from 'react';
import './LocalGuide.css';

const WIDGET_URL = 'https://widget.secure.ownlocal.com/embed';

const buildUrl = (widgetUrl, publisherId, adcentric, featuredLevel) =>
  `${widgetUrl}/${publisherId}?adcentric=${adcentric
    .toString()
    .toLowerCase()}&min_featured_level=${featuredLevel}`;

type Props = {
  publisherId: string;
  featuredLevel?: number;
  adcentric?: boolean;
};

const LocalGuide: FunctionComponent<Props> = props => {
  const url = buildUrl(
    WIDGET_URL,
    props.publisherId,
    props.adcentric || false,
    props.featuredLevel || 0
  );

  return (
    <div styleName="container">
      <iframe styleName="iframe" src={url} />
    </div>
  );
};

export default LocalGuide;
