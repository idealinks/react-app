import React, { FunctionComponent } from 'react';
import ContentLoader, { ContentLoaderProps } from 'react-content-loader';

type Props = {
  hideDivider?: boolean;
};

const ArticleCardLoader: FunctionComponent<
  ContentLoaderProps & Props
> = props => {
  const { hideDivider, ...rest } = props;
  return (
    <React.Fragment>
      <div className="bp-medium-up-show">
        <ContentLoader height={372} {...rest}>
          <rect x="0" y="0" width="100%" height="200" />
          <rect x="0" y="220" width="50%" height="20" />
          <rect x="0" y="250" width="100%" height="20" />

          <rect x="0" y="290" width="100%" height="8" />
          <rect x="0" y="310" width="100%" height="8" />
          <rect x="0" y="330" width="100%" height="8" />

          {!hideDivider && <rect x="0" y="370" width="100%" height="2" />}
        </ContentLoader>
      </div>

      <div className="bp-small-show">
        <ContentLoader height={102} {...rest}>
          <rect x="0" y="0" width="80" height="80" />
          <rect x="100" y="0" width="40%" height="20" />

          <rect x="100" y="30" width="70%" height="8" />
          <rect x="100" y="50" width="70%" height="8" />
          <rect x="100" y="70" width="70%" height="8" />

          <rect x="0" y="100" width="100%" height="2" />
        </ContentLoader>
      </div>
    </React.Fragment>
  );
};

export default ArticleCardLoader;
