import React, { FunctionComponent } from 'react';
import ContentLoader, { ContentLoaderProps } from 'react-content-loader';

const StaticContentLoader: FunctionComponent<ContentLoaderProps> = props => (
  <ContentLoader height={240} {...props}>
    <rect x="0" y="0" rx="3" ry="0" width="100%" height="15" />
    <rect x="0" y="30" rx="3" ry="0" width="100%" height="5" />
    <rect x="20" y="50" rx="3" ry="0" width="90%" height="5" />
    <rect x="20" y="70" rx="3" ry="0" width="85%" height="5" />
    <rect x="0" y="90" rx="3" ry="0" width="75%" height="5" />
    <rect x="20" y="110" rx="3" ry="0" width="70%" height="5" />
    <rect x="20" y="130" rx="3" ry="0" width="60%" height="5" />

    <rect x="0" y="150" rx="3" ry="0" width="100%" height="5" />
    <rect x="20" y="170" rx="3" ry="0" width="90%" height="5" />
    <rect x="20" y="190" rx="3" ry="0" width="85%" height="5" />
    <rect x="0" y="210" rx="3" ry="0" width="75%" height="5" />
    <rect x="20" y="230" rx="3" ry="0" width="70%" height="5" />
    <rect x="20" y="250" rx="3" ry="0" width="60%" height="5" />
  </ContentLoader>
);

export default StaticContentLoader;
