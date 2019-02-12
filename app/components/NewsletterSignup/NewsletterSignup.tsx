import './NewsletterSignup.css';
import React from 'react';
import Link from 'next/link';
import { getNewsletterSignupUrl } from '../../utils/routeUtils';

const NewsletterSignup = () => {
  return (
    <div styleName="container">
      <small styleName="badge">Headlines Newsletter</small>
      <div styleName="content">
        <h2 styleName="heading">TOP STORIES, delivered to your inbox.</h2>
        <Link href={getNewsletterSignupUrl()}>
          <a styleName="signup">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default NewsletterSignup;
