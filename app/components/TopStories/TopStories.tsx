import './TopStories.css';
import React, { FunctionComponent } from 'react';
import { ChildProps } from 'react-apollo';
import TitleBar from '../../components/TitleBar/TitleBar';
import ArticleCard from '../ArticleCard/ArticleCard';
import { Articles, ArticlesVariables } from '../../../types/Articles';
import { ArticlesInputProps } from '../../containers/withArticles';
import AppLink from '../../components/AppLink/AppLink';
import TopStoriesLoader from '../ContentLoaders/TopStoriesLoader';

const TopStories: FunctionComponent<
  ChildProps<ArticlesInputProps, Articles, ArticlesVariables>
> = ({ data, title, icon, link }) => {
  const isContentReady = !data.error && !data.loading;
  return (
    <div styleName="container">
      <TitleBar>
        {icon}
        {title}
      </TitleBar>

      {data.loading && <TopStoriesLoader count={4} />}
      {data.error && (
        <div className="spacing-pad-all">Error loading content....</div>
      )}

      {isContentReady && (
        <React.Fragment>
          <div styleName="articles">
            {data.articles.map(article => (
              <ArticleCard
                key={article.assetId}
                article={article}
                styleName="article"
              />
            ))}
          </div>

          {link && (
            <footer styleName="footer">
              <AppLink href={link.url}>
                <a title={link.label} styleName="news-link">
                  {link.label}
                </a>
              </AppLink>
            </footer>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default TopStories;
