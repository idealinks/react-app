import './UserMenu.css';
import React, { FunctionComponent } from 'react';
import withSubscription, {
  PublicationInputPropsType
} from '../../containers/withSubscription';
import { ChildProps } from 'react-apollo';
import { Publication, PublicationVariables } from 'types/Publication';
import AppLink from '../../components/AppLink/AppLink';
import classNames from 'classnames';

const UserMenu: FunctionComponent<
  ChildProps<PublicationInputPropsType, Publication, PublicationVariables>
> = ({ data, isVisible }) => {
  const isContentReady = !data.error && !data.loading;
  const containerClasses = classNames('container', {
    invisible: !isVisible
  });

  return (
    <React.Fragment>
      {!isVisible && null}
      {data.error && <span>Failed to read publication information!</span>}
      {isContentReady && (
        <div styleName={containerClasses}>
          <AppLink href="/user/account">
            <a styleName="with-chevron">Manage Your Profile</a>
          </AppLink>
          {data.publication.isPilotZone && (
            <div>
              <AppLink href="#">
                <a styleName="with-chevron">Billing Information</a>
              </AppLink>
              <AppLink href="/subscriptions-orders">
                <a styleName="with-chevron">Subscription</a>
              </AppLink>
            </div>
          )}
          <AppLink href="/user/submit-story">
            <a styleName="with-chevron">Submit Your Content</a>
          </AppLink>
          <AppLink href="/user/logout">
            <a>Logout</a>
          </AppLink>
        </div>
      )}
    </React.Fragment>
  );
};

export default withSubscription(UserMenu);
