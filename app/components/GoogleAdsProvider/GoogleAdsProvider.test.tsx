import React from 'react';
import Router from 'next/router';
import { shallow } from 'enzyme';
import GoogleAdsProvider from './GoogleAdsProvider';

let defineSlot;
let pubads;
let getSlots;
let sizeMapping;
let addSize;
let build;
let defineSizeMapping;
let addService;
let enableSingleRequest;
let enableServices;
let display;
let openConsole;
let setTargeting;
let disableInitialLoad;
let setCollapseEmptyDiv;
let enableLazyLoad;
let destroySlots;

// mock out a chaining of googletag
// see http://blog.bguiz.com/2017/mocking-chained-apis-jest/
function setupGoogleTag() {
  (global as any).window = { googletag: {} };

  defineSlot = jest.fn();
  pubads = jest.fn();
  getSlots = jest.fn();
  sizeMapping = jest.fn();
  addSize = jest.fn();
  build = jest.fn();
  defineSizeMapping = jest.fn();
  addService = jest.fn();
  enableSingleRequest = jest.fn();
  enableServices = jest.fn();
  display = jest.fn();
  openConsole = jest.fn();
  setTargeting = jest.fn();
  disableInitialLoad = jest.fn();
  setCollapseEmptyDiv = jest.fn();
  enableLazyLoad = jest.fn();
  destroySlots = jest.fn();

  (global as any).googletag = {
    apiReady: true,
    defineSlot,
    pubads,
    getSlots,
    sizeMapping,
    addSize,
    build,
    defineSizeMapping,
    addService,
    enableSingleRequest,
    enableServices,
    display,
    openConsole,
    setTargeting,
    disableInitialLoad,
    setCollapseEmptyDiv,
    enableLazyLoad,
    destroySlots,
    cmd: {
      push: value => value()
    }
  };

  defineSlot.mockImplementation(() => (global as any).googletag);
  pubads.mockImplementation(() => (global as any).googletag);
  sizeMapping.mockImplementation(() => (global as any).googletag);
  addSize.mockImplementation(() => (global as any).googletag);
  defineSizeMapping.mockImplementation(() => (global as any).googletag);
  addService.mockImplementation(() => (global as any).googletag);
  setCollapseEmptyDiv.mockImplementation(() => (global as any).googletag);
  getSlots.mockImplementation(() => []);
}

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      NODE_ENV: 'development'
    }
  });
});

