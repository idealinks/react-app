import './PageLayout.css';
import React from 'react';
import PrimaryHeader from '../../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../../containers/PrimaryFooterContainer';

const PageLayout = props => {
  return (
    <div styleName="container">
      {props.takeoverAd && props.takeoverAd}
      {props.mastheadAd && <div styleName="masthead">{props.mastheadAd}</div>}

      <PrimaryHeader />
      <main styleName="content">{props.children}</main>
      <PrimaryFooter />

      {props.footerAd && props.footerAd}
    </div>
  );
};

export default PageLayout;
