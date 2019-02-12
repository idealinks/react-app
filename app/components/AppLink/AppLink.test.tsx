import React from 'react';
import { shallow } from 'enzyme';
import AppLink from './AppLink';

describe('<AppLink />', () => {
  it('should return Link with href unchanged when no route match found', () => {
    const wrapper = shallow(
      <AppLink href="/nomatch">
        <a>Test</a>
      </AppLink>
    );
    expect(wrapper.props().href).toBe('/nomatch');
  });

  it('should return as prop equal to path when route match found', () => {
    const wrapper = shallow(
      <AppLink href="/news-static/1491353-york-region-about-us/">
        <a>Test</a>
      </AppLink>
    );
    expect(wrapper.props().as).toBe(
      '/news-static/1491353-york-region-about-us/'
    );
  });

  it('should return formatted href for static-page route', () => {
    const wrapper = shallow(
      <AppLink href="/news-static/1491353-york-region-about-us/">
        <a>Test</a>
      </AppLink>
    );
    expect(wrapper.props().href).toEqual('/static-page?id=1491353');
  });

  it('should return formatted href for subcategory-news-landing-page route', () => {
    const wrapper = shallow(
      <AppLink href="/yorkregion-news/business/">
        <a>Test</a>
      </AppLink>
    );
    expect(wrapper.props().href).toEqual(
      '/subcategory-news-landing-page?id=business'
    );
  });
});
