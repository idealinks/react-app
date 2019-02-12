import React from 'react';
import { GoogleAdSlotOptions } from '../components/GoogleAdSlot/GoogleAdSlot';

export type GoogleAdsContextType = {
  addSlot: (options: GoogleAdSlotOptions) => boolean;
};

export default React.createContext<GoogleAdsContextType>(null);
