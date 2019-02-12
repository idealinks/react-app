import React, { FunctionComponent } from 'react';
import getConfig from 'next/config';
import { withRouter, WithRouterProps } from 'next/router';
import PageLayout from '../app/layouts/PageLayout/PageLayout';
import TwoColLayout from '../app/layouts/TwoColLayout/TwoColLayout';
import NewsletterSignup from '../app/components/NewsletterSignup/NewsletterSignup';
import GoogleAdsProvider from '../app/components/GoogleAdsProvider/GoogleAdsProvider';
import { getAdCutpoint } from '../app/utils/generalUtils';
import TakeoverAd from '../app/components/GoogleAds/TakeroverAd';
import FooterAd from '../app/components/GoogleAds/FooterAd';
import MastheadAd from '../app/components/GoogleAds/MastheadAd';
import RightRailBigbox from '../app/components/GoogleAds/RightRailBigbox';

const { publicRuntimeConfig } = getConfig();

const StaticPage: FunctionComponent<WithRouterProps> = ({ router }) => {
  const MainContent = null;

  const RightRail = <React.Fragment>{RightRailBigbox}</React.Fragment>;

  return (
    <GoogleAdsProvider
      isDebugModeEnabled={false}
      adUnitPath="58580620/York_Region"
      globalTargets={{
        cutpoint: getAdCutpoint(),
        location: `on_${publicRuntimeConfig.majorLocationAlias}`,
        referrer: 'google'
      }}
    >
      <PageLayout
        takeoverAd={TakeoverAd}
        mastheadAd={MastheadAd}
        footerAd={FooterAd}
      >
        <TwoColLayout columnOne={MainContent} columnTwo={RightRail} />

        <NewsletterSignup />
      </PageLayout>
    </GoogleAdsProvider>
  );
};

export default withRouter(StaticPage);
