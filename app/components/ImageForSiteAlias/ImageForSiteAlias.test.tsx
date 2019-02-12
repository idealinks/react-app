import React from 'react';
import { shallow } from 'enzyme';
import ImageForSiteAlias from './ImageForSiteAlias';

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      siteAlias: 'yorkregion'
    }
  });
});

describe('<ImageForSiteAlias />', () => {
  it('should add image src path based on current site alias and fileName prop', () => {
    const wrapper = shallow(<ImageForSiteAlias fileName="test.jpg" />);
    expect(wrapper.props().src).toBe('/static/yorkregion/images/test.jpg');
  });

  it('should pass additional image props to image element', () => {
    const wrapper = shallow(
      <ImageForSiteAlias fileName="test.jpg" alt="Alt Text" width="100" />
    );
    expect(wrapper.props().alt).toBe('Alt Text');
    expect(wrapper.props().width).toBe('100');
  });
});
