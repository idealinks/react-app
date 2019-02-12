import './ArticleCard.css';
import React from 'react';
import AppLink from '../../components/AppLink/AppLink';
import { Articles_articles } from 'types/Articles';
import { truncateByWordCount } from '../../utils/generalUtils';
import SrcsetBackgroundImage from '../../components/SrcsetBackgroundImage/SrcsetBackgroundImage';

type Props = {
  article: Articles_articles;
  className?: string;
  styleName?: string;
  showDescription?: boolean;
};

export const THUMB_SRCET_VALUES = {
  small: { w: '100w', size: '(max-width: 43rem) 80px' },
  large: { w: '300w', size: '(max-width: 57rem) 300px' }
};

export const DEFAULT_THUMB_SIZE = '300px';

class ArticleCard extends React.Component<Props, any> {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: null
    };

    this.onThumbnailImageChange = this.onThumbnailImageChange.bind(this);
  }

  onThumbnailImageChange(image) {
    this.setState({ thumbnail: image });
  }

  /**
   * Return a valid srcSet value based on the articles thumbnail values
   * e.g. '/small/image/png 80w, /large/image.png 600w'
   */
  getThumbSrcsetValues() {
    const { article } = this.props;
    const values = Object.keys(article.thumbnails).reduce((prev, cur) => {
      if (cur === '__typename') {
        return prev;
      }

      return article.thumbnails[cur] !== null
        ? [...prev, `${article.thumbnails[cur]} ${THUMB_SRCET_VALUES[cur].w}`]
        : prev;
    }, []);
    return values.length > 0 ? values.join(',') : undefined;
  }

  /**
   * Return a valid sizes value based on the articles thumbnail values
   * e.g. '(max-width: 43rem) 80px, (max-width: 57rem) 300px, 300px'
   */
  getThumbSizeValues() {
    const { article } = this.props;
    const values = Object.keys(article.thumbnails).reduce((prev, cur) => {
      if (cur === '__typename') {
        return prev;
      }

      return article.thumbnails[cur] !== null
        ? [...prev, THUMB_SRCET_VALUES[cur].size]
        : prev;
    }, []);
    return values.length > 0
      ? [...values, DEFAULT_THUMB_SIZE].join(',')
      : undefined;
  }

  hasValidThumbnailImage() {
    const { article } = this.props;
    return Object.keys(article.thumbnails).some(
      key => article.thumbnails[key] !== null && key !== '__typename'
    );
  }

  getDefaultThumbnailImage() {
    const { article } = this.props;
    return Object.keys(article.thumbnails).reduce((prev, cur) => {
      if (cur === '__typename') {
        return prev;
      }

      return article.thumbnails[cur] || prev;
    }, undefined);
  }

  render() {
    const { article, showDescription, className } = this.props;
    const imageWrapperStyles = this.hasValidThumbnailImage()
      ? { backgroundImage: `url(${this.state.thumbnail})` }
      : {};
    return (
      <div styleName="card" className={className}>
        <div
          styleName="image-wrapper"
          data-article-image="true"
          style={imageWrapperStyles}
        >
          <AppLink href={article.navigationUrl}>
            <a>
              {this.hasValidThumbnailImage() ? (
                <SrcsetBackgroundImage
                  src={this.getDefaultThumbnailImage()}
                  srcSet={this.getThumbSrcsetValues()}
                  sizes={this.getThumbSizeValues()}
                  onImageChange={this.onThumbnailImageChange}
                  alt={article.imageAlt}
                />
              ) : (
                <span
                  styleName="image-placeholder"
                  data-image-placeholder="true"
                >
                  Image Unavailable
                </span>
              )}
            </a>
          </AppLink>
        </div>

        <div>
          {article.category && (
            <span styleName="category" data-article-category="true">
              {article.category}
            </span>
          )}
          <span styleName="date" data-article-date="true">
            {article.displayPublishDate}
          </span>
          <h3 styleName="title">
            <AppLink href={article.navigationUrl}>
              <a data-article-title="true">{article.title}</a>
            </AppLink>
          </h3>
          {showDescription && article.description && (
            <p styleName="description" data-article-description="true">
              {truncateByWordCount(article.description, 20)}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default ArticleCard;
