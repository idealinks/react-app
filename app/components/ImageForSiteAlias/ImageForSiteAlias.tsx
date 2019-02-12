import React, { FunctionComponent } from 'react';
import getConfig from 'next/config';

type Props = React.HTMLProps<HTMLImageElement> & {
  fileName: string;
};

const { publicRuntimeConfig } = getConfig();

const ImageForSiteAlias: FunctionComponent<Props> = props => {
  const { src, fileName, crossOrigin = null, ...rest } = props;
  const siteAlias = publicRuntimeConfig.siteAlias.toLowerCase();
  const path = `/static/${siteAlias}/images/${fileName}`;
  return <img src={path} {...rest} />;
};

export default ImageForSiteAlias;
