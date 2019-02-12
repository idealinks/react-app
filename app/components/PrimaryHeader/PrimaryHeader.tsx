import './PrimaryHeader.css';
import React from 'react';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import Link from 'next/link';
import PrimaryNav from '../../containers/PrimaryNavContainer';
import { Query } from 'react-apollo';
import ImageForSiteAlias from '../ImageForSiteAlias/ImageForSiteAlias';
import { GET_TOPHAT } from '../../../graphql/queries';
import { PrimaryHeader_tophat } from 'types/PrimaryHeader';
import WeatherBadge from '../../components/WeatherBadge/WeatherBadge';
import UserButton from '../../components/UserButton/UserButton';
import * as userUtils from '../../utils/userUtils';

// Ensure SubscriptionButton is loaded client side only
const AsyncSubscriptionButton: any = () =>
  import('../../components/SubscriptionButton/SubscriptionButton');
const SubscriptionButton: any = dynamic(AsyncSubscriptionButton, {
  ssr: false
});

type State = {
  isPrimaryNavVisibleMobile: boolean;
  isSecondaryNavVisible: boolean;
  isLoggedIn: boolean;
  userFullName: string;
  userId: string;
  isUserMenuVisible: boolean;
};

const { publicRuntimeConfig } = getConfig();

export default class PrimaryHeader extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      isPrimaryNavVisibleMobile: false,
      isSecondaryNavVisible: false,
      isLoggedIn: false,
      userFullName: '',
      userId: '',
      isUserMenuVisible: false
    };

    this.togglePrimaryNavVisible = this.togglePrimaryNavVisible.bind(this);
    this.onSecondaryNavVisibleChange = this.onSecondaryNavVisibleChange.bind(
      this
    );
  }

  togglePrimaryNavVisible() {
    this.setState({
      isPrimaryNavVisibleMobile: !this.state.isPrimaryNavVisibleMobile
    });
  }

  onSecondaryNavVisibleChange(isVisible) {
    this.setState({ isSecondaryNavVisible: isVisible });
  }

  componentDidMount() {
    this.setState({ userId: userUtils.getUserId() });
  }

  render() {
    return (
      <header
        styleName={
          this.state.isSecondaryNavVisible ? 'secondary-nav-visible' : ''
        }
      >
        <div styleName="tophat">
          <nav styleName="links">
            <Query query={GET_TOPHAT}>
              {({ loading, error, data }) => {
                const navItems = loading || error ? [] : data.tophat;
                return navItems.map((item: PrimaryHeader_tophat) => (
                  <a
                    key={item.label}
                    href={item.navigationUrl}
                    data-tophat-item="true"
                  >
                    {item.label}
                  </a>
                ));
              }}
            </Query>
          </nav>

          <div styleName="user-container">
            <div styleName="item">
              <SubscriptionButton userId={this.state.userId} />
            </div>
            <div styleName="item">
              <UserButton />
            </div>
          </div>
        </div>

        <div styleName="header">
          <button
            styleName="hamburger"
            onClick={this.togglePrimaryNavVisible}
            data-header-hamburger="true"
          >
            <span styleName="screenreader-only">Show Navigation</span>
            <span />
          </button>

          <div styleName="logo">
            <Link href="/">
              <a>
                <ImageForSiteAlias
                  fileName="logo.svg"
                  alt={publicRuntimeConfig.domainName}
                />
              </a>
            </Link>
          </div>

          <div styleName="weather">
            <WeatherBadge />
          </div>
        </div>

        <PrimaryNav
          isVisibleMobile={this.state.isPrimaryNavVisibleMobile}
          onCloseClick={this.togglePrimaryNavVisible}
          onSecondaryNavVisibleChange={this.onSecondaryNavVisibleChange}
        />
      </header>
    );
  }
}
