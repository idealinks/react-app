import React, { FunctionComponent } from 'react';
import getConfig from 'next/config';
import { withRouter, WithRouterProps } from 'next/router';
import PageLayout from '../app/layouts/PageLayout/PageLayout';
import TwoColLayout from '../app/layouts/TwoColLayout/TwoColLayout';
import CardStaticContentComponent from '../app/components/CardStaticContent/CardStaticContent';
import * as routeUtils from '../app/utils/routeUtils';
import withStaticContent from '../app/containers/withStaticContent';
import withArticles from '../app/containers/withArticles';
import TopStoriesComponent from '../app/components/TopStories/TopStories';
import ArticleGroup from '../app/components/ArticleGroup/ArticleGroup';
import MoreNewsComponent from '../app/components/MoreNews/MoreNews';
import NewsletterSignup from '../app/components/NewsletterSignup/NewsletterSignup';
import GoogleAdsProvider from '../app/components/GoogleAdsProvider/GoogleAdsProvider';
import GoogleAdSlot, {
  AD_VIEWPORT_SIZES
} from '../app/components/GoogleAdSlot/GoogleAdSlot';
import { getAdCutpoint } from '../app/utils/generalUtils';
import TakeoverAd from '../app/components/GoogleAds/TakeroverAd';
import FooterAd from '../app/components/GoogleAds/FooterAd';
import MastheadAd from '../app/components/GoogleAds/MastheadAd';
import RightRailBigbox from '../app/components/GoogleAds/RightRailBigbox';
import LocalGuide from '../app/components/LocalGuide/LocalGuide';
import { URL_MATCH_PATTERNS } from '../app/components/AppLink/AppLink';

const { publicRuntimeConfig } = getConfig();

const StaticPage: FunctionComponent<WithRouterProps> = ({ router }) => {
  const staticContentId = routeUtils.getRouteIdFromPath(
    router.asPath,
    URL_MATCH_PATTERNS.staticPage
  );
  const CardStaticContent = withStaticContent(CardStaticContentComponent);
  const TopStories = withArticles(TopStoriesComponent);
  const LatestNews = withArticles(ArticleGroup);
  const MoreNews = withArticles(MoreNewsComponent);
  const NewsIcon = (
    <img src="/static/images/icon-news.png" height="23" alt="news icon" />
  );

  const MainContent = (
    <React.Fragment>
      <CardStaticContent id={staticContentId} />

      <GoogleAdSlot
        slotId="post-article-bigbox"
        sizes={[300, 250]}
        targets={{ pos: '1' }}
        sizeMapping={[
          {
            viewport: AD_VIEWPORT_SIZES.SMALL,
            sizes: [300, 250]
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
    </React.Fragment>
  );
  const RightRail = (
    <React.Fragment>
      {RightRailBigbox}

      <TopStories
        title="Top Stories"
        icon={NewsIcon}
        link={{
          label: 'More Local News',
          url: routeUtils.getNewsLandingUrl()
        }}
        alias="ARTICLE_7__"
        count={4}
      />
    </React.Fragment>
  );

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

        <LatestNews
          title="Latest News"
          icon={NewsIcon}
          link={{
            label: 'More Stories',
            url: routeUtils.getNewsLandingUrl()
          }}
          alias="ARTICLE_2__"
          count={4}
        />

        <GoogleAdSlot
          slotId="body-leaderboard-1"
          sizes={[728, 90]}
          targets={{ pos: '2' }}
          sizeMapping={[
            {
              viewport: AD_VIEWPORT_SIZES.LARGE,
              sizes: [728, 90]
            },
            {
              viewport: AD_VIEWPORT_SIZES.MEDIUM,
              sizes: [728, 90]
            },
            {
              viewport: AD_VIEWPORT_SIZES.SMALL,
              sizes: [300, 250]
            }
          ]}
        />

        <MoreNews
          title="More News"
          icon={NewsIcon}
          link={{
            label: 'More News',
            url: routeUtils.getNewsLandingUrl()
          }}
          alias="ARTICLE_6__"
          count={8}
          start={1}
          end={8}
        />

        <LocalGuide publisherId={publicRuntimeConfig.ownLocalId} />

        <NewsletterSignup />
      </PageLayout>
    </GoogleAdsProvider>
  );
};

export default withRouter(StaticPage);
