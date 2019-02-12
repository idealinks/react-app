import React from 'react';
import { shallow } from 'enzyme';
import PrimaryNav from './PrimaryNav';
import PrimaryNavItem from '../PrimaryNavItem/PrimaryNavItem';

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      siteAlias: 'yorkregion'
    }
  });
});

const DEFAULT_PROPS = {
  isVisibleMobile: true,
  onCloseClick: jest.fn(),
  onSecondaryNavVisibleChange: jest.fn(),
  data: {
    loading: false,
    error: false,
    navigation: [
      { label: 'Item 1', navigationUrl: '/item/1', enabled: true },
      { label: 'Item 2', navigationUrl: '/item/2', enabled: true },
      { label: 'Item 3', navigationUrl: '/item/3', enabled: true }
    ]
  }
};

describe('<PrimaryNav />', () => {
  const getComponent = (props = {}) => {
    const mergedProps: any = {
      ...DEFAULT_PROPS,
      ...props
    };
    return shallow(<PrimaryNav {...mergedProps} />);
  };

  describe('close clicked', () => {
    it('should call this.props.onCloseClick', () => {
      const wrapper = getComponent();
      wrapper.find('[data-primary-nav-close="true"]').simulate('click');
      expect(DEFAULT_PROPS.onCloseClick).toHaveBeenCalled();
    });
  });

  describe('change active item', () => {
    it('should update activeId when onActiveItemChange is called', () => {
      const wrapper: any = getComponent();
      expect(wrapper.state('activeNavItemId')).toBe(null);
      wrapper.instance().onActiveItemChange('test');
      expect(wrapper.state('activeNavItemId')).toBe('test');
    });

    it('should call props.onSecondaryNavVisibleChange with true', () => {
      const wrapper: any = getComponent();
      wrapper.instance().onActiveItemChange('test');
      expect(DEFAULT_PROPS.onSecondaryNavVisibleChange).toHaveBeenCalledWith(
        true
      );
    });

    it('should call props.onSecondaryNavVisibleChange with false', () => {
      const wrapper: any = getComponent();
      wrapper.instance().onActiveItemChange(null);
      expect(DEFAULT_PROPS.onSecondaryNavVisibleChange).toHaveBeenCalledWith(
        false
      );
    });
  });

  describe('visibility', () => {
    it('should have .container---visible class', () => {
      const wrapper = getComponent();
      expect(wrapper.exists('[styleName="container container--visible"]')).toBe(
        true
      );
    });

    it('should not have .container---visible class', () => {
      const wrapper = getComponent({ isVisibleMobile: false });
      expect(wrapper.exists('[styleName="container container--visible"]')).toBe(
        false
      );
    });

    it('should not render blocker when isVisibleMobile=true', () => {
      const wrapper = getComponent();
      expect(wrapper.exists('[data-primary-nav-blocker="true"]')).toBe(true);
    });

    it('should not render blocker when isVisibleMobile=false', () => {
      const wrapper = getComponent({ isVisibleMobile: false });
      expect(wrapper.exists('[data-primary-nav-blocker="true"]')).toBe(false);
    });
  });

  describe('render()', () => {
    it('should not render primary nav items if data.loading=true', () => {
      const wrapper = getComponent({
        data: {
          ...DEFAULT_PROPS.data,
          loading: true
        }
      });
      expect(wrapper.find(PrimaryNavItem).length).toBe(0);
    });

    it('should not render primary nav items if data.error is defined', () => {
      const wrapper = getComponent({
        data: {
          ...DEFAULT_PROPS.data,
          error: true
        }
      });
      expect(wrapper.find(PrimaryNavItem).length).toBe(0);
    });

    it('should render primary nav items', () => {
      const wrapper = getComponent();
      expect(wrapper.find(PrimaryNavItem).length).toBe(3);
    });
  });
});
