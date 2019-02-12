import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount, shallow } from 'enzyme';
import PrimaryHeader from './PrimaryHeader';
import { GET_TOPHAT } from '../../../graphql/queries';

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      siteAlias: 'yorkregion'
    }
  });
});

jest.mock('../..//utils/userUtils', () => ({
  ...jest.requireActual('../..//utils/userUtils'),
  getUserId: jest.fn(() => '123')
}));

const getMocks: any = () => [
  {
    request: {
      query: GET_TOPHAT
    },
    result: {
      data: {
        tophat: [
          { label: 'Item 1', navigationUrl: '/item/1', enabled: true },
          { label: 'Item 2', navigationUrl: '/item/2', enabled: true },
          { label: 'Item 3', navigationUrl: '/item/3', enabled: true }
        ]
      }
    }
  }
];

describe('<PrimaryHeader />', () => {
  beforeEach(() => {
    (global as any).console = {
      ...global.console,
      error: jest.fn()
    };
  });

  describe('componentDidMount()', () => {
    it('should set userId state', () => {
      const wrapper = shallow(<PrimaryHeader />);
      expect(wrapper.state('userId')).toBe('123');
    });
  });

  describe('state changes', () => {
    it('should toggle state.isPrimaryNavVisibleMobile to true', () => {
      const wrapper = shallow(<PrimaryHeader />);
      expect(wrapper.state('isPrimaryNavVisibleMobile')).toBe(false);
      wrapper.find('[data-header-hamburger="true"]').simulate('click');
      expect(wrapper.state('isPrimaryNavVisibleMobile')).toBe(true);
    });

    it('should toggle state.isPrimaryNavVisibleMobile to false', () => {
      const wrapper = shallow(<PrimaryHeader />);
      wrapper.find('[data-header-hamburger="true"]').simulate('click');
      expect(wrapper.state('isPrimaryNavVisibleMobile')).toBe(true);
      wrapper.find('[data-header-hamburger="true"]').simulate('click');
      expect(wrapper.state('isPrimaryNavVisibleMobile')).toBe(false);
    });

    it('should update isSecondaryNavVisible with value', () => {
      const wrapper: any = shallow(<PrimaryHeader />);
      expect(wrapper.state('isSecondaryNavVisible')).toBe(false);
      wrapper.instance().onSecondaryNavVisibleChange(true);
      expect(wrapper.state('isSecondaryNavVisible')).toBe(true);
    });
  });

  describe('render()', () => {
    it('should render no tophat items when data.loading=true', () => {
      const wrapper = mount(
        <MockedProvider mocks={getMocks()} addTypename={false}>
          <PrimaryHeader />
        </MockedProvider>
      );
      expect(wrapper.exists('[data-tophat-item="true"]')).toBe(false);
    });

    it('should render no tophat items when data.error=true', () => {
      const mocks = [
        {
          request: getMocks()[0].request,
          error: new Error('oops!')
        }
      ];
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <PrimaryHeader />
        </MockedProvider>
      );
      expect(wrapper.exists('[data-tophat-item="true"]')).toBe(false);
    });

    it('should render tophat items', async () => {
      const wrapper = mount(
        <MockedProvider mocks={getMocks()} addTypename={false}>
          <PrimaryHeader />
        </MockedProvider>
      );

      // see https://github.com/apollographql/react-apollo/issues/1711#issuecomment-369511476
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();

      expect(wrapper.find('[data-tophat-item="true"]').length).toBe(3);
    });

    it('should add secondary-nav-visible class when state.isSecondaryNavVisible=true', () => {
      const wrapper = shallow(<PrimaryHeader />);
      expect(wrapper.exists('[styleName="secondary-nav-visible"]')).toBe(false);
      wrapper.setState({ isSecondaryNavVisible: true });
      expect(wrapper.exists('[styleName="secondary-nav-visible"]')).toBe(true);
    });
  });
});
