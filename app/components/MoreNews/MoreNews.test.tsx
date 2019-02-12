import React from 'react';
import { shallow } from 'enzyme';
import { MoreNewsTest as MoreNews } from './MoreNews';
import ArticlesLoader from '../ContentLoaders/ArticlesLoader';

describe('<ArticleGroup />', () => {
  const DEFAULT_PROPS = {
    title: 'My Title',
    icon: 'My Icon',
    link: 'link'
  };

  const getComponent = (props = {}) => {
    const mergedProps: any = {
      ...DEFAULT_PROPS,
      ...props
    };

    return shallow(<MoreNews {...mergedProps} />);
  };

  describe('render()', () => {
    it('should render error message if props.data.error is defined', () => {
      const wrapper = getComponent({
        data: {
          error: true
        }
      });
      expect(wrapper.exists('[data-article-error="true"]')).toBe(true);
    });

    it('should render loading state if props.data.loading=true', () => {
      const wrapper = getComponent({
        data: {
          loading: true
        }
      });
      expect(wrapper.find(ArticlesLoader).length > 0).toBe(true);
    });

    it('should not render content if props.data.loading=true', () => {
      const wrapper = getComponent({
        data: {
          loading: true
        }
      });
      expect(wrapper.exists('[data-articles="true"]')).toBe(false);
    });

    it('should not render content if props.data.error is defined', () => {
      const wrapper = getComponent({
        data: {
          error: true
        }
      });
      expect(wrapper.exists('[data-articles="true"]')).toBe(false);
    });

    // it('should render an ArticleCard for each article in data.articles', () => {
    //   const wrapper = getComponent({
    //     data: {
    //       articles: [{ assetId: 1 }, { assetId: 2 }, { assetId: 3 }]
    //     }
    //   });

    //   expect(wrapper.find(ArticleCard).length).toBe(3);
    // });
  });
});
