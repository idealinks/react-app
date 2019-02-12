import React from 'react';
import { shallow } from 'enzyme';
import ArticleCard, {
  THUMB_SRCET_VALUES,
  DEFAULT_THUMB_SIZE
} from './ArticleCard';
import SrcsetBackgroundImage from '../../components/SrcsetBackgroundImage/SrcsetBackgroundImage';
import AppLink from '../../components/AppLink/AppLink';

const DEFAULT_ARTICLE = {
  __typename: 'Article',
  assetId: '1234',
  title: 'Artilce Title',
  description: 'Article Description',
  imageAlt: 'Article image alt text',
  category: 'Sports',
  displayPublishDate: 'Jan 22, 2019',
  navigationUrl: '/page/A',
  openNewWindow: false,
  thumbnails: {
    __typename: 'ImagesBySize',
    small: '/small/image.png',
    large: '/large/image.png'
  }
};

describe('<ArticleCard />', () => {
  const getComponent = (props = {}) => {
    const mergedProps: any = {
      article: DEFAULT_ARTICLE,
      ...props
    };

    return shallow(<ArticleCard {...mergedProps} />);
  };

  describe('getThumbSrcsetValues()', () => {
    it('should create srcSet for both large and small thumbnail images', () => {
      const wrapper: any = getComponent();
      const result = wrapper.instance().getThumbSrcsetValues();
      expect(result).toEqual(
        `${DEFAULT_ARTICLE.thumbnails.small} ${THUMB_SRCET_VALUES.small.w},${
          DEFAULT_ARTICLE.thumbnails.large
        } ${THUMB_SRCET_VALUES.large.w}`
      );
    });

    it('should create srcSet for only thumbnail sizes that exist', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: '/small/image.png',
            large: null
          }
        }
      });
      const result = wrapper.instance().getThumbSrcsetValues();
      expect(result).toEqual(
        `${DEFAULT_ARTICLE.thumbnails.small} ${THUMB_SRCET_VALUES.small.w}`
      );
    });

    it('should return undefined if all thumbnail sizes are null', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: null,
            large: null
          }
        }
      });
      const result = wrapper.instance().getThumbSrcsetValues();
      expect(result).toBeUndefined();
    });
  });

  describe('getThumbSizeValues()', () => {
    it('should create sizes for both large and small thumbnail images', () => {
      const wrapper: any = getComponent();
      const result = wrapper.instance().getThumbSizeValues();
      expect(result).toEqual(
        `${THUMB_SRCET_VALUES.small.size},${
          THUMB_SRCET_VALUES.large.size
        },${DEFAULT_THUMB_SIZE}`
      );
    });

    it('should create sizes for only thumbnails that exist', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: '/small/image.png',
            large: null
          }
        }
      });
      const result = wrapper.instance().getThumbSizeValues();
      expect(result).toEqual(
        `${THUMB_SRCET_VALUES.small.size},${DEFAULT_THUMB_SIZE}`
      );
    });

    it('should return undefined if all thumbnail sizes are null', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: null,
            large: null
          }
        }
      });
      const result = wrapper.instance().getThumbSizeValues();
      expect(result).toBeUndefined();
    });
  });

  describe('hasValidThumbnailImage()', () => {
    it('should return true if all thumbnail sizes are valid', () => {
      const wrapper: any = getComponent();
      const result = wrapper.instance().hasValidThumbnailImage();
      expect(result).toBe(true);
    });

    it('should return true if a single thumbnail size is valid', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: null,
            large: '/large/image.png'
          }
        }
      });
      const result = wrapper.instance().hasValidThumbnailImage();
      expect(result).toBe(true);
    });

    it('should return false if there are no valid thumbnail sizes', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: null,
            large: null
          }
        }
      });
      const result = wrapper.instance().hasValidThumbnailImage();
      expect(result).toBe(false);
    });
  });

  describe('getDefaultThumbnailImage()', () => {
    it('should return the largest thumbnail available', () => {
      const wrapper: any = getComponent();
      const result = wrapper.instance().getDefaultThumbnailImage();
      expect(result).toEqual(DEFAULT_ARTICLE.thumbnails.large);
    });

    it('should return undefined if there are no valid thumbnails', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: null,
            large: null
          }
        }
      });
      const result = wrapper.instance().getDefaultThumbnailImage();
      expect(result).toBeUndefined();
    });
  });

  describe('onThumbnailImageChange()', () => {
    it('should set thumbnail state when called', () => {
      const wrapper: any = getComponent();
      expect(wrapper.state().thumbnail).toBe(null);
      wrapper.instance().onThumbnailImageChange('imageA');
      expect(wrapper.state().thumbnail).toEqual('imageA');
    });
  });

  describe('render()', () => {
    it('should render thumbnail image', () => {
      const wrapper = getComponent();
      expect(wrapper.find(SrcsetBackgroundImage).length).toBe(1);
    });

    it('should render placeholder for image', () => {
      const wrapper: any = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          thumbnails: {
            ...DEFAULT_ARTICLE.thumbnails,
            small: null,
            large: null
          }
        }
      });
      expect(wrapper.exists('[data-image-placeholder="true"]')).toBe(true);
    });

    it('should render category', () => {
      const wrapper = getComponent();
      expect(wrapper.exists('[data-article-category="true"]')).toBe(true);
    });

    it('should not render category if props.article.category=null', () => {
      const wrapper = getComponent({
        article: {
          ...DEFAULT_ARTICLE,
          category: null
        }
      });
      expect(wrapper.exists('[data-article-category="true"]')).toBe(false);
    });

    it('should render published date', () => {
      const wrapper = getComponent();
      expect(wrapper.exists('[data-article-date="true"]')).toBe(true);
    });

    it('should render links with navigationUrl', () => {
      const wrapper = getComponent();
      wrapper.find(AppLink).forEach(node => {
        expect(node.props().href).toEqual(DEFAULT_ARTICLE.navigationUrl);
      });
    });

    it('should render article title', () => {
      const wrapper = getComponent();
      expect(wrapper.find('[data-article-title="true"]').text()).toEqual(
        DEFAULT_ARTICLE.title
      );
    });

    it('should render article description when props.showDescription=true', () => {
      const wrapper = getComponent({ showDescription: true });
      expect(wrapper.find('[data-article-description="true"]').text()).toEqual(
        DEFAULT_ARTICLE.description
      );
    });

    it('should not render article description when props.showDescription=false', () => {
      const wrapper = getComponent({ showDescription: false });
      expect(wrapper.exists('[data-article-description="true"]')).toBe(false);
    });
  });
});
