import './MoreNews.css';
import React, { FunctionComponent } from 'react';
import { ChildProps } from 'react-apollo';
import TitleBar from '../../components/TitleBar/TitleBar';
import ArticleCard from '../ArticleCard/ArticleCard';
import { Articles, ArticlesVariables } from 'types/Articles';
import { ArticlesInputProps } from '../../containers/withArticles';
import AppLink from '../../components/AppLink/AppLink';
import ArticlesLoader from '../../components/ContentLoaders/ArticlesLoader';

const MoreNews: FunctionComponent<
  ChildProps<ArticlesInputProps, Articles, ArticlesVariables>
> = ({ data, title, icon, link }) => {
  const isContentReady = !data.error && !data.loading;
  const articles = data.articles || [];
  const articlesGroupOne = articles.slice(0, 2);
  const articlesGroupTwo = articles.slice(2);
  const MoreLink = (
    <AppLink href={link.url}>
      <a title={link.label} styleName="news-link">
        {link.label}
      </a>
    </AppLink>
  );
  return (
    <div styleName="container">
      <TitleBar link={MoreLink}>
        {icon}
        {title}
      </TitleBar>

      {data.loading && <ArticlesLoader count={4} />}
      {data.error && (
        <div className="spacing-pad-all" data-article-error="true">
          Error loading content....
        </div>
      )}

      {isContentReady && (
        <React.Fragment>
          <div styleName="articles">
            <div styleName="articles__one">
              {articlesGroupOne.map(article => (
                <ArticleCard
                  key={article.assetId}
                  article={article}
                  styleName="article"
                  showDescription={true}
                />
              ))}
            </div>

            <div styleName="articles__two">
              {articlesGroupTwo.map(article => (
                <ArticleCard
                  key={article.assetId}
                  article={article}
                  styleName="article"
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MoreNews;

// used for unit tests
export const MoreNewsTest = MoreNews;