describe('<GoogleAdsProvider />', () => {
  beforeEach(() => {
    setupGoogleTag();
  });

  const getComponent = (props = {}) => {
    // console.log(props);
    const mergedProps = {
      adUnitPath: '58580620/York_Region',
      ...props
    };

    return shallow(
      <GoogleAdsProvider {...mergedProps}>
        <p>Testing</p>
      </GoogleAdsProvider>
    );
  };

  describe('componentDidMount()', () => {
    it('should call googletag.openConsole when prop.isDebugModeEnabled = true', () => {
      getComponent({ isDebugModeEnabled: true });
      expect(googletag.openConsole).toHaveBeenCalled();
    });

    it('should not call googletag.openConsole when prop.isDebugModeEnabled = false', () => {
      getComponent({ isDebugModeEnabled: false });
      expect(googletag.openConsole).not.toHaveBeenCalled();
    });

    it('should add routeChangeComplete event listener', () => {
      Router.events.on = jest.fn();
      const wrapper: any = getComponent();

      wrapper.unmount();
      expect(Router.events.on).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('should call googletag.destroySlots()', () => {
      const wrapper: any = getComponent();
      wrapper.unmount();
      expect(googletag.destroySlots).toHaveBeenCalled();
    });

    it('should not call googletag.destroySlots() if googletag not ready', () => {
      (global as any).googletag = {
        ...googletag,
        apiReady: false
      };
      getComponent();
      expect(googletag.destroySlots).not.toHaveBeenCalled();
    });

    it('should remove routeChangeComplete event listener', () => {
      Router.events.off = jest.fn();
      const wrapper: any = getComponent();

      wrapper.unmount();
      expect(Router.events.off).toHaveBeenCalled();
    });
  });

  describe('refreshAllSlots()', () => {
    it('should retun false if googletag is not ready', () => {
      (global as any).googletag = {
        ...googletag,
        apiReady: false
      };
      const wrapper: any = getComponent();
      const result = wrapper.instance().refreshAllSlots();
      expect(result).toBe(false);
    });

    it('should refresh all ad defined ad slots', () => {
      const refreshMockFn = jest.fn();
      const slots = [
        { getSlotElementId: () => 'testA' },
        { getSlotElementId: () => 'testB' }
      ];
      (global as any).googletag = {
        ...googletag,
        pubads: () => ({
          getSlots: () => slots,
          refresh: refreshMockFn
        })
      };
      const wrapper: any = getComponent();
      wrapper.instance().refreshAllSlots();
      expect(refreshMockFn).toHaveBeenCalledWith(slots);
      // expect(refreshMockFn).toHaveBeenCalled();
    });
  });

  describe('addSlot()', () => {
    it('should return false if error is thrown', () => {
      (global as any).googletag = {
        ...googletag,
        defineSlot: jest.fn(() => {
          throw new Error();
        })
      };
      (global as any).console = {
        log: jest.fn().mockImplementationOnce(() => '')
      };
      const wrapper: any = getComponent();
      expect(wrapper.instance().addSlot({ slotId: 'testA' })).toBe(false);
    });

    describe("gpt library hasn't loaded", () => {
      it('should not call googletag.defineSlot if googletag is undefined', () => {
        (window as any).googletag = undefined;
        const wrapper: any = getComponent();
        wrapper.instance().addSlot({ slotId: 'testA' });
        expect(googletag.defineSlot).not.toHaveBeenCalled();
      });

      it('should not call googletag.defineSlot if googletag api is not ready', () => {
        (global as any).googletag = {
          ...googletag,
          apiReady: false
        };
        const wrapper: any = getComponent();
        wrapper.instance().addSlot({ slotId: 'testA' });
        expect(googletag.defineSlot).not.toHaveBeenCalled();
      });
    });

    describe('adSlot is already loaded', () => {
      it('should call googletag.pubads().refresh if ad already exists', () => {
        const refreshMockFn = jest.fn();
        (global as any).googletag = {
          ...googletag,
          pubads: () => ({
            getSlots: () => [{ getSlotElementId: () => 'testA' }],
            refresh: refreshMockFn
          })
        };
        const wrapper: any = getComponent();
        wrapper.instance().addSlot({ slotId: 'testA' });
        expect(refreshMockFn).toHaveBeenCalled();
      });

      it("should not call googletag.pubads().refresh if ad doesn't exist", () => {
        const refreshMockFn = jest.fn();
        (global as any).googletag = {
          ...googletag,
          pubads: () => ({
            getSlots: () => [{ getSlotElementId: () => 'testB' }],
            refresh: refreshMockFn,
            enableSingleRequest: jest.fn()
          })
        };
        const wrapper: any = getComponent();
        wrapper.instance().addSlot({ slotId: 'testA' });
        expect(refreshMockFn).not.toHaveBeenCalled();
      });
    });

    describe('using sizeMapping', () => {
      it('should return empty arrary when slot sizeMapping = undefined', () => {
        const wrapper: any = getComponent();
        wrapper.instance().addSlot({ slotId: 'testA' });
        expect(defineSizeMapping).toHaveBeenCalledWith([]);
      });

      it('should work with a single size in sizeMapping', () => {
        const wrapper: any = getComponent();
        const mapping = [
          { viewport: [1024, 768], sizes: [[320, 250], [720, 90]] }
        ];
        wrapper.instance().addSlot({ slotId: 'testA', sizeMapping: mapping });
        expect(addSize).toHaveBeenCalledWith(
          [1024, 768],
          [[320, 250], [720, 90]]
        );
      });

      it('should work with a multiple sizes in sizeMapping', () => {
        const wrapper: any = getComponent();
        const mapping = [
          { viewport: [400, 400], sizes: [[500, 500], [500, 500]] },
          { viewport: [100, 100], sizes: [[200, 200], [300, 300]] }
        ];
        wrapper.instance().addSlot({ slotId: 'testA', sizeMapping: mapping });
        expect(addSize).toHaveBeenNthCalledWith(
          1,
          [400, 400],
          [[500, 500], [500, 500]]
        );
        expect(addSize).toHaveBeenNthCalledWith(
          2,
          [100, 100],
          [[200, 200], [300, 300]]
        );
      });
    });

    describe('enableLazyLoad', () => {
      it('should call enableLazyLoad() if props.enableLazyLoad=true', () => {
        const wrapper: any = getComponent({ enableLazyLoad: true });
        const options = {
          sizes: [100, 100],
          slotId: 'slotA'
        };
        wrapper.instance().addSlot(options);
        expect(enableLazyLoad).toHaveBeenCalled();
      });

      it('should not call enableLazyLoad() if props.enableLazyLoad=false', () => {
        const wrapper: any = getComponent({ enableLazyLoad: false });
        const options = {
          sizes: [100, 100],
          slotId: 'slotA'
        };
        wrapper.instance().addSlot(options);
        expect(enableLazyLoad).not.toHaveBeenCalled();
      });
    });

    it('should call googletag.defineSlot with params', () => {
      const wrapper: any = getComponent();
      const options = {
        sizes: [100, 100],
        slotId: 'slotA'
      };
      wrapper.instance().addSlot(options);
      expect(defineSlot).toHaveBeenCalledWith(
        '58580620/York_Region',
        options.sizes,
        options.slotId
      );
    });

    it('should call googletag.addService()', () => {
      const wrapper: any = getComponent();
      wrapper.instance().addSlot({ slotId: 'testA' });
      expect(addService).toHaveBeenCalled();
    });

    it('should call googletag.enableSingleRequest() if props.enableSingleRequest = true', () => {
      const wrapper: any = getComponent();
      wrapper.instance().addSlot({ slotId: 'testA' });
      expect(enableSingleRequest).toHaveBeenCalled();
    });

    it('should not call googletag.enableSingleRequest() if props.enableSingleRequest = false', () => {
      const wrapper: any = getComponent({ enableSingleRequest: false });
      wrapper.instance().addSlot({ slotId: 'testA' });
      expect(enableSingleRequest).not.toHaveBeenCalled();
    });

    it('should call googletag.setTargeting for each props.globalTargets key/value pair', () => {
      const globalTargets = { testA: true, testB: false };
      const wrapper: any = getComponent({ globalTargets });
      wrapper.instance().addSlot({ slotId: 'testA' });
      /* tslint:disable:forin */
      for (const key in globalTargets) {
        expect(setTargeting).toHaveBeenCalledWith(key, globalTargets[key]);
      }
    });

    it('should not call googletag.setTargeting if props.globalTargets is undefined', () => {
      const wrapper: any = getComponent();
      wrapper.instance().addSlot({});
      expect(setTargeting).not.toHaveBeenCalled();
    });

    it('should call googletag.setTargeting for each slotTarget key/value pair', () => {
      const targets = { testA: true, testB: false };
      const wrapper: any = getComponent();
      wrapper.instance().addSlot({ slotId: 'testA', targets });
      /* tslint:disable:forin */
      for (const key in targets) {
        expect(setTargeting).toHaveBeenCalledWith(key, targets[key]);
      }
    });

    it('should not call googletag.setTargeting if slotTarget is undefined', () => {
      const wrapper: any = getComponent();
      wrapper.instance().addSlot({ slotId: 'testA' });
      expect(setTargeting).not.toHaveBeenCalled();
    });

    it('should not call googletag.display with slotId', () => {
      const wrapper: any = getComponent();
      wrapper.instance().addSlot({ slotId: 'testA' });
      expect(display).toHaveBeenCalledWith('testA');
    });

    it('should not call googletag.display() when props.disableInitialLoad = true', () => {
      const wrapper: any = getComponent({ disableInitialLoad: true });
      wrapper.instance().addSlot({ slotId: 'testA' });
      expect(display).not.toHaveBeenCalled();
    });

    it('should call googletag.disableInitialLoad() when props.disableInitialLoad = true', () => {
      const wrapper: any = getComponent({ disableInitialLoad: true });
      wrapper.instance().addSlot({ slotId: 'testA' });
      expect(disableInitialLoad).toHaveBeenCalled();
    });
  });
});
