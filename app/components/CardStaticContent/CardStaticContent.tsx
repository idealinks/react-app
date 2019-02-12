import './CardStaticContent.css';
import React, { FunctionComponent } from 'react';
import { ChildProps } from 'react-apollo';
import { StaticContent, StaticContentVariables } from 'types/StaticContent';
import TitleBar from '../../components/TitleBar/TitleBar';
import StaticContentLoader from '../../components/ContentLoaders/StaticContentLoader';

type InputProps = {
  id: string;
};

const CardStaticContent: FunctionComponent<
  ChildProps<InputProps, StaticContent, StaticContentVariables>
> = props => {
  const { data } = props;
  const isContentReady = !data.error && !data.loading;

  return (
    <div styleName="container">
      {data.loading && (
        <div styleName="loader">
          <StaticContentLoader />
        </div>
      )}
      {data.error && <div styleName="error">Error loading content....</div>}

      {isContentReady && (
        <React.Fragment>
          <TitleBar>{data.static.title}</TitleBar>
          <div
            styleName="body"
            dangerouslySetInnerHTML={{ __html: data.static.body }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default CardStaticContent;
