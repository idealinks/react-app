import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import getConfig from 'next/config';
import GoogleAdsContext, {
  GoogleAdsContextType
} from '../../contexts/GoogleAdsContext';
import { GoogleAdSlotOptions } from '../../components/GoogleAdSlot/GoogleAdSlot';

type Props = {
  isDebugModeEnabled: boolean;
  adUnitPath: string;
  enableSingleRequest: boolean;
  disableInitialLoad: boolean;
  globalTargets?: { [key: string]: string };
  enableLazyLoad?: boolean;
};

const GOOGLE_ADS_GLOBALS = `
  var googletag = window.googletag || {};
  googletag.cmd = window.googletag.cmd || [];
`;

const { publicRuntimeConfig } = getConfig();

class GoogleAdsProvider extends React.Component<Props, {}> {
  static defaultProps = {
    isDebugModeEnabled: false,
    enableSingleRequest: true,
    disableInitialLoad: false,
    enableLazyLoad: true
  };

  constructor(props) {
    super(props);

    this.addSlot = this.addSlot.bind(this);
    this.refreshAllSlots = this.refreshAllSlots.bind(this);
  }

  componentDidMount() {
    const shouldEnableGoogleConsole =
      this.props.isDebugModeEnabled &&
      publicRuntimeConfig.NODE_ENV !== 'production';

    if (this.isGoogleTagReady() && shouldEnableGoogleConsole) {
      googletag.openConsole();
    }

    Router.events.on('routeChangeComplete', this.refreshAllSlots);
  }

  componentWillUnmount() {
    if (this.isGoogleTagReady()) {
      googletag.destroySlots();
    }

    Router.events.off('routeChangeComplete', this.refreshAllSlots);
  }

  isGoogleTagReady() {
    return (
      (window as any).googletag !== undefined && googletag.apiReady === true
    );
  }

  setGlobalTargets() {
    const { globalTargets } = this.props;
    if (globalTargets) {
      Object.keys(globalTargets).forEach(key => {
        googletag.pubads().setTargeting(key, globalTargets[key]);
      });
    }
  }

  setSlotTargets(slotTargets) {
    if (slotTargets) {
      Object.keys(slotTargets).forEach(key => {
        googletag.pubads().setTargeting(key, slotTargets[key]);
      });
    }
  }

  displayAdSlot(slotId) {
    if (this.props.disableInitialLoad === true) {
      return false;
    }

    googletag.cmd.push(() => {
      googletag.display(slotId);
    });
  }

  getExistingSlot(slotId) {
    const slots = googletag.pubads().getSlots() || [];
    return slots.find(slot => slot.getSlotElementId() === slotId);
  }

  isAdSlotLoaded(slotId) {
    const existingAdSlot = this.getExistingSlot(slotId);

    if (existingAdSlot) {
      googletag.pubads().refresh([existingAdSlot]);
      return true;
    }

    return false;
  }

  refreshAllSlots() {
    if (!this.isGoogleTagReady()) {
      return false;
    }

    const slots = googletag.pubads().getSlots() || [];
    googletag.pubads().refresh(slots);
  }

  getSizeMapping(sizeMap = []) {
    // see docs for sizeMapping https://support.google.com/admanager/answer/3423562?hl=en
    let mapping;

    sizeMap.forEach(item => {
      // Have to do this weirdness in order to mimic chaining the calls
      // If calls are not chained the sizeMapping doesn't work as expected
      mapping = !mapping
        ? googletag.sizeMapping().addSize(item.viewport, item.sizes)
        : mapping.addSize(item.viewport, item.sizes);
    });

    // if there are no sizeMapping settings just return empty []
    // this seems to be ignored by GPT
    return mapping !== undefined ? mapping.build() : [];
  }

  addSlot(options: GoogleAdSlotOptions): boolean {
    try {
      if (!this.isGoogleTagReady() || this.isAdSlotLoaded(options.slotId)) {
        return false;
      }

      googletag.cmd.push(() => {
        googletag
          .defineSlot(this.props.adUnitPath, options.sizes, options.slotId)
          .defineSizeMapping(this.getSizeMapping(options.sizeMapping))
          .addService(googletag.pubads())
          .setCollapseEmptyDiv(true);

        if (this.props.enableSingleRequest === true) {
          googletag.pubads().enableSingleRequest();
        }

        this.setGlobalTargets();
        this.setSlotTargets(options.targets);

        if (this.props.disableInitialLoad === true) {
          googletag.pubads().disableInitialLoad();
        }

        if (this.props.enableLazyLoad) {
          googletag.pubads().enableLazyLoad({
            fetchMarginPercent: 30,
            mobileScaling: 1.0
          });
        }

        googletag.enableServices();

        this.displayAdSlot(options.slotId);
      });

      return true;
    } catch (err) {
      console.log(`Error: adding ad slot : ${options.slotId}`, err);
      return false;
    }
  }

  getAdsContenxt(): GoogleAdsContextType {
    return {
      addSlot: this.addSlot
    };
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <script
            key="gpt"
            async={true}
            src="https://www.googletagservices.com/tag/js/gpt.js"
          />
          <script
            key="gpt-globals"
            dangerouslySetInnerHTML={{ __html: GOOGLE_ADS_GLOBALS }}
          />
        </Head>

        <GoogleAdsContext.Provider value={this.getAdsContenxt()}>
          {this.props.children}
        </GoogleAdsContext.Provider>
      </React.Fragment>
    );
  }
}

export default GoogleAdsProvider;
