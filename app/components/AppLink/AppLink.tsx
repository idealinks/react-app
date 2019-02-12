import React, { FunctionComponent } from 'react';
import Link, { LinkProps } from 'next/link';
import { UrlLike } from 'next/router';
import { formatPageRouteWithId } from '../..//utils/routeUtils';

type RouteMap = {
  pattern: RegExp;
  formatHref: (path: string, pattern: RegExp) => string;
};

export const URL_MATCH_PATTERNS = {
  staticPage: /\/.+-static\/(\d+)-.+/i,
  subcategoryNewLandingPage: /\/.+-news\/(\w+)\/?/i
};

const ROUTE_MAP: RouteMap[] = [
  {
    pattern: URL_MATCH_PATTERNS.staticPage,
    formatHref: formatPageRouteWithId('/static-page')
  },
  {
    pattern: URL_MATCH_PATTERNS.subcategoryNewLandingPage,
    formatHref: formatPageRouteWithId('/subcategory-news-landing-page')
  }
];

const getLinkPropsForRoute = path => {
  const match = ROUTE_MAP.find(item => path.match(item.pattern));
  return match !== undefined
    ? { href: match.formatHref(path, match.pattern), as: path }
    : { href: path };
};

const AppLink: FunctionComponent<
  LinkProps & { href: string | UrlLike }
> = props => {
  const { href, ...rest } = props;
  return (
    <Link {...getLinkPropsForRoute(props.href)} {...rest}>
      {props.children}
    </Link>
  );
};

export default AppLink;
