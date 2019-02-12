import './GoogleAdSlot.css';
import React from 'react';
import classNames from 'classnames';
import { withGoogleAdsContext } from '../../containers/withGoogleAdsContext';
import { GoogleAdsContextType } from '../../contexts/GoogleAdsContext';

export type GoogleAdSlotOptions = {
  slotId: string;
  sizes: [number, number] | [[number, number]];
  targets?: { [key: string]: string };
  sizeMapping?: [
    { viewport: [number, number]; sizes: [number, number] | [[number, number]] }
  ];
};

export type GoogleAdSlotProps = GoogleAdSlotOptions & {
  isStickyBottom?: boolean;
  isCentered?: boolean;
};

export const AD_VIEWPORT_SIZES = {
  LARGE: [1024, 0],
  MEDIUM: [768, 0],
  SMALL: [0, 0]
};

class GoogleAdSlot extends React.PureComponent<
  GoogleAdSlotProps & { adsContext: GoogleAdsContextType }
> {
  static defaultProps = {
    isStickyBottom: false,
    isCentered: true
  };

  componentDidMount() {
    const { isStickyBottom, adsContext, isCentered, ...options } = this.props;
    adsContext.addSlot(options);
  }

  renderAdSlot() {
    const adClasses = classNames('adslot', {
      'adslot--centered': this.props.isCentered
    });
    return <div id={this.props.slotId} styleName={adClasses} />;
  }

  render() {
    const hasMultipleSizes = Array.isArray(this.props.sizes[0]);
    const adSlotHeight = this.props.sizes[1];
    return this.props.isStickyBottom && !hasMultipleSizes ? (
      <div
        styleName="sticky-bottom"
        style={{ paddingTop: `${adSlotHeight}px` }}
        data-sticky-wrapper="true"
      >
        {this.renderAdSlot()}
      </div>
    ) : (
      this.renderAdSlot()
    );
  }
}

export default withGoogleAdsContext(GoogleAdSlot);

// used for unit tests
export const GoogleAdSlotTest = GoogleAdSlot;
