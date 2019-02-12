import React, { FunctionComponent } from 'react';
import ArticleCardLoader from './ArticleCardLoader';

const TopStoriesLoader: FunctionComponent<{ count: number }> = props => {
  const getBlocks = () => {
    const blocks = [];

    for (let index = 0; index < props.count; index++) {
      blocks.push(
        <div key={index} className="spacing-margin-bottom">
          <ArticleCardLoader />
        </div>
      );
    }

    return blocks;
  };
  return <div className="spacing-pad-all">{getBlocks()}</div>;
};

export default TopStoriesLoader;
