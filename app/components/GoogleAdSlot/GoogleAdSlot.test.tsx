import React from 'react';
import { shallow } from 'enzyme';
import { GoogleAdSlotTest as GoogleAdSlot } from './GoogleAdSlot';

describe('<GoogleAdSlot />', () => {
  const adsContext = {
    addSlot: jest.fn()
  };
  const defaultProps = {
    slotId: 'slotA'
  };
  const getComponent = (props = {}) => {
    const mergedProps = {
      adsContext,
      ...defaultProps,
      ...props
    };

    return shallow(<GoogleAdSlot sizes={[350, 250]} {...mergedProps} />);
  };

  describe('componentDidMount()', () => {
    it('should call adsContext.addSlot() on mount', () => {
      getComponent();
      expect(adsContext.addSlot).toHaveBeenCalled();
    });

    it('should exclude some props before passing to addSlot()', () => {
      getComponent({ isStickyBottom: true });
      expect(adsContext.addSlot).toHaveBeenCalledWith({
        slotId: 'slotA',
        sizes: [350, 250]
      });
    });
  });

  describe('isCentered', () => {
    it('should center ad slot when props.isCentered=true', () => {
      const wrapper = getComponent();
      expect(
        wrapper
          .find('div')
          .first()
          .props().styleName
      ).toContain('adslot--centered');
    });

    it('should not center ad slot when props.isCentered=false', () => {
      const wrapper = getComponent({ isCentered: false });
      expect(
        wrapper
          .find('div')
          .first()
          .props().styleName
      ).not.toContain('adslot--centered');
    });
  });

  describe('isStickyBottom', () => {
    it('should return ad slot div when isStickyBottom=false', () => {
      const wrapper = getComponent();
      expect(
        wrapper
          .find('div')
          .first()
          .props().id
      ).toBe(defaultProps.slotId);
    });

    it('should return sticky wrapper when isStickyBottom=true', () => {
      const wrapper = getComponent({ isStickyBottom: true });
      expect(
        wrapper
          .find('div')
          .first()
          .props()['data-sticky-wrapper']
      ).toBe('true');
    });

    it('should not return sticky wrapper when props.sizes contains multiple sizes', () => {
      const wrapper = getComponent({
        sizes: [[320, 250], [100, 100]],
        isStickyBottom: true
      });
      expect(
        wrapper
          .find('div')
          .first()
          .props()['data-sticky-wrapper']
      ).toBeUndefined();
    });

    it('should add style.height based on prop.sizes height value', () => {
      const wrapper = getComponent({
        sizes: [320, 250],
        isStickyBottom: true
      });
      expect(
        wrapper
          .find('div')
          .first()
          .props().style.paddingTop
      ).toBe('250px');
    });
  });
});
