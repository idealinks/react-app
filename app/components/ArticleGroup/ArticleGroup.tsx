import './ArticleGroup.css';
import React, { FunctionComponent } from 'react';
import { ChildProps } from 'react-apollo';
import TitleBar from '../../components/TitleBar/TitleBar';
import ArticleCard from '../ArticleCard/ArticleCard';
import { Articles, ArticlesVariables } from 'types/Articles';
import { ArticlesInputProps } from '../../containers/withArticles';
import AppLink from '../../components/AppLink/AppLink';
import ArticlesLoader from '../../components/ContentLoaders/ArticlesLoader';

const ArticleGroup: FunctionComponent<
  ChildProps<ArticlesInputProps, Articles, ArticlesVariables>
> = ({ data, title, icon, link }) => {
  const isContentReady = !data.error && !data.loading;
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
        <div styleName="articles" data-articles="true">
          {data.articles.map(article => (
            <ArticleCard
              key={article.assetId}
              styleName="article"
              article={article}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ArticleGroup;

// used for unit tests
export const ArticleGroupTest = ArticleGroup;
