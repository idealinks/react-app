import './UserButton.css';
import React from 'react';
import { getLoginUrl } from '../../utils/routeUtils';
import AppLink from '../../components/AppLink/AppLink';
import UserMenu from '../../components/UserMenu/UserMenu';
import * as userUtils from '../../utils/userUtils';
import classNames from 'classnames';

type State = {
  isLoggedIn: boolean;
  userFullName: string;
  userId: string;
  isUserMenuVisible: boolean;
};

export default class UserButton extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userFullName: '',
      userId: '',
      isUserMenuVisible: false
    };
    this.toggleUserMenu = this.toggleUserMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  setUserStatus() {
    this.setState({
      isLoggedIn: userUtils.isUserLoggedIn(),
      userFullName: userUtils.getUserFullName(),
      userId: userUtils.getUserId()
    });
  }

  toggleUserMenu() {
    this.setState({
      isUserMenuVisible: !this.state.isUserMenuVisible
    });
  }

  componentDidMount() {
    this.setUserStatus();
  }

  handleClickOutside() {
    this.setState({
      isUserMenuVisible: false
    });
  }

  renderLoggedIn() {
    const userChevronClasses = classNames('chevron', {
      down: !this.state.isUserMenuVisible
    });

    const overlayClasses = classNames('overlay', {
      invisible: !this.state.isUserMenuVisible
    });

    return (
      <div styleName="usermenu-container">
        <div styleName="user-button-container" onClick={this.toggleUserMenu}>
          <img styleName="user-image" src="/static/images/person.png" />
          <button styleName="user-button" title={this.state.userFullName}>
            {this.state.userFullName}
          </button>
          <img
            styleName={userChevronClasses}
            src="/static/images/icon-user-chevron.svg"
          />
        </div>
        <div styleName={overlayClasses} onClick={this.handleClickOutside} />
        <UserMenu
          userId={this.state.userId}
          isVisible={this.state.isUserMenuVisible}
        />
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <AppLink href={getLoginUrl()}>
        <div styleName="sign-in" title="Sign In">
          Sign In
        </div>
      </AppLink>
    );
  }

  render() {
    return this.state.isLoggedIn
      ? this.renderLoggedIn()
      : this.renderLoggedOut();
  }
}
