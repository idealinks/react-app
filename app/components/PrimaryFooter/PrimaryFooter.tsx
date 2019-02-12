import './PrimaryFooter.css';
import React from 'react';
import getConfig from 'next/config';
import classNames from 'classnames';
import ImageForSiteAlias from '../ImageForSiteAlias/ImageForSiteAlias';
import AppLink from '../../components/AppLink/AppLink';
import { getATagPropsFromData } from '../../utils/routeUtils';
import { ChildProps } from 'react-apollo';
import {
  PrimaryFooterVariables,
  PrimaryFooter as PrimaryFooterType,
  PrimaryFooter_footer,
  PrimaryFooter_footer_children
} from 'types/PrimaryFooter';

type State = {
  activeNavItemId: string | null;
};

const { publicRuntimeConfig } = getConfig();

export default class PrimaryFooter extends React.Component<
  ChildProps<{}, PrimaryFooterType, PrimaryFooterVariables>,
  State
> {
  constructor(props) {
    super(props);

    this.state = {
      activeNavItemId: null
    };

    this.onActiveItemChange = this.onActiveItemChange.bind(this);
  }

  onActiveItemChange(id) {
    const activeNavItemId = id === this.state.activeNavItemId ? null : id;
    this.setState({
      activeNavItemId
    });
  }

  renderPrimaryFooterItem(item) {
    const onClick = () => this.onActiveItemChange(item.label);
    const headingClasses = classNames('links-heading', {
      'links-heading--active': item.label === this.state.activeNavItemId
    });

    return (
      <h3 styleName={headingClasses} data-footer-primary="true">
        <button onClick={onClick} data-footer-primary-item="true">
          {item.label}
          <img src="/static/images/icon-chevron.svg" styleName="chevron" />
        </button>
      </h3>
    );
  }

  renderLinks(links: PrimaryFooter_footer_children[]) {
    return (
      <nav styleName="links" data-footer-primary-nav="true">
        {links
          .filter(link => link.enabled)
          .map(link => (
            <AppLink key={link.label} href={link.navigationUrl}>
              <a {...getATagPropsFromData(link)}>{link.label}</a>
            </AppLink>
          ))}
      </nav>
    );
  }

  render() {
    const primaryFooterItems: PrimaryFooter_footer[] =
      this.props.data.loading || this.props.data.error
        ? []
        : this.props.data.footer;
    return (
      <footer styleName="footer">
        <div styleName="links-container">
          {primaryFooterItems.map(item => (
            <div key={item.label} styleName="links-group">
              {this.renderPrimaryFooterItem(item)}
              {this.renderLinks(item.children)}
            </div>
          ))}
        </div>

        <div styleName="logo-row">
          <AppLink href="/">
            <a styleName="logo">
              <ImageForSiteAlias
                fileName="logo.svg"
                alt={publicRuntimeConfig.domainName}
              />
            </a>
          </AppLink>

          <div styleName="social-links">
            <h3>Join Us!</h3>
            <a
              rel="nofollow"
              href={publicRuntimeConfig.facebookUrl}
              target="_blank"
            >
              <img src="/static/images/icon-facebook.svg" alt="Facebook" />
            </a>
            <a
              rel="nofollow"
              href={publicRuntimeConfig.twitterUrl}
              target="_blank"
            >
              <img src="/static/images/icon-twitter.svg" alt="Facebook" />
            </a>
          </div>
        </div>

        <nav styleName="legal-links">
          <a
            rel="nofollow"
            href="http://www.metroland.com/newspapers?id=about"
            target="_blank"
          >
            Metroland News
          </a>
          <a
            rel="nofollow"
            href="http://www.metroland.com/advertising-terms-and-conditions"
            target="_blank"
          >
            Advertising Terms
          </a>
          <a
            rel="nofollow"
            href="http://www.metroland.com/terms-of-use"
            target="_blank"
          >
            Terms of use
          </a>
          <a
            rel="nofollow"
            href="http://notices.torstar.com/privacy-policy/index.html"
            target="_blank"
          >
            Corporate Privacy Policy
          </a>
        </nav>

        <p styleName="copyright">
          © Copyright {new Date().getFullYear()} Metroland Media Group Ltd. All
          Rights Reserved
        </p>
      </footer>
    );
  }
}
