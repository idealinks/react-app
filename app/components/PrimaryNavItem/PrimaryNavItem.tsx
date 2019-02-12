import './PrimaryNavItem.css';
import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { PrimaryNavigation_navigation_children } from 'types/PrimaryNavigation';
import AppLink from '../../components/AppLink/AppLink';
import { withRouter, WithRouterProps } from 'next/router';
import { removeTrailingSlash } from '../../utils/routeUtils';

type Props = {
  id: string;
  activeId: string;
  label: string;
  secondaryNavItems: PrimaryNavigation_navigation_children[];
  onClick: (id: string) => void;
};

const PrimaryNavItem: FunctionComponent<Props & WithRouterProps> = props => {
  const isSectionActive = props.activeId === props.id;
  const containerClasses = classNames('container', {
    'container--expanded': isSectionActive
  });
  const primaryButtonClasses = classNames('primary-section', {
    active: isSectionActive
  });
  const enabledNavItems = props.secondaryNavItems.filter(
    item => item.enabled === true
  );
  const onPrimaryNavClick = () => props.onClick(props.id);
  const getSecndaryNavActiveClass = path => {
    const isActive =
      removeTrailingSlash(props.router.asPath) === removeTrailingSlash(path);
    return isActive ? 'active' : '';
  };
  return (
    <div styleName={containerClasses}>
      <button styleName={primaryButtonClasses} onClick={onPrimaryNavClick}>
        {props.label}
        <img src="/static/images/icon-chevron.svg" styleName="chevron" />
      </button>

      <nav styleName="secondary-links">
        {enabledNavItems.map((item, index) => (
          <AppLink key={item.label} href={item.navigationUrl}>
            <a styleName={getSecndaryNavActiveClass(item.navigationUrl)}>
              {item.label}
            </a>
          </AppLink>
        ))}
      </nav>
    </div>
  );
};

export default withRouter(PrimaryNavItem);
