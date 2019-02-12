import './PrimaryNav.css';
import React from 'react';
import getConfig from 'next/config';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Link from 'next/link';
import classNames from 'classnames';
import PrimaryNavItem from '../PrimaryNavItem/PrimaryNavItem';
import ImageForSiteAlias from '../ImageForSiteAlias/ImageForSiteAlias';
import { ChildProps } from 'react-apollo';
import {
  PrimaryNavigation,
  PrimaryNavigationVariables
} from 'types/PrimaryNavigation';
import { PrimaryNavInputProps } from '../../containers/PrimaryNavContainer';

type State = {
  activeNavItemId: string | null;
};

const { publicRuntimeConfig } = getConfig();

export default class PrimaryNav extends React.Component<
  ChildProps<
    PrimaryNavInputProps,
    PrimaryNavigation,
    PrimaryNavigationVariables
  >,
  State
> {
  constructor(props) {
    super(props);

    this.state = {
      activeNavItemId: null
    };

    this.onActiveItemChange = this.onActiveItemChange.bind(this);
  }

  onActiveItemChange(id: string) {
    const activeNavItemId = id === this.state.activeNavItemId ? null : id;
    this.setState({
      activeNavItemId
    });
    this.props.onSecondaryNavVisibleChange(activeNavItemId !== null);
  }

  render() {
    const containerClasses = classNames('container', {
      'container--visible': this.props.isVisibleMobile
    });

    const primaryNavItems =
      this.props.data.loading || this.props.data.error
        ? []
        : this.props.data.navigation;

    return (
      <React.Fragment>
        <div styleName={containerClasses}>
          <header styleName="header">
            <Link href="/">
              <a styleName="logo">
                <ImageForSiteAlias
                  fileName="logo.svg"
                  alt={publicRuntimeConfig.domainName}
                />
              </a>
            </Link>
            <button
              onClick={this.props.onCloseClick}
              styleName="btnclose"
              data-primary-nav-close="true"
            >
              <span styleName="screenreader-only">Close Navigation</span>
            </button>
          </header>

          <nav styleName="nav">
            {primaryNavItems.map(item => (
              <PrimaryNavItem
                key={item.label}
                id={item.label}
                label={item.label}
                secondaryNavItems={item.children}
                onClick={this.onActiveItemChange}
                activeId={this.state.activeNavItemId}
              />
            ))}
          </nav>
        </div>
        <ReactCSSTransitionGroup
          transitionName="nav-blocker"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.props.isVisibleMobile && (
            <div
              styleName="blocker"
              onClick={this.props.onCloseClick}
              data-primary-nav-blocker="true"
            />
          )}
        </ReactCSSTransitionGroup>
      </React.Fragment>
    );
  }
}
