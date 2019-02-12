import './SubscriptionButton.css';
import React, { FunctionComponent } from 'react';
import withSubscription, {
  PublicationInputPropsType
} from '../../containers/withSubscription';
import { ChildProps } from 'react-apollo';
import { Publication, PublicationVariables } from 'types/Publication';
import AppLink from '../AppLink/AppLink';

const SubscriptionButton: FunctionComponent<
  ChildProps<PublicationInputPropsType, Publication, PublicationVariables>
> = ({ data }) => {
  const isContentReady = !data.error && !data.loading;
  return (
    <React.Fragment>
      {data.error && <span>Failed to read publication data!</span>}

      {isContentReady && data.publication.isPilotZone && (
        <AppLink href="/subscribe">
          <a styleName="button">Subscribe</a>
        </AppLink>
      )}
    </React.Fragment>
  );
};

export default withSubscription(SubscriptionButton);
