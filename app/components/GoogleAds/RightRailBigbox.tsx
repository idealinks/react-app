import React from 'react';
import GoogleAdSlot, {
  AD_VIEWPORT_SIZES
} from '../../components/GoogleAdSlot/GoogleAdSlot';

const RightRailBigbox = (
  <GoogleAdSlot
    slotId="right-rail-bigbox"
    sizes={[300, 250]}
    targets={{ pos: '1' }}
    sizeMapping={[
      {
        viewport: AD_VIEWPORT_SIZES.LARGE,
        sizes: [[300, 250], [300, 600]]
      },
      {
        viewport: AD_VIEWPORT_SIZES.MEDIUM,
        sizes: [300, 250]
      },
      {
        viewport: AD_VIEWPORT_SIZES.SMALL,
        sizes: []
      }
    ]}
  />
);

export default RightRailBigbox;
