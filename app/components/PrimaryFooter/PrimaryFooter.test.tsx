import React from 'react';
import { shallow } from 'enzyme';
import PrimaryFooter from './PrimaryFooter';

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      siteAlias: 'yorkregion'
    }
  });
});

const DEFAULT_PROPS = {
  data: {
    loading: false,
    error: false,
    footer: [
      {
        label: 'Item 1',
        children: [
          {
            label: 'Child 1',
            navigationUrl: '/child/1',
            enabled: true,
            openNewWindow: true,
            noFollow: true
          },
          {
            label: 'Child 2',
            navigationUrl: '/child/2',
            enabled: true,
            openNewWindow: false,
            noFollow: false
          }
        ]
      },
      { label: 'Item 2', children: [] },
      { label: 'Item 3', children: [] }
    ]
  }
};

describe('<PrimaryFooter />', () => {
  const getComponent = (props = {}) => {
    const mergedProps: any = {
      ...DEFAULT_PROPS,
      ...props
    };

    return shallow(<PrimaryFooter {...mergedProps} />);
  };

  describe('active primary footer item', () => {
    it('should have no active items when state.activeNavItemId=null', () => {
      const wrapper = getComponent();
      expect(wrapper.exists('.links-heading--active')).toBe(false);

      const hasActive = wrapper
        .find('[data-footer-primary="true"]')
        .everyWhere(
          node => node.props().styleName.indexOf('links-heading--active') > 0
        );

      expect(hasActive).toBe(false);
    });

    it('should activate primary footer item', () => {
      const wrapper = getComponent();
      wrapper.setState({
        activeNavItemId: 'Item 1'
      });

      expect(
        wrapper
          .find('[data-footer-primary="true"]')
          .first()
          .props().styleName
      ).toContain('links-heading--active');
    });

    it('should change activate primary footer item when clicked', () => {
      const wrapper = getComponent();

      wrapper
        .find('[data-footer-primary-item="true"]')
        .last()
        .simulate('click');

      expect(wrapper.state('activeNavItemId')).toEqual('Item 3');
      expect(
        wrapper
          .find('[data-footer-primary="true"]')
          .last()
          .props().styleName
      ).toContain('links-heading--active');
    });
  });

  describe('render()', () => {
    it('should render no primary footer items when data.loading=true', () => {
      const wrapper = getComponent({
        data: { ...DEFAULT_PROPS.data, loading: true }
      });
      expect(wrapper.exists('[data-footer-primary-item="true"]')).toBe(false);
    });

    it('should render no primary footer items when data.error=true', () => {
      const wrapper = getComponent({
        data: { ...DEFAULT_PROPS.data, error: true }
      });
      expect(wrapper.exists('[data-footer-primary-item="true"]')).toBe(false);
    });

    it('should render primary footer items', () => {
      const wrapper = getComponent();
      expect(wrapper.find('[data-footer-primary-item="true"]').length).toBe(3);
    });

    it('should render primary footer item labels', () => {
      const wrapper = getComponent();
      wrapper
        .find('[data-footer-primary-item="true"]')
        .forEach((node, index) => {
          expect(node.text()).toEqual(DEFAULT_PROPS.data.footer[index].label);
        });
    });

    it('should render primary footer children', () => {
      const wrapper = getComponent();
      expect(
        wrapper.find('[data-footer-primary-nav="true"] AppLink').length
      ).toBe(2);
    });

    it('should render primary footer children link with href', () => {
      const wrapper = getComponent();
      wrapper
        .find('[data-footer-primary-nav="true"] AppLink')
        .forEach((node, index) => {
          const item = DEFAULT_PROPS.data.footer[0].children[index];
          expect(node.props().href).toEqual(item.navigationUrl);
        });
    });

    it('should render primary footer children link with label', () => {
      const wrapper = getComponent();
      wrapper
        .find('[data-footer-primary-nav="true"] AppLink a')
        .forEach((node, index) => {
          const item = DEFAULT_PROPS.data.footer[0].children[index];
          expect(node.text()).toEqual(item.label);
        });
    });

    it('should filter out disabled primary footer children', () => {
      const wrapper = getComponent({
        data: {
          ...DEFAULT_PROPS.data,
          footer: [
            {
              label: 'Item 1',
              children: [
                { label: '1', navigationUrl: '/child1', enabled: false },
                { label: '2', navigationUrl: '/child2', enabled: true }
              ]
            }
          ]
        }
      });
      expect(
        wrapper.find('[data-footer-primary-nav="true"] AppLink').length
      ).toBe(1);
      expect(
        wrapper
          .find('[data-footer-primary-nav="true"] AppLink')
          .last()
          .props().href
      ).toEqual('/child2');
    });
  });
});
