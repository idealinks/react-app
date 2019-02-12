import React from 'react';
import GoogleAdSlot, {
  AD_VIEWPORT_SIZES
} from '../../components/GoogleAdSlot/GoogleAdSlot';

const TakeoverAd = (
  <GoogleAdSlot
    slotId="takeover"
    sizes={[1, 1]}
    targets={{ pos: '1' }}
    sizeMapping={[
      {
        viewport: AD_VIEWPORT_SIZES.LARGE,
        sizes: [1, 1]
      },
      {
        viewport: AD_VIEWPORT_SIZES.MEDIUM,
        sizes: []
      },
      {
        viewport: AD_VIEWPORT_SIZES.SMALL,
        sizes: []
      }
    ]}
  />
);

export default TakeoverAd;
