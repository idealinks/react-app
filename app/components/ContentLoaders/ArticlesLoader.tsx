import React, { FunctionComponent } from 'react';
import ArticleCardLoader from './ArticleCardLoader';

const ArticlesLoader: FunctionComponent<{ count: number }> = props => {
  const getBlocks = (isMobile = false) => {
    const blocks = [];
    const style = isMobile ? {} : { flex: '1', margin: '0 0.5rem' };
    for (let index = 0; index < props.count; index++) {
      blocks.push(
        <div key={index} style={style} className="spacing-margin-bottom">
          <ArticleCardLoader hideDivider={true} />
        </div>
      );
    }

    return blocks;
  };
  return (
    <React.Fragment>
      <div className="spacing-pad-all bp-small-show">{getBlocks(true)}</div>

      <div className="spacing-pad-all bp-medium-up-show">
        <div style={{ display: 'flex' }}>{getBlocks()}</div>
      </div>
    </React.Fragment>
  );
};

export default ArticlesLoader;
