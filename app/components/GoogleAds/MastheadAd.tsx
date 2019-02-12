import React from 'react';
import GoogleAdSlot, {
  AD_VIEWPORT_SIZES
} from '../../components/GoogleAdSlot/GoogleAdSlot';

const MastheadAd = (
  <GoogleAdSlot
    slotId="header-leaderboard"
    sizes={[728, 90]}
    targets={{ pos: '1' }}
    sizeMapping={[
      {
        viewport: AD_VIEWPORT_SIZES.LARGE,
        sizes: [[728, 90], [970, 250]]
      },
      {
        viewport: AD_VIEWPORT_SIZES.MEDIUM,
        sizes: [728, 90]
      },
      {
        viewport: AD_VIEWPORT_SIZES.SMALL,
        sizes: [1, 2]
      }
    ]}
  />
);

export default MastheadAd;
