import React from 'react';
import GoogleAdSlot, {
  AD_VIEWPORT_SIZES
} from '../../components/GoogleAdSlot/GoogleAdSlot';

const FooterAd = (
  <GoogleAdSlot
    slotId="footer-sticky"
    sizes={[320, 50]}
    targets={{ pos: '1' }}
    isStickyBottom={true}
    sizeMapping={[
      {
        viewport: AD_VIEWPORT_SIZES.SMALL,
        sizes: [320, 50]
      },
      {
        viewport: AD_VIEWPORT_SIZES.MEDIUM,
        sizes: []
      },
      {
        viewport: AD_VIEWPORT_SIZES.LARGE,
        sizes: []
      }
    ]}
  />
);

export default FooterAd;
